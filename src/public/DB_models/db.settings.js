const { Pool } = require("pg");
require('dotenv').config();


const pool = new Pool({
	host: process.env.PG_HOST,
	port: process.env.DB_PORT || "5432",
	user: process.env.PG_USER,
	password: process.env.PG_PASS,
	database: process.env.PG_DB,
	max: 10,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

const connected = async () => {
	try {
		await pool.connect();
		console.log("DATABASE connection: successed");
	} catch (err) {
		console.error("WARINIG", err);
	}
};
connected();

module.exports = pool;
