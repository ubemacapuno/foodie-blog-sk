import { update_schema } from '$db/utilities'
import db from '$db/mongo'
import { dish_counter_json_schema, type DishCounter } from './schema'

const dish_counter = db.collection<DishCounter>('dish_counter')

update_schema('dish_counter', dish_counter_json_schema)

export { dish_counter }
