import type { PageServerLoad } from './$types'
import { superValidate } from 'sveltekit-superforms/server'
import { dishes } from '$db/models/dishes/collection'
import { restaurants } from '$db/models/restaurants/collection'
import { Dishes } from '$db/models/dishes/actions'
import { dishes_schema } from '$db/models/dishes/schema'
import { redirect, error } from '@sveltejs/kit'

const schema = dishes_schema

export const load = async function ({ params, parent }) {
	const session = await parent()
	const user_email = session?.session?.user?.email
	console.log('SESSION: ', session)

	if (!params._id) {
		redirect(302, '/dishes')
	}

	const dish = await dishes.findOne({
		_id: params._id
	})

	if (!dish) error(404, 'Dish not found.')

	// Fetch the list of restaurants with their IDs and names
	const restaurantList = await restaurants
		.find({ created_by_user_email: user_email }, { projection: { _id: 1, name: 1 } })
		.toArray()

	// Convert each restaurant document to a plain object
	const serializableRestaurantList = restaurantList.map((restaurant) => ({
		_id: restaurant._id,
		name: restaurant.name
	}))

	const form = await superValidate(dish, schema)

	return { form, dish, restaurantList: serializableRestaurantList }
} satisfies PageServerLoad

export const actions = {
	update: Dishes.update,
	delete: Dishes.delete
}
