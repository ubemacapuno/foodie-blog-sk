//  Upload a file to AWS S3 in a two-step process involving a presigned URL
export const presignAndUploadFile = async (
	file: File,
	linkage: { assetType: string; assetId: string } | undefined = undefined
) => {
	const presignedUrlResponse = await fetch('/api/upload', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			filename: file.name,
			type: file.type
		})
	})

	if (!presignedUrlResponse.ok) {
		console.error('Failed to get presigned URL')
	}

	const { presignedUrl, objectKey } = await presignedUrlResponse.json()

	const uploadToS3Response = await fetch(presignedUrl, {
		method: 'PUT',
		headers: {
			'Content-Type': file.type
		},
		body: file
	})

	if (!uploadToS3Response.ok) {
		console.error('Failed to upload file to S3')
	} else {
		const completeResult = await fetch('/api/upload/complete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				objectKey,
				linkage
			})
		})

		if (!completeResult.ok) {
			console.error('Failed to complete upload')
		}

		const newFile = await completeResult.json()

		return newFile
	}
}
