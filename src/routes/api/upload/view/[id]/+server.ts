import { AUTH_ERROR_MESSAGE } from '$constants/forms'
import { SIZE } from '$constants/searchParams'
import { uploads } from '$db/models/uploads.ts/collection.js'
import { S3_BUCKET } from '$env/static/private'
import { S3 } from '$lib/s3'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { json } from '@sveltejs/kit'

export const GET = async ({ locals, params, setHeaders, url }) => {
	if (!locals.user) {
		return new Response(AUTH_ERROR_MESSAGE, { status: 401 })
	}
	// TODO: Add permission checks for linked resources
	//  - Probably need to pull all resources that have this image linked
	//  - Then we compile those resources and check permissions
	//  - Definitely want to use caching if browser doesn't already help with that
	const { id } = params as { id: string }
	const size = url.searchParams.get(SIZE)

	const foundItem = await uploads.findOne({ _id: id })
	if (!foundItem) {
		return json({ message: 'Item not found' }, { status: 404 })
	}

	const fileKey = `${foundItem.upload_id}${size ? `_${size}` : ''}`
	const getCommand = new GetObjectCommand({
		Bucket: S3_BUCKET,
		Key: fileKey
	})
	try {
		const data = await S3.send(getCommand)
		const imgStr = await data.Body?.transformToByteArray()
		setHeaders({
			'Content-Type': foundItem.type
		})
		return new Response(imgStr)
	} catch (error: any) {
		console.error('S3 download error ', error)
		return json({ message: error.message }, { status: 500 })
	}
}
