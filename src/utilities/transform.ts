import lodash from 'lodash'
const { startCase, camelCase } = lodash

export function toTitleCase(str = '') {
	return startCase(camelCase(str))
}

export function slugify(str = '') {
	return str
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z\-]/g, '')
}
export const slugifyUpload = (str: string) => {
	return str
		.trim()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/\./g, '-')
		.replace(/-+/g, '-')
		.replace(/[^a-z0-9-]/g, '-')
}
