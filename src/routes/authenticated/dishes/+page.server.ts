import type { PageServerLoad } from './$types';
import { dishes } from '$db/models/dishes/collection';
import { Dishes } from '$db/models/dishes/actions';
import { superValidate } from 'sveltekit-superforms/server';
import { new_dish_schema } from '$db/models/dishes/schema';

export const load = (async (event) => {
	const session = await event.locals.getSession();
	const user_email = session?.user?.email;

	// Query ONLY for dishes made by the user (same email)
	const all_user_dishes = await dishes
		.find({ created_by_user_email: user_email }, { sort: { order: 1 } })
		.toArray();
	// Server API:
	// See https://zod.dev/?id=primitives for schema syntax
	const form = await superValidate(event, new_dish_schema);

	// Always return { form } in load and form actions.
	return {
		form,
		dishes: all_user_dishes
	};
}) satisfies PageServerLoad;

export const actions = {
	create: Dishes.create,
	update: Dishes.update,
	delete: Dishes.delete
};
