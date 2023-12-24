import { zod_to_jsonschema } from '$utilities/zod_to_jsonschema'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { requiredString } from '$utilities/zod_helpers'

// Validation schema for the restaurant counter
export const restaurant_counter_fields = {
	_id: requiredString,
	count: z.number().min(0),
	date_last_updated: requiredString,
	date_created: requiredString
}

export const restaurant_counter_schema = z.object(restaurant_counter_fields)

export const restaurant_counter_raw_schema_json = zodToJsonSchema(restaurant_counter_schema, {
	$refStrategy: 'none'
})

export const restaurant_counter_json_schema = zod_to_jsonschema(restaurant_counter_raw_schema_json)

export type RestaurantCounter = z.infer<typeof restaurant_counter_schema>
