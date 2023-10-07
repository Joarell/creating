// ╭───────────────────────────────────────────────╮
// │ ╭───────────────────────────────────────────╮ │
// │ │ INFO: Here is the authenticate functions: │ │
// │ │               getUserData()               │ │
// │ │             tokenProcedures()             │ │
// │ │              addNewTokens();              │ │
// │ │              authTokenGen()               │ │
// │ │               refTokenGen()               │ │
// │ ╰───────────────────────────────────────────╯ │
// ╰───────────────────────────────────────────────╯


const pool	= require('./db.settings');
const jwt	= require('jsonwebtoken');
const db	= require('./db.transactions');


async function getUserData (authToken, info) {
	const dataUser	= await db.retriveDataUsers(info.name);
	const checkAuth = dataUser[0].auth_token === authToken;
	const checkRef	= dataUser[0].refresh_token === info.token;
	const checkId	= dataUser[0].id === info.id;

	// console.log("TOKEN DB", dataUser[0], 'and', authToken, 'and', info);
	// console.log(checkAuth)
	// console.log(checkRef)
	// console.log(checkId)
	if(checkAuth && checkRef && checkId)
		return (dataUser[0]);
	return (false);
};


async function tokenProcedures (accessToken, body, session) {
	const userDB = await getUserData(accessToken, body);
	
	if(userDB) {
		const newAuthToken	= authTokenGen();
		const newRefToken	= refTokenGen(userDB.email);
		const expTokens		= [accessToken, body.token];
		const newTokens		= [newAuthToken, newRefToken];
		return(await storeOldTokensGetNew(expTokens, newTokens, userDB, session));
	};
	return (500);
};


async function storeOldTokensGetNew (expTokens, newTokens, user, session) {
	const client = await pool.connect();

	try {
		await client.query('BEGIN');
		const oldTokens = `INSERT INTO craters.expired_tokens (
			session, user_id, auth_token, refresh_token)
			VALUES (
				'${session}', '${user.id}', '${expTokens[0]}', '${expTokens[1]}'
			)`;
		const addNewTokens = `UPDATE craters.users SET
			auth_token = '${newTokens[0]}',
			refresh_token = '${newTokens[1]}'
			WHERE id = '${user.id}'
			RETURNING *`;
		await client.query(oldTokens);
		await client.query(addNewTokens);
		await client.query('COMMIT');
		return(newTokens);
	}
	catch (err) {
		console.error(`WARNING: ${err}`);
		await client.query ('ROLLBACK');
		return ({500: `${err}`});
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
		await client.query ('ROLLBACK');
		console.err(`Beware ${err}`);
		return (500);
	}
	finally {
		client.release();
	};
};


function authTokenGen(userName) {
	const authtoken = jwt.sign(
		{ data: userName },
		process.env.SECRET_TOKEN,
		{ expiresIn: '12h' }
	);
	return (authtoken);
};


function refTokenGen (userEmail) {
	const refToken = jwt.sign(userEmail, process.env.REF_SECRET_TOKEN);
	return (refToken);
};

module.exports = {
	addUserNewToken,
	authTokenGen,
	refTokenGen,
	tokenProcedures,
};
