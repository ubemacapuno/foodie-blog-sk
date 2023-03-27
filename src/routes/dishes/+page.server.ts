import type { Actions, PageServerLoad } from './$types';
import { dishes } from '$db/models/dishes/collection';
import { Dishes } from '$db/models/dishes/actions';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { dishes_schema } from '$db/models/dishes/schema';
import { fix_pojo } from '$utilities/fix_pojo';

// See https://zod.dev/?id=primitives for schema syntax
const schema = dishes_schema;

export const load = (async (event) => {
	const all_dishes = await dishes.find({}, { sort: { order: 1 } }).toArray();
	// Server API:
	const form = await superValidate(event, schema);

	// Always return { form } in load and form actions.
	return {
		form,
		dishes: fix_pojo(all_dishes)
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		// Same syntax as in the load function
		const form = await superValidate(event, schema);
		console.log('POST form:', form);

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		// TODO: Do something with the validated data

		// Yep, return { form } here too
		return { form };
	},
	create: Dishes.create,
	update: Dishes.update,
	delete: Dishes.delete
} satisfies Actions;
