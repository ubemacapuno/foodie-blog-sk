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
import { dishes_schema, type Dish, new_dish_schema } from './schema'
import { dishes } from './collection'
import type { InsertOneResult } from 'mongodb'
import {
	AUTH_ERROR_MESSAGE,
	CHECK_FORM_MESSAGE,
	DEFAULT_FORM_ERROR,
	getSuccessMessage
} from '$constants/forms'

export const Dishes: Actions = {
	create: async function (event) {
		const session = await event.locals.getSession()
		// Setup Form (remove _id from schema for validation)
		const form = await superValidate(event, new_dish_schema)
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
		const insert_data = prepare_data_for_insert<Dish>(form.data)

		// Insert into database
		const created_path = <InsertOneResult>await dishes.insertOne(insert_data).catch(log_error)

		// Redirect to _id page with a toast message
		redirect(
			303,
			`/authenticated/dishes/${created_path.insertedId}`,
			{
				message: getSuccessMessage('dish', 'created'),
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
		const form = await superValidate(event, dishes_schema)

		// Check if session exists
		if (!session) {
			return message(form, AUTH_ERROR_MESSAGE)
		}

		if (session?.user?.email !== form.data.created_by_user_email) {
			redirect(
				302,
				`/authenticated/dishes/${form.data._id}`,
				{
					message: `Cannot update this dish. Session email doesn't match eamil created by user.`,
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

		await dishes
			.findOneAndUpdate({ _id: form.data._id }, { $set: form.data }, { returnDocument: 'after' })
			.catch(log_error)

		// Send a toast message along with form data
		return message(form, getSuccessMessage('dish', 'updated'))
	},

	delete: async function (event) {
		// TODO: We're querying the collection twice in this action. See if we can slim it down to just once.
		const session = await event.locals.getSession()
		const form = await superValidate(event, dishes_schema)

		if (!session) {
			return message(form, AUTH_ERROR_MESSAGE)
		}

		if (!form.data._id) {
			return fail(400, { message: 'Missing dish ID' })
		}

		const dish = await dishes.findOne({ _id: form.data._id })
		if (!dish) {
			return message(form, 'Dish not found')
		}

		if (session?.user?.email !== dish.created_by_user_email) {
			return redirect(
				302,
				`/authenticated/dishes/${form.data._id}`,
				{
					message: AUTH_ERROR_MESSAGE,
					status: 'error',
					id: uniqueId()
				},
				event
			)
		}

		await dishes.deleteOne({ _id: form.data._id }).catch(log_error)

		return redirect(
			303,
			`/authenticated/dishes`,
			{
				message: getSuccessMessage('dish', 'deleted'),
				status: 'success',
				id: uniqueId()
			},
			event
		)
	}
}
