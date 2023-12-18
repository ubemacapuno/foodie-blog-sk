import type { PageServerLoad } from './$types'
import { superValidate } from 'sveltekit-superforms/server'
import { restaurants } from '$db/models/restaurants/collection'
import { Restaurants } from '$db/models/restaurants/actions'
import { restaurants_schema } from '$db/models/restaurants/schema'
import { redirect, error } from '@sveltejs/kit'

// See https://zod.dev/?id=primitives for schema syntax
const schema = restaurants_schema

export const load = async function ({ params }) {
	if (!params._id) {
		redirect(302, '/restaurants');
	}

	const restaurant = await restaurants.findOne({
		_id: params._id
	})

	if (!restaurant) error(404, 'Restaurant not found.');

	const form = await superValidate(restaurant, schema)

	return { form, restaurant }
} satisfies PageServerLoad

export const actions = {
	update: Restaurants.update,
	delete: Restaurants.delete
}
