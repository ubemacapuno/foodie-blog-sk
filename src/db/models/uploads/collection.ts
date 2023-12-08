import { update_schema, update_index, update_unique_index } from '$db/utilities'
import { zod_to_jsonschema } from '$utilities/zod_to_jsonschema'
import db from '$db/mongo'
import { upload_raw_schema_json, type Upload } from './schema'

const uploads = db.collection<Upload>('uploads')

const uploads_json_schema = zod_to_jsonschema(upload_raw_schema_json)

const upload_index = ['_id']
const unique_upload_index = ['upload_id']

update_schema('uploads', uploads_json_schema)
update_index(upload_index, uploads)
update_unique_index(unique_upload_index, uploads)

export { uploads }
