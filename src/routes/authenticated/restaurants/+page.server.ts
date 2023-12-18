import type { PageServerLoad } from './$types'
import { restaurants } from '$db/models/restaurants/collection'
import { Restaurants } from '$db/models/restaurants/actions'
import { superValidate } from 'sveltekit-superforms/server'
import { new_restaurant_schema } from '$db/models/restaurants/schema'

export const load = (async (event) => {
	const session = await event.locals.getSession()
	const user_email = session?.user?.email

	// Query ONLY for dishes made by the user (same email)
	const all_user_restaurants = await restaurants
		.find({ created_by_user_email: user_email }, { sort: { order: 1 } })
		.toArray()
	// Server API:
	// See https://zod.dev/?id=primitives for schema syntax
	const form = await superValidate(event, new_restaurant_schema)

	// Always return { form } in load and form actions.
	return {
		form,
		restaurants: all_user_restaurants
	}
}) satisfies PageServerLoad

export const actions = {
	create: Restaurants.create,
	update: Restaurants.update,
	delete: Restaurants.delete
}
