import { zod_to_jsonschema } from '$utilities/zod_to_jsonschema';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const REQUIRED_FILED = 'This field is required';
const requiredString = z.string().min(1, REQUIRED_FILED);

// Validation schema for dishes
export const dishes_fields = {
	_id: z.string().min(1),
	name: z.string().min(3),
	date_added: requiredString,
	date_updated: requiredString,
	rating: z.string().nonempty().default('5'),
	ingredients: z
		.array(
			z
				.string()
				.min(1, 'Ingredient must be at least 1 character long.')
				.max(24, 'Single ingredient must be 24 or less characters.')
		)
		.min(1, 'Please add at least 1 ingredient.')
		.max(100, 'Please use less than 100 ingredients.'),
	instructions: z
		.string()
		.min(3, 'Instructions must be at least 3 characters long.')
		.max(500, 'Instructions must not exceed 500 characters.')
		.optional(),
	cuisine: z
		.string()
		.min(1, 'Please enter a cuisine.')
		.max(100, 'Please use less than 100 characters.'),
	notes: z.string().max(500, 'Notes must not exceed 500 characters.').optional()
};
export const dishes_schema = z.object(dishes_fields);
export const new_dish_schema = dishes_schema.omit({
	_id: true,
	date_added: true,
	date_updated: true,
	ingredients: true,
	instructions: true,
	notes: true
});
export const updated_dishes_schema = dishes_schema.omit({
	date_added: true
});
export const dishes_raw_schema_json = zodToJsonSchema(dishes_schema, {
	$refStrategy: 'none'
});
export const dishes_json_schema = zod_to_jsonschema(dishes_raw_schema_json);

export type Dish = z.infer<typeof dishes_schema>;
