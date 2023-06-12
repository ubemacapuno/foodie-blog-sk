import type { PageServerLoad } from './$types';
import { dishes } from '$db/models/dishes/collection';

export const load = (async (event) => {
	const session = await event.locals.getSession();
	const user_email = session?.user?.email;

	// Query ONLY for dishes made by the user (same email)
	const count_user_dishes = await dishes.countDocuments({ created_by_user_email: user_email });
	const count_all_dishes = await dishes.countDocuments({});

	return {
		user_dishes_length: count_user_dishes,
		count_all_dishes,
		session
	};
}) satisfies PageServerLoad;
