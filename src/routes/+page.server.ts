import type { PageServerLoad } from './$types';
import { dishes } from '$db/models/dishes/collection';

export const load: PageServerLoad = (async () => {
	const count_all_dishes = await dishes.countDocuments({});

	return {
		count_all_dishes
	};
}) satisfies PageServerLoad;
