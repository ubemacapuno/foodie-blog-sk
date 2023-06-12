import type { PageServerLoad } from './$types';
import { dishes } from '$db/models/dishes/collection';
import { superValidate } from 'sveltekit-superforms/server';
import { fix_pojo } from '$utilities/fix_pojo';
import { new_dish_schema } from '$db/models/dishes/schema';

export const load = (async (event) => {
	const session = await event.locals.getSession();
	const user_email = session?.user?.email;

	// Query ONLY for dishes made by the user (same email)
	const count_user_dishes = await dishes.countDocuments({ created_by_user_email: user_email });

	// Server API:
	// See https://zod.dev/?id=primitives for schema syntax
	const form = await superValidate(event, new_dish_schema);

	// Always return { form } in load and form actions.
	return {
		form,
		user_dishes_length: fix_pojo(count_user_dishes),
		session
	};
}) satisfies PageServerLoad;
