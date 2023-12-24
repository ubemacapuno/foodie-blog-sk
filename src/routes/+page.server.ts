import type { PageServerLoad } from './$types'
import { dish_counter } from '$db/models/dish_counter/collection'
import { restaurant_counter } from '$db/models/restaurant_counter/collection'

export const load: PageServerLoad = (async () => {
	// Grab the dish count document
	const dish_counter_doc = await dish_counter.findOne({ _id: 'dish_count' })

	// Grab the restaurant count document
	const restaurant_counter_doc = await restaurant_counter.findOne({ _id: 'restaurant_count' })

	// Grab the count and date_created values of dishes and restaurants, defaulting if the document or fields don't exist:
	// Dishes
	const count_all_dishes_created = dish_counter_doc ? dish_counter_doc.count : 0
	const date_dish_counter_created = dish_counter_doc ? dish_counter_doc.date_created : null

	// Restaurants
	const count_all_restaurants_created = restaurant_counter_doc ? restaurant_counter_doc.count : 0

	return {
		count_all_dishes_created,
		date_dish_counter_created,
		count_all_restaurants_created
	}
}) satisfies PageServerLoad
