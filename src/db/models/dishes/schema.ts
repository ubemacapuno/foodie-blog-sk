import { zod_to_jsonschema } from '$utilities/zod_to_jsonschema';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Validation schema for dishes

export const dishes_schema = z.object({
	name: z.string().min(3),
	dateAdded: z.date().default(() => new Date()),
	dateCooked: z.date().default(() => new Date()),
	rating: z.string().nonempty().default('5'),
	ingredients: z.array(z.string().min(3)).optional().default([]),
	instructions: z.string().optional().default(''),
	cuisine: z.string().optional().default(''),
	notes: z.string().optional().default(''),
	_id: z.string().min(1)
});
export const new_dish_schema = dishes_schema.omit({ _id: true });

export const dishes_raw_schema_json = zodToJsonSchema(dishes_schema, {
	$refStrategy: 'none'
});

export type Dish = z.infer<typeof dishes_schema>;

export const dishes_json_schema = zod_to_jsonschema(dishes_raw_schema_json);
