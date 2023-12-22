import { zod_to_jsonschema } from '$utilities/zod_to_jsonschema'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { optionalPositiveNumber, requiredString, starRating } from '$utilities/zod_helpers'

// Validation schema for dishes
export const dishes_fields = {
	_id: requiredString,
	name: requiredString,
	date_added: requiredString,
	date_updated: requiredString,
	rating: starRating,
	serving_size: optionalPositiveNumber,
	prep_time: optionalPositiveNumber,
	cook_time: optionalPositiveNumber,
	created_by_user_email: z.string().email(),
	updated_by_user_email: z.string().email().optional(),
	calories: optionalPositiveNumber,
	ingredients: z
		.array(
			z
				.string()
				.min(2, 'Ingredient must be at least 2 characters long.')
				.max(200, 'Single ingredient must be 200 or less characters.')
		)
		.max(100, 'Please use less than 100 ingredients.')
		.optional(),
	instructions: z
		.string()
		.max(5000, 'Instructions must not exceed 5000 characters.')
		.nullable()
		.optional(),
	cuisine: z
		.string()
		.min(1, 'Please enter a cuisine.')
		.max(50, 'Please use less than 50 characters.'),
	notes: z.string().max(5000, 'Notes must not exceed 5000 characters.').nullable().optional(),
	connected_uploads: z.array(z.string()).default([]) // Upload ID
}
export const dishes_schema = z.object(dishes_fields)
export const new_dish_schema = z.object({
	name: z.string().min(3).max(50, 'Please use less than 50 characters.'),
	rating: starRating,
	cuisine: z
		.string()
		.min(1, 'Please enter a cuisine.')
		.max(50, 'Please use less than 50 characters.')
})

export const updated_dishes_schema = dishes_schema.omit({
	date_added: true
})
export const dishes_raw_schema_json = zodToJsonSchema(dishes_schema, {
	$refStrategy: 'none'
})
export const dishes_json_schema = zod_to_jsonschema(dishes_raw_schema_json)

export type Dish = z.infer<typeof dishes_schema>
