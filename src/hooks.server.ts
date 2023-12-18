import { start_mongo } from '$db/mongo'
import { SvelteKitAuth } from '@auth/sveltekit'
import GitHub from '@auth/core/providers/github'
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private'
import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

async function authorization({ event, resolve }) {
	// Protect any routes under /authenticated
	if (event.url.pathname.startsWith('/authenticated')) {
		const session = await event.locals.getSession()
		if (!session) {
			redirect(303, '/');
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event)
}

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
export const handle: Handle = sequence(
	SvelteKitAuth({
		providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })]
	}),
	authorization,
	logger
)
