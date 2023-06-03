import { update_schema } from '$db/utilities';
import db from '$db/mongo';
import { restaurants_json_schema, type Restaurant } from './schema';

const restaurants = db.collection<Restaurant>('restaurants');

update_schema('restaurants', restaurants_json_schema);

export { restaurants };
