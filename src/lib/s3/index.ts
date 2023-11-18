import { S3_KEY, S3_ID, S3_URL } from '$env/static/private'
import { S3Client } from '@aws-sdk/client-s3'

const S3 = new S3Client({
	region: 'us-west-1',
	endpoint: S3_URL,
	credentials: {
		accessKeyId: S3_ID,
		secretAccessKey: S3_KEY
	}
})

export { S3 }
