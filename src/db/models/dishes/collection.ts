import { update_schema } from '$db/utilities'
import db from '$db/mongo'
import { dishes_json_schema, type Dish } from './schema'

const dishes = db.collection<Dish>('dishes')

update_schema('dishes', dishes_json_schema)

export { dishes }
