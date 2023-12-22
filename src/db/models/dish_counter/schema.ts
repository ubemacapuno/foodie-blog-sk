import { zod_to_jsonschema } from '$utilities/zod_to_jsonschema'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { requiredString } from '$utilities/zod_helpers'

// Validation schema for the dish counter
export const dish_counter_fields = {
	_id: requiredString,
	count: z.number().min(0),
	date_last_updated: requiredString,
	date_created: requiredString
}

export const dish_counter_schema = z.object(dish_counter_fields)

export const dish_counter_raw_schema_json = zodToJsonSchema(dish_counter_schema, {
	$refStrategy: 'none'
})

export const dish_counter_json_schema = zod_to_jsonschema(dish_counter_raw_schema_json)

export type DishCounter = z.infer<typeof dish_counter_schema>
