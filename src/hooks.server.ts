import { start_mongo } from '$db/mongo'
import type Handle from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

start_mongo()

const logger: Handle = async ({ event, resolve }) => {
	const requestStartTime = Date.now()
	const response = await resolve(event)

	let speed = `🐢`

	if (Date.now() - requestStartTime < 500) {
		speed = `🐇`
	}

	if (Date.now() - requestStartTime < 70) {
		speed = `🚀`
	}

	console.log(
		`${speed} ${new Date(requestStartTime).getHours()}:${new Date(
			requestStartTime
		).getMinutes()}.${new Date(requestStartTime).getSeconds()} ${event.request.method} ${
			response.status
		} ${event.url.pathname} (${Date.now() - requestStartTime}ms)`
	)
	return response
}

// First handle authentication, then authorization
// Each function acts as a middleware, receiving the request handle
// And returning a handle which gets passed to the next function
export const handle: Handle = sequence(logger)
