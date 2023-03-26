import { fail } from '@sveltejs/kit';
import {
	// has_role,
	get_form_data_object,
	prepare_data_for_insert,
	type Actions
} from '$db/actions';
import { log_error } from '$utilities/log_error';
import {
	capas_schema,
	// capas_raw_schema_json,
	type Capa
} from './schema';
import { capas } from './collection';

// TODO: Finish setting up validation so that we don't show success on empty form submissions
export const Capas: Actions = {
	create: async function ({ locals, request }) {
		// Check if user has the ability to edit this capa
		// if (!has_role(locals, 'admin')) return fail(401)

		const data = await get_form_data_object(request);
		console.log('data', data);

		const insert_data = prepare_data_for_insert<Capa>(data);
		console.log('insert_data', insert_data);
		const parse_data = capas_schema.safeParse(insert_data);

		if (!parse_data.success) {
			// Loop through the errors array and create a custom errors array
			const errors = parse_data.error.errors.map((error) => {
				return {
					field: error.path[0],
					message: error.message
				};
			});
			console.log(errors);
			return fail(400, { error: true, errors });
		}

		const created_path = await capas.insertOne(insert_data).catch(log_error);
		console.log('created_path', created_path);

		return {
			id: created_path.insertedId
		};
	},

	update: async function ({ locals, request }) {
		// if (!has_role(locals, 'admin')) return fail(401)

		// Get the data from the request
		const data = await get_form_data_object(request);
		const updated_path = await capas
			.findOneAndUpdate({ _id: data._id }, { $set: data }, { returnDocument: 'after' })
			.catch(log_error);

		if (updated_path?.ok) return updated_path.value;
	},

	delete: async function ({ locals, request }) {
		// if (!has_role(locals, 'admin')) return fail(401)

		const data = await get_form_data_object(request);

		const updated_path = await capas.deleteOne({ _id: data._id }).catch(log_error);

		if (updated_path?.deletedCount) return updated_path.deletedCount;
	}
};
