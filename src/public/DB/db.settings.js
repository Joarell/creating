const { Client } = require('pg');


const PORT = process.env.PORT;
const USER = process.env.POSTGRES_USER;
const PASS = process.env.POSTGRES_PASSWORD;
const client = new Client({
	host: 'localhost',
	port: PORT,
	user: USER,
	password: PASS,
});
client.connect()
	.then(() => console.log('connected'))
	.catch((err) => console.error('connection error', err.stack));
console.log(client.password);

// const client = new Client();
// client.connect()
// 	.then(() => console.log('connected'))
// 	.catch((err) => console.error('connection error', err.stack));
