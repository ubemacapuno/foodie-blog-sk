import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { dishes } from '$db/models/dishes/collection';
import { Dishes } from '$db/models/dishes/actions';
import { dishes_schema } from '$db/models/dishes/schema';
import { redirect, error } from '@sveltejs/kit';

// See https://zod.dev/?id=primitives for schema syntax
const schema = dishes_schema;

export const load = async function ({ params }) {
	if (!params._id) {
		throw redirect(302, '/dishes');
	}

	const dish = await dishes.findOne({
		_id: params._id
	});

	if (!dish) throw error(404, 'Dish not found.');

	const form = await superValidate(dish, schema);

	return { form, dish };
} satisfies PageServerLoad;

export const actions = {
	create: Dishes.create,
	update: Dishes.update,
	delete: Dishes.delete
};
