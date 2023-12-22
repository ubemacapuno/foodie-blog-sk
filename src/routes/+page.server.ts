import type { PageServerLoad } from './$types'
import { dish_counter } from '$db/models/dish_counter/collection' // Make sure this path is correct

export const load: PageServerLoad = (async () => {
	// Retrieve the specific dish_counter document
	const dish_counter_doc = await dish_counter.findOne({ _id: 'dish_count' })

	// Extract the count and date_created values, defaulting if the document or fields don't exist
	const count_all_dishes_created = dish_counter_doc ? dish_counter_doc.count : 0
	const date_created = dish_counter_doc ? dish_counter_doc.date_created : null

	console.log('DATE CREATED: ', date_created)

	return {
		count_all_dishes_created,
		date_created // include this in the returned object
	}
}) satisfies PageServerLoad
