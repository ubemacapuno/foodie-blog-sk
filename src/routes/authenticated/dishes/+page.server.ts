import type { Actions, PageServerLoad } from './$types';
import { dishes } from '$db/models/dishes/collection';
import { Dishes } from '$db/models/dishes/actions';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { fix_pojo } from '$utilities/fix_pojo';
import { new_dish_schema } from '$db/models/dishes/schema';

export const load = (async (event) => {
	const all_dishes = await dishes.find({}, { sort: { order: 1 } }).toArray();
	// Server API:
	// See https://zod.dev/?id=primitives for schema syntax
	const form = await superValidate(event, new_dish_schema);

	// Always return { form } in load and form actions.
	return {
		form,
		dishes: fix_pojo(all_dishes)
	};
}) satisfies PageServerLoad;

export const actions = {
	create: Dishes.create,
	update: Dishes.update,
	delete: Dishes.delete
};
