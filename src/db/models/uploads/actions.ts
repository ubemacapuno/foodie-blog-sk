import { get_form_data_object, type Actions } from '$db/actions'
import { uploads } from './collection'
import { fail } from '@sveltejs/kit'
import { log_error } from '$utilities/log_error'
import {
	// AUTH_ERROR_MESSAGE,
	CHECK_FORM_MESSAGE,
	DEFAULT_FORM_ERROR,
	getSuccessMessage
} from '$constants/forms'
import { message, superValidate } from 'sveltekit-superforms/server'
import { requiredString } from '$utilities/zod_helpers'
import { z } from 'zod'

export type RenameInput = {
	_id: string
	name: string
}

export const Uploads: Actions = {
	update: async function (event) {
		// TODO: Auth check
		const { _id, name } = <RenameInput>(<unknown>await get_form_data_object(event.request))

		if (!_id || !name || name.length === 0) return fail(400, { message: DEFAULT_FORM_ERROR })

		await uploads
			.findOneAndUpdate({ _id: _id }, { $set: { display_name: name } }, { returnDocument: 'after' })
			.catch((error) => log_error(error, event))

		return
	},
	delete: async function (event) {
		// TODO: Auth check

		const form = await superValidate(event, z.object({ _id: requiredString }))

		if (!form.valid) {
			return message(form, CHECK_FORM_MESSAGE)
		}

		return message(form, getSuccessMessage('upload', 'deleted'))
	}
}
