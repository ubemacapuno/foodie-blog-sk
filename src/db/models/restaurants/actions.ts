import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { message, superValidate } from 'sveltekit-superforms/server';
import uniqueId from 'lodash.uniqueid';
import {
	// has_role,
	get_form_data_object,
	prepare_data_for_insert,
	type Actions
} from '$db/actions';
import { log_error } from '$utilities/log_error';
import { restaurants_schema, type Restaurant, new_restaurant_schema } from './schema';
import { restaurants } from './collection';
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
		const form = await superValidate(event, new_restaurant_schema);
		console.log('POST', form);

		// Check if form is valid
		if (!form.valid) {
			return message(form, CHECK_FORM_MESSAGE);
		}

		// Add user form data server-side
		form.data.date_added = new Date().toISOString();
		form.data.date_updated = new Date().toISOString();

		// Add new _id to form data
		const insert_data = prepare_data_for_insert<Restaurant>(form.data);

		// Insert into database
		const created_path = <InsertOneResult>await restaurants.insertOne(insert_data).catch(log_error);

		// Redirect to _id page with a toast message
		throw redirect(
			303,
			`/restaurants/${created_path.insertedId}`,
			{
				message: getSuccessMessage('restaurant', 'created'),
				status: 'success',
				// Add id so the toast gets assigned an id
				id: uniqueId()
			},
			event
		);
	},

	update: async function (event) {
		// if (!isAuthorized(event.locals.user)) return fail(403, { message: AUTH_ERROR_MESSAGE })

		const form = await superValidate(event, dishes_schema);

		if (!form.valid) {
			return message(form, CHECK_FORM_MESSAGE);
		}

		// Update date_updated
		form.data.date_updated = new Date().toISOString();

		await restaurants
			.findOneAndUpdate({ _id: form.data._id }, { $set: form.data }, { returnDocument: 'after' })
			.catch(log_error);

		// Send a toast message along with form data
		return message(form, getSuccessMessage('restaurant', 'updated'));
	},

	//TODO: Separate form action for ingredients
	// updateIngredients: async function (event) {
	// 	// if (!isAuthorized(event.locals.user)) return fail(403, { message: AUTH_ERROR_MESSAGE })

	// 	const form = await superValidate(event, dishes_schema);

	// 	if (!form.valid) {
	// 		return message(form, CHECK_FORM_MESSAGE);
	// 	}

	// 	// Update date_updated
	// 	form.data.date_updated = new Date().toISOString();

	// 	await dishes
	// 		.findOneAndUpdate({ _id: form.data._id }, { $set: form.data }, { returnDocument: 'after' })
	// 		.catch(log_error);

	// 	// Send a toast message along with form data
	// 	return message(form, getSuccessMessage('dish', 'updated'));
	// },

	delete: async function (event) {
		// if (!has_role(event.locals, 'admin')) return fail(401)

		const form = await superValidate(event, dishes_schema);

		if (!form.data._id) return fail(400, { message: DEFAULT_FORM_ERROR });

		await restaurants.deleteOne({ _id: form.data._id }).catch(log_error);

		throw redirect(
			303,
			`/restaurants`,
			{
				message: getSuccessMessage('restaurant', 'deleted'),
				status: 'success',
				// Generate a unique id for the toast message
				id: uniqueId()
			},
			event
		);
	}
};
