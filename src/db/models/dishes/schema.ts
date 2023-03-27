import { zod_to_jsonschema } from '$utilities/zod_to_jsonschema';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Validation schema for dishes

export const dishes_schema = z.object({
	name: z.string().nonempty(),
	dateAdded: z.date().default(() => new Date()),
	dateCooked: z.date().default(() => new Date()),
	rating: z.string().nonempty(),
	ingredients: z.array(z.string()).optional(),
	instructions: z.string().optional().default(''),
	cuisine: z.string().optional(),
	notes: z.string().optional().default(''),
	userId: z.string().nonempty().optional().default('')
});

export const dishes_raw_schema_json = zodToJsonSchema(dishes_schema, {
	$refStrategy: 'none'
});

export type Dish = z.infer<typeof dishes_schema>;

export const dishes_json_schema = zod_to_jsonschema(dishes_raw_schema_json);
