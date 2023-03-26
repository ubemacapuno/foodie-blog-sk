import { zod_to_jsonschema } from '$utilities/zod_to_jsonschema';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Validation schema for dishes
export const capas_schema = z.object({
	_id: z.string(),
	name: z.string().min(1),
	dateCreated: z.string(),
	capaStatus: z.enum(statuses),
	capaPhase: z.enum(phases),
	problemStatement: z.string().min(1),
	dateCapaApproved: z.string(),
	currentPhaseDueDate: z.string(),
	productImpacted: z.string(),
	//TODO: Figure out why z.date() doesn't accept the date-string provided from frontend:
	//TODO: Why is the default fallback not working?
	documentCreated: z.string().default(() => `Test default string`)
});

export const capas_raw_schema_json = zodToJsonSchema(capas_schema, {
	$refStrategy: 'none'
});

export type Capa = z.infer<typeof capas_schema>;

export const capas_json_schema = zod_to_jsonschema(capas_raw_schema_json);
