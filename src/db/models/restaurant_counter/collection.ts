import { update_schema } from '$db/utilities'
import db from '$db/mongo'
import { restaurant_counter_json_schema, type RestaurantCounter } from './schema'

const restaurant_counter = db.collection<RestaurantCounter>('restaurant_counter')

update_schema('restaurant_counter', restaurant_counter_json_schema)

export { restaurant_counter }
