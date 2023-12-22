import type { PageServerLoad } from './$types'
import { dish_counter } from '$db/models/dish_counter/collection'

export const load: PageServerLoad = (async () => {
	// Grab the dish count document
	const dish_counter_doc = await dish_counter.findOne({ _id: 'dish_count' })

	// Grab the count and date_created values, defaulting if the document or fields don't exist
	const count_all_dishes_created = dish_counter_doc ? dish_counter_doc.count : 0
	const date_created = dish_counter_doc ? dish_counter_doc.date_created : null

	return {
		count_all_dishes_created,
		date_created
	}
}) satisfies PageServerLoad
