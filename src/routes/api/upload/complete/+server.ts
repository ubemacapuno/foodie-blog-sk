import { uploads } from '$db/models/uploads.ts/collection.js'
import type { Upload } from '$db/models/uploads.ts/schema.js'
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { json } from '@sveltejs/kit'
import { S3_BUCKET } from '$env/static/private'
import { S3 } from '$lib/s3'
import sharp from 'sharp'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { THUMB } from '$constants/searchParams.js'
import { isImage } from '$utilities/upload_helper'

export const POST = async ({ request }) => {
	const { objectKey } = (await request.json()) as {
		objectKey: string | undefined
	}

	if (!objectKey || objectKey.trim() === '') {
		return json({ message: 'Missing required parameters.' }, { status: 400 })
	}

	const uploadItem = await uploads.findOneAndUpdate(
		{ upload_id: objectKey },
		{ $set: { status: 'complete' } }
	)

	if (uploadItem.ok) {
		// ? If uploading resized images takes too long we can remove await
		//  - We would need to add in a fallback to display the original image
		if (isImage(uploadItem.value?.filename ?? '')) {
			await handleResize(uploadItem.value as Upload)
		}
		return json(uploadItem.value)
	}
	return json({ message: 'Error with upload item.' }, { status: 400 })
}

const handleResize = async (uploadItem: Upload) => {
	const getCommand = new GetObjectCommand({
		Bucket: S3_BUCKET,
		Key: uploadItem.upload_id
	})
	try {
		const data = await S3.send(getCommand)
		const imgStr = await data.Body?.transformToByteArray()

		const resizedImageBuffer = await sharp(imgStr).resize({ width: 100, height: 100 }).toBuffer()

		const presignedThumbUrl = await getSignedUrl(
			S3,
			new PutObjectCommand({
				Bucket: S3_BUCKET,
				Key: `${uploadItem.upload_id}_${THUMB}`,
				ContentType: uploadItem.type
				// ACL: 'public-read'  // comment this out if using IAM policies over ACLs
			}),
			{
				expiresIn: 60 // 1 minute
			}
		)

		await fetch(presignedThumbUrl, {
			method: 'PUT',
			headers: {
				'Content-Type': uploadItem.type
			},
			body: resizedImageBuffer
		})
	} catch (error: any) {
		console.error('S3 download error ', error)
	}
}
