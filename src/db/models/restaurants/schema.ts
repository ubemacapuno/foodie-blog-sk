import { zod_to_jsonschema } from '$utilities/zod_to_jsonschema';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { requiredString, optionalString } from '$db/helpers/zod_helpers';

export const restaurants_fields = {
	_id: z.string().min(1),
	name: z.string().min(3).max(50, 'Please use less than 50 characters.'),
	date_added: requiredString,
	date_updated: requiredString,
	city: optionalString,
	state: optionalString,
	country: optionalString,
	main_phone: optionalString, //TODO: Phone validation
	website: optionalString,
	dishes: z
		.object({
			dish: requiredString,
			rating: z.string().nonempty().default('5'),
			notes: z.string().max(5000, 'Notes must not exceed 5000 characters.').nullable().optional()
		})
		.array()
		.nullable()
};
export const restaurants_schema = z.object(restaurants_fields);
export const new_restaurant_schema = z.object({
	name: z.string().min(3).max(50, 'Please use less than 50 characters.'),
	rating: z.string().nonempty().default('5')
});

export const updated_restaurants_schema = restaurants_schema.omit({
	date_added: true
});
export const restaurants_raw_schema_json = zodToJsonSchema(restaurants_schema, {
	$refStrategy: 'none'
});
export const restaurants_json_schema = zod_to_jsonschema(restaurants_raw_schema_json);

export type Restaurant = z.infer<typeof restaurants_schema>;
