import { MongoClient } from 'mongodb';
import { DB_URI } from '$env/static/private';

const client = new MongoClient(DB_URI);

export function start_mongo() {
	console.log('Starting Mongo...');
	return client.connect();
}

export default client.db(); // select database
