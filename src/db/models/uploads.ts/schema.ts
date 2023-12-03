import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { optionalString, requiredString } from '$utilities/zod_helpers'

export const upload_status_array: readonly [string, ...string[]] = [
	'pending',
	'complete',
	'deleted'
]

export const upload_schema = z.object({
	_id: z.string(),
	filename: requiredString,
	display_name: optionalString,
	type: requiredString,
	upload_id: requiredString,
	created_at: requiredString,
	status: z.enum(upload_status_array),
	is_obsolete: z.boolean().default(false),
	public_url: z.string().optional()
})
export const new_upload_schema = upload_schema.omit({ _id: true })

export const upload_raw_schema_json = zodToJsonSchema(upload_schema, {
	$refStrategy: 'none'
})

export type Upload = z.infer<typeof upload_schema>
export type NewUpload = z.infer<typeof new_upload_schema>
