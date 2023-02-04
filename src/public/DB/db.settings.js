const { Pool } = require('pg');

const connectDB = (port, user, pass) => {
	try {
		const pool = new Pool({
			host: 'localhost',
			port: port,
			user: user,
			password: pass,
			database:'web_crater',
		});
		return (pool);
	}
	catch(err) {
		return(console.err(err));
	}
};

module.exports = { connectDB };
