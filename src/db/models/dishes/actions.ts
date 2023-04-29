import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { message, superValidate } from 'sveltekit-superforms/server';
import {
	// has_role,
	get_form_data_object,
	prepare_data_for_insert,
	type Actions
} from '$db/actions';
import { log_error } from '$utilities/log_error';
import { dishes_schema, type Dish, new_dish_schema } from './schema';
import { dishes } from './collection';
import type { InsertOneResult } from 'mongodb';
import {
	AUTH_ERROR_MESSAGE,
	CHECK_FORM_MESSAGE,
	DEFAULT_FORM_ERROR,
	getSuccessMessage
} from '$constants/forms';

// TODO: Finish setting up validation so that we don't show success on empty form submissions
export const Dishes: Actions = {
	create: async function (event) {
		// TODO: Auth Check for action
		// if (!isAuthorized(event.locals.user)) return fail(403, { message: AUTH_ERROR_MESSAGE })

		// Setup Form (remove _id from schema for validation)
		const form = await superValidate(event, new_dish_schema);

		// Check if form is valid
		if (!form.valid) {
			return message(form, CHECK_FORM_MESSAGE);
		}

		// Add new _id to form data
		const insert_data = prepare_data_for_insert<Dish>(form.data);

		// Insert into database
		const created_path = <InsertOneResult>await dishes.insertOne(insert_data).catch(log_error);

		// Redirect to _id page with a toast message
		throw redirect(
			303,
			`/authenticated/dishes/${created_path.insertedId}`,
			{
				message: getSuccessMessage('dish', 'created'),
				status: 'success'
			},
			event
		);
	},

	update: async function ({ locals, request }) {
		// if (!has_role(locals, 'admin')) return fail(401)

		// Get the data from the request
		const data = await get_form_data_object(request);
		const updated_path = await dishes
			.findOneAndUpdate({ _id: data._id }, { $set: data }, { returnDocument: 'after' })
			.catch(log_error);

		if (updated_path?.ok) return updated_path.value;
	},

	delete: async function ({ locals, request }) {
		// if (!has_role(locals, 'admin')) return fail(401)

		const data = await get_form_data_object(request);

		const updated_path = await dishes.deleteOne({ _id: data._id }).catch(log_error);

		if (updated_path?.deletedCount) return updated_path.deletedCount;
	}
};
