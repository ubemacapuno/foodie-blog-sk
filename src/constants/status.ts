import type { Status } from '$elements/element-types'

// Accent is the way we map our colors and icons site-wide
type StatusMap = {
	[StatusKey in Status]: {
		accent: Status
	}
}

export const STATUS: StatusMap = {
	info: {
		accent: 'info'
	},
	warning: {
		accent: 'warning'
	},
	error: {
		accent: 'error'
	},
	success: {
		accent: 'success'
	}
}
