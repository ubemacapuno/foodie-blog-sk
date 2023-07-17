import { format } from 'date-fns'

//Helper function for Letters in Avatar:
export function avatarLetters(name: string): string {
	const names = name.split(' ')
	if (names.length === 0 || name === 'undefined') return 'Me'
	if (names.length === 1) {
		const firstLetter = names[0][0]
		return firstLetter.toUpperCase()
	}
	const firstInitial = names[0][0]
	const lastInitial = names[names.length - 1][0]
	return `${firstInitial.toUpperCase()}${lastInitial.toUpperCase()}`
}

export function formatDate(dateString: string) {
	const date = new Date(dateString)
	/**
	 * "P" is long localized date
	 * "p" is long localized time
	 * @see https://date-fns.org/v2.30.0/docs/format
	 */
	return format(date, 'Pp')
}
