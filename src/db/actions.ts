import { ObjectId } from 'mongodb';
import type { Action } from '@sveltejs/kit';

// ?  this takes the request and grabs the values of the fields inside as an object. this object can then be used to update the database
export async function get_form_data_object(request: Request): Promise<{ [key: string]: string }> {
	const data = Object.fromEntries(await request.formData());

	return data;
}

export function prepare_data_for_insert<T>(data: T): T {
	const new_data = data;
	// Generate ID
	new_data._id = new ObjectId().toString();
	return new_data;
}

export interface Actions {
	[key: string]: Action;
}
