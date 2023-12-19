import { zod_to_jsonschema } from '$utilities/zod_to_jsonschema'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { REQUIRED_FIELD, requiredString } from '$utilities/zod_helpers'

// Validation schema for restaurant
export const restaurants_fields = {
	_id: z.string().min(1),
	name: z.string().min(1, REQUIRED_FIELD),
	rating: z.string().default('5'),
	dishes: z.array(z.string()).optional(), // Array of dishes IDs
	date_added: requiredString,
	date_updated: requiredString,
	created_by_user_email: z.string().email(),
	updated_by_user_email: z.string().email().optional()
}

export const restaurants_schema = z.object(restaurants_fields)

export const new_restaurant_schema = z.object({
	name: z.string().min(1, REQUIRED_FIELD),
	rating: z.string().default('5')
})

export const updated_restaurants_schema = restaurants_schema.omit({
	date_added: true
})

export const restaurants_raw_schema_json = zodToJsonSchema(restaurants_schema, {
	$refStrategy: 'none'
})

export const restaurants_json_schema = zod_to_jsonschema(restaurants_raw_schema_json)

/* TODO: Populated Restaurant Schemas */

export type Restaurant = z.infer<typeof restaurants_schema>
