import type { IconName } from '$elements/element-types'

export type Field = {
	type: 'text' | 'number' | 'email' | 'password' | 'select' | 'textarea'
	name: string
	value: string | number
	label?: string
	options?: { value: string | number; label: string; disabled?: boolean }[]
	required?: boolean
	placeholder?: string
	disabled?: boolean
	readonly?: boolean
	autocomplete?: boolean
	maxlength?: number
	minlength?: number
	max?: number
	min?: number
	tooltipText?: string
	span?: number
}

export type SelectOption = {
	label: string
	value: string
	group?: string
	color?: string
	selectable?: boolean
	iconName?: IconName
}

export type ActiveModalId = 'profile' | 'ingredients' | 'notes' | 'debug' | undefined
