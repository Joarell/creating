


const pool	= require('./db.settings');
const jwt	= require('jsonwebtoken');
const db	= require('./db.transactions');


async function storeOldTokens (accessToken, refToken) {
	const client = await pool.connect();
	// console.log(accessToken);
	// console.log(refToken);
	// console.log(client);
	
	return(200);
};


async function storeSuspiciousTokens (tokens, id) {
	const client = await pool.connect();

	try {
		await client.query('BEGIN');
		const content = `INSERT INTO craters.suspicious_tokens ( user_id,
		auto_token, refresh_token ) 
		VALUES (${id}, '${tokens[0]}', '${tokens[1]}' )`;
		await client.query(content);
		await client.query('COMMIT');
		return (201);
	}
	catch ( err ) {
		console.error(`WARNING: ${err}`);
		return (500);
	}
	finally {
		client.release();
	};
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
		const content = `INSERT INTO craters.users (auth_token)
		VALUES ('${token}')`;
		await client.query(content);
		await client.query('COMMIT');
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
	storeSuspiciousTokens,
	storeOldTokens,
	authTokenGen,
	refTokenGen,
};
