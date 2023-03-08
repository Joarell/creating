


const pool	= require('./db.settings');
const jwt	= require('jsonwebtoken');
const db	= require('./db.transactions');


async function storeOldTokens (authToken, body) {
};


async function addUserNewToken (newToken) {
	const { name, token } = newToken;
	const dbUser	= await db.retriveDataUsers();
	const checkUser = dbUser.find(user => user.name === name);
	const client	= await pool.connect();

	if (!checkUser)
		return (404);
	try {
		await client.query('BEGIN');
		const content = `INSERT INTO users (auth_token)
		VALUES ('${token}')`;
		await pool.query(content);
		await pool.query('COMMIT');
		return (201);
	}
	catch (err) {
		console.err(`Beware ${err}`);
		return (500);
	}
	finally {
		client.release();
	};
};


function authTokenGen( userName ) {
	const authtoken = jwt.sign(
		{ data: userName },
		process.env.SECRET_TOKEN,
		{ expiresIn: '40s' }
	);
	return (authtoken);
};


function refTokenGen ( userEmail ) {
	const refToken = jwt.sign(userEmail, process.env.REF_SECRET_TOKEN);
	return ( refToken );
};

module.exports = {
	addUserNewToken,
	storeOldTokens,
	authTokenGen,
	refTokenGen,
};
