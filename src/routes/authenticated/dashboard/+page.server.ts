import type { PageServerLoad } from './$types'
import { dishes } from '$db/models/dishes/collection'
import { restaurants } from '$db/models/restaurants/collection'

export const load = (async (event) => {
	const session = await event.locals.getSession()
	const user_email = session?.user?.email

	// Query ONLY for dishes and restaurants made by the user (same email)
	const count_user_dishes = await dishes.countDocuments({ created_by_user_email: user_email })
	const count_user_restaurants = await restaurants.countDocuments({
		created_by_user_email: user_email
	})

	// Query for the dishes/restaurants counts for ALL
	const count_all_dishes = await dishes.countDocuments({})
	const count_all_restaurants = await restaurants.countDocuments({})

	return {
		user_dishes_length: count_user_dishes,
		user_restaurants_length: count_user_restaurants,
		count_all_restaurants: count_all_restaurants,
		count_all_dishes,
		session
	}
}) satisfies PageServerLoad
