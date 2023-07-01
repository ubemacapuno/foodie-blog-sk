import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { message, superValidate } from 'sveltekit-superforms/server';
import uniqueId from 'lodash.uniqueid';
import {
	// has_role,
	// get_form_data_object,
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

export const Restaurants: Actions = {
	create: async function (event) {
		const session = await event.locals.getSession();
		// Setup Form (remove _id from schema for validation)
		const form = await superValidate(event, new_restaurant_schema);
		// Check if session exists
		if (!session) {
			return message(form, AUTH_ERROR_MESSAGE);
		}

		// Check if form is valid
		if (!form.valid) {
			return message(form, CHECK_FORM_MESSAGE);
		}

		// Add user form data server-side
		form.data.created_by_user_email = session?.user?.email;
		form.data.date_added = new Date().toISOString();
		form.data.date_updated = new Date().toISOString();

		// Add new _id to form data
		const insert_data = prepare_data_for_insert<Restaurant>(form.data);

		// Insert into database
		const created_path = <InsertOneResult>await restaurants.insertOne(insert_data).catch(log_error);
		console.log('FORM (create)', form);

		// Redirect to _id page with a toast message
		throw redirect(
			303,
			`/authenticated/restaurants/${created_path.insertedId}`,
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
		const session = await event.locals.getSession();
		const form = await superValidate(event, restaurants_schema);

		// Check if session exists
		if (!session) {
			return message(form, AUTH_ERROR_MESSAGE);
		}

		if (session?.user?.email !== form.data.created_by_user_email) {
			throw redirect(
				302,
				`/authenticated/restaurants/${form.data._id}`,
				{
					message: `Cannot update this restaurant. Session email doesn't match eamil created by user.`,
					status: 'error',
					// Add id so the toast gets assigned an id
					id: uniqueId()
				},
				event
			);
		}

		if (!form.valid) {
			return message(form, CHECK_FORM_MESSAGE);
		}

		// Update date_updated
		form.data.date_updated = new Date().toISOString();
		form.data.updated_by_user_email = session?.user?.email;

		await restaurants
			.findOneAndUpdate({ _id: form.data._id }, { $set: form.data }, { returnDocument: 'after' })
			.catch(log_error);
		console.log('FORM (update)', form);

		// Send a toast message along with form data
		return message(form, getSuccessMessage('restaurant', 'updated'));
	},

	delete: async function (event) {
		// console.log('EVENT', event);
		const session = await event.locals.getSession();
		const form = await superValidate(event, restaurants_schema);

		// Check if session exists
		if (!session) {
			return message(form, AUTH_ERROR_MESSAGE);
		}

		// TODO: Setup a check so users can only delete their own restaurants

		if (!form.data._id) return fail(400, { message: DEFAULT_FORM_ERROR });

		await restaurants.deleteOne({ _id: form.data._id }).catch(log_error);

		console.log('FORM (delete)', form);

		throw redirect(
			303,
			`/authenticated/restaurants`,
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
