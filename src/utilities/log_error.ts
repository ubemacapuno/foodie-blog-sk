export const log_error = (error) => {
	console.log('error', error)
	console.error('error', JSON.stringify(error, null, 1))
}
