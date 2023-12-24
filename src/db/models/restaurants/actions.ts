import { fail } from '@sveltejs/kit'
import { redirect } from 'sveltekit-flash-message/server'
import { message, superValidate } from 'sveltekit-superforms/server'
import uniqueId from 'lodash.uniqueid'
import {
	// has_role,
	// get_form_data_object,
	prepare_data_for_insert,
	type Actions
} from '$db/actions'
import { log_error } from '$utilities/log_error'
import { restaurants_schema, type Restaurant, new_restaurant_schema } from './schema'
import { restaurants } from './collection'
import type { InsertOneResult } from 'mongodb'
import { AUTH_ERROR_MESSAGE, CHECK_FORM_MESSAGE, getSuccessMessage } from '$constants/forms'
import { restaurant_counter } from '../restaurant_counter/collection'

export const Restaurants: Actions = {
	create: async function (event) {
		const session = await event.locals.getSession()
		// Setup Form (remove _id from schema for validation)
		const form = await superValidate(event, new_restaurant_schema)
		// Check if session exists
		if (!session) {
			return message(form, AUTH_ERROR_MESSAGE)
		}

		// Check if form is valid
		if (!form.valid) {
			return message(form, CHECK_FORM_MESSAGE)
		}

		// Add user form data server-side
		form.data.created_by_user_email = session?.user?.email
		form.data.date_added = new Date().toISOString()
		form.data.date_updated = new Date().toISOString()

		// Add new _id to form data
		const insert_data = prepare_data_for_insert<Restaurant>(form.data)

		// Insert into database
		const created_path = <InsertOneResult>await restaurants.insertOne(insert_data).catch(log_error)

		if (created_path) {
			// Check for existing counter
			const counter = await restaurant_counter.findOne({ _id: 'restaurant_count' })
			if (counter) {
				// Increment existing counter
				await restaurant_counter.updateOne(
					{ _id: 'restaurant_count' },
					{ $inc: { count: 1 }, $set: { date_last_updated: new Date().toISOString() } }
				)
			} else {
				// Create a new counter if it doesn't exist
				await restaurant_counter.insertOne({
					_id: 'restaurant_count',
					count: 1,
					date_created: new Date().toISOString(),
					date_last_updated: new Date().toISOString()
				})
			}
		}

		// Redirect to _id page with a toast message
		redirect(
			303,
			`/authenticated/restaurants/${created_path.insertedId}`,
			{
				message: getSuccessMessage('restaurant', 'created'),
				status: 'success',
				// Add id so the toast gets assigned an id
				id: uniqueId()
			},
			event
		)
	},

	update: async function (event) {
		// if (!isAuthorized(event.locals.user)) return fail(403, { message: AUTH_ERROR_MESSAGE })
		const session = await event.locals.getSession()
		const form = await superValidate(event, restaurants_schema)

		// Check if session exists
		if (!session) {
			return message(form, AUTH_ERROR_MESSAGE)
		}

		if (session?.user?.email !== form.data.created_by_user_email) {
			redirect(
				302,
				`/authenticated/restaurants/${form.data._id}`,
				{
					message: `Cannot update this restaurant. Session email doesn't match eamil created by user.`,
					status: 'error',
					// Add id so the toast gets assigned an id
					id: uniqueId()
				},
				event
			)
		}

		if (!form.valid) {
			return message(form, CHECK_FORM_MESSAGE)
		}

		// Update date_updated
		form.data.date_updated = new Date().toISOString()
		form.data.updated_by_user_email = session?.user?.email

		await restaurants
			.findOneAndUpdate({ _id: form.data._id }, { $set: form.data }, { returnDocument: 'after' })
			.catch(log_error)
		console.log('FORM (update)', form)

		// Send a toast message along with form data
		return message(form, getSuccessMessage('restaurant', 'updated'))
	},

	delete: async function (event) {
		// TODO: We're querying the collection twice in this action. See if we can slim it down to just once.
		const session = await event.locals.getSession()
		const form = await superValidate(event, restaurants_schema)

		if (!session) {
			return message(form, AUTH_ERROR_MESSAGE)
		}

		if (!form.data._id) {
			return fail(400, { message: 'Missing restaurant ID' })
		}

		// Retrieve the restaurant to check the owner
		const restaurant = await restaurants.findOne({ _id: form.data._id })
		if (!restaurant) {
			return message(form, 'Restaurant not found')
		}

		// Check if the session user's email matches the restaurant's created_by_user_email
		if (session?.user?.email !== restaurant.created_by_user_email) {
			return redirect(
				302,
				`/authenticated/restaurants/${form.data._id}`,
				{
					message: AUTH_ERROR_MESSAGE,
					status: 'error',
					id: uniqueId()
				},
				event
			)
		}

		await restaurants.deleteOne({ _id: form.data._id }).catch(log_error)

		return redirect(
			303,
			`/authenticated/restaurants`,
			{
				message: getSuccessMessage('restaurant', 'deleted'),
				status: 'success',
				id: uniqueId()
			},
			event
		)
	}
}
