import deepReplace from 'deep-replace'
import omitDeep from 'omit-deep'
import rename from 'deep-rename-keys'

export function zod_to_jsonschema(zod_schema) {
	const obj = rename(zod_schema, function (key) {
		if (key === 'type') return 'bsonType'
		return key
	})

	deepReplace.match(
		obj,
		(value) => value === 'boolean',
		null,
		({ obj, prop }) => {
			obj[prop] = 'bool'
		}
	)

	deepReplace.match(
		obj,
		(value) => value === false,
		null,
		({ obj, prop }) => {
			obj[prop] = true
		}
	)

	return omitDeep(obj, ['$schema', 'default', 'format'])
}
