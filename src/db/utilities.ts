import db from '$db/mongo'
import type { Collection, Document } from 'mongodb'

export async function update_schema(name: string, schema) {
	try {
		const definition = await db.command({ listCollections: 1, filter: { name } })
		if (definition?.cursor?.firstBatch?.[0]?.options?.validator?.$jsonSchema !== schema) {
			await db.command({
				collMod: name,
				validator: { $jsonSchema: schema },
				validationAction: 'error',
				validationLevel: 'strict'
			})
			console.log(`👷‍♂️ Schema updated: ${name}`)
		} else {
			console.log('schema unchanged')
		}
	} catch (e) {
		console.log('schema', JSON.stringify(schema, null, 1))
		console.error('error', e)
	}
}

export async function update_index<T extends Document>(indices: string[], model: Collection<T>) {
	indices.forEach((index) => {
		model.createIndex({ [index]: 1 })
	})
}
