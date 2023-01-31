const { Pool } = require('pg');
// const PORT = process.env.PORT || '5432';
// const USER = process.env.POSTGRES_USER;
// const PASS = process.env.POSTGRES_PASSWORD;

const connectDB = (port, user, pass) => {
	const pool = new Pool({
		host: 'localhost',
		port: port,
		user: user,
		password: pass,
		database:'web_crater',
	});
	return (pool);
};

module.exports = { connectDB };
