import { SIZE } from '$constants/searchParams'
import { imageTypes } from '$lib/components/files/constants'

export const isImage = (filename: string) => imageTypes.some((ext) => filename.includes(ext))

export function formatUploadUrl(id: string | undefined, size = ''): string {
	return `/api/upload/view/${id?.split('_')[0]}${size.length ? `?${SIZE}=${size}` : ''}`
}
