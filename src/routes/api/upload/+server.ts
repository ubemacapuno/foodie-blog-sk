import { prepare_data_for_insert } from '$db/actions'
import { uploads } from '$db/models/uploads.ts/collection.js'
import type { NewUpload, Upload } from '$db/models/uploads.ts/schema.js'
import { S3_BUCKET } from '$env/static/private'
import { S3 } from '$lib/s3'
import { slugifyUpload } from '$utilities/transform'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { json } from '@sveltejs/kit'

export const POST = async ({ request }) => {
	const { filename, type } = (await request.json()) as {
		filename: string | undefined
		type: string | undefined
	}

	if (!filename || !type || filename.trim() === '' || type.trim() === '') {
		return json({ message: 'Missing required parameters.' }, { status: 400 })
	}

	const objectKey = `${slugifyUpload(Date.now().toString())}-${slugifyUpload(filename)}`

	const presignedUrl = await getSignedUrl(
		S3,
		new PutObjectCommand({
			Bucket: S3_BUCKET,
			Key: objectKey,
			ContentType: type,
			ACL: 'public-read'
		}),
		{
			expiresIn: 60 * 5 // 5 minutes
		}
	)

	const uploadInsertData = prepare_data_for_insert<NewUpload>({
		filename: filename,
		display_name: filename,
		type: type,
		upload_id: objectKey,
		created_at: new Date().toISOString(),
		status: 'pending',
		is_obsolete: false
	}) as Upload
	await uploads.insertOne(uploadInsertData)

	return json({ presignedUrl, objectKey })
}
