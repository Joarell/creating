// ╭─────────────────────────────────────────────────────────╮
// │ ╭─────────────────────────────────────────────────────╮ │
// │ │ INFO: Here is the functions to handle user requests │ │
// │ │                dbSuspiciousTokens()                 │ │
// │ │                  dbTokensCheckOut()                 │ │
// │ │                   insertNewUser()                   │ │
// │ │                userLoginValidation()                │ │
// │ │                  userTokenMatch()                   │ │
// │ │                 userTokenExpTime()                  │ │
// │ │                  tokensCheckOut()                   │ │
// │ ╰─────────────────────────────────────────────────────╯ │
// ╰─────────────────────────────────────────────────────────╯


const log = require('debug')('user:check');
const checker =		require('../auth/user.check.out');
const db =			require('../DB_models/db.transactions');
const jwt =			require('jsonwebtoken');
const tokenMan =	require('../DB_models/db.auth.procedures');
const dataTokens =	require('../DB_models/db.tokens.stored');


const insertNewUser = async (req, res) => {
	const set =			new WeakSet();
	const token =		tokenMan.authTokenGen(req.body.user_name);
	const refToken =	tokenMan.refTokenGen(req.body.email);
	let userData = {
		...req.body,
		accessToken: token,
		refreshToken: refToken
	};
	const confirmation = await db.addNewUser(userData);

	set.add(userData);
	if (confirmation === 500)
		return (res.status(501).json({msg: "Pass frase procedure failure"}));
	userData = null;
	return(res.status(confirmation).send(req.body));
};


const userLoginValidation = async (req, res, next) => {
	const auth = await checker.checkUserAuthDB(req.body);

	log("login", auth);
	log(`LOGIN: ${auth}`, `Timestamp: ${new Date().toISOString()}`);
	switch (auth) {
		case 404:
			return(res.status(404).json({msg: "User not found"}));
		case 401:
			return(res.status(401).json({msg: "Wrong password."}));
		case 200:
			next();
	};
};


async function dbSuspiciousTokens (tokens) {
	const dbTokens =			await dataTokens.retrieveOldTokens();
	const checkedAuthToken =	dbTokens.includes(tokens[0]);
	const checkedRefToken =		dbTokens.includes(tokens[1]);

	if ((checkedAuthToken && checkedRefToken) === false)
		return (false);
	return (true);
};


async function dbTokensCheckOut (tokens) {
	const oldTokens =			await dataTokens.retrieveOldTokens();
	const checkedAuthToken =	oldTokens.includes(tokens[0]);
	const checkedRefToken =		oldTokens.includes(tokens[1]);

	if ((checkedAuthToken && checkedRefToken) === false)
		return (false);
	return (true);
};


function extractCookieData (request) {
	const COOKIE = request.headers['cookie']?.split(' ');
	let authToken;
	let refToken;
	let session;
	let name;
	let id;
	let cookied;

	if (!COOKIE)
		return(false);
	COOKIE.map(data => {
		data.split('=')[0] === "id" ? id = data.split('=')[1] : 0;
		data.split('=')[0] === "name" ? name = data.split('=')[1] : 0;
		data.split('=')[0] === "token" ? authToken = data.split('=')[1] : 0;
		data.split('=')[0] === "user" ? refToken = data.split('=')[1] : 0;
		data.split('=')[0] === "session" ? session = data.split('=')[1] : 0;
	});
	name?.at(-1) === ';' ? name = name.slice(0, -1) : 0;
	authToken?.at(-1) === ';' ? authToken = authToken.slice(0, -1) : 0;
	id?.at(-1) === ';' ? id = id.slice(0, -1) : 0;
	session?.at(-1) === ';' ? session = session.slice(0, -1) : 0;
	refToken?.at(-1) === ';' ? refToken = refToken.slice(0, -1) : 0;

	cookied = {name, authToken, refToken, session, id}
	return(authToken ? cookied : {name, id, session});
};


async function tokensCheckOut(info, users) {
	log(info, 'and', users);
	if (!users && info.id !== users.id)
		return(404);
	const a_token =				info.authToken === users.auth_token;
	const r_token =				info.refToken === users.refresh_token;
	const checkedTokens =		await dbTokensCheckOut(info);
	const suspiciousTokens =	await dbSuspiciousTokens(info);

	if (checkedTokens || suspiciousTokens === true)
		return(403);
	if (a_token && r_token === true)
		return (true);
	return (false);
};


const userTokenMatch = async(req, res, next) => {
	try {
		const cookieData =	extractCookieData(req);
		const dbUsers =		await db.retrieveDataUsers(cookieData.id, 'auth');
		let result;

		if (!cookieData.authToken) {
			cookieData.authToken =	dbUsers[0].auth_token;
			cookieData.refToken =	dbUsers[0].refresh_token;
		};
		if (cookieData.session) {
			result = await tokensCheckOut(cookieData, dbUsers[0]);
			log("Match-access", result);
			switch(result) {
				case true:
					next();
					break;
				case false :
					dataTokens.storeSuspiciousTokens(cookieData)
					return(res.status(401).json({msg: "User blocked"}));
				case 404:
					return (res.status(404).json({msg: "User Not found"}));
				case 403:
					return (res.status(403).json({msg: "Suspicious try"}));
				default :
					throw new TypeError('Session not match, suspicious action.');
			};
		}
		else
			throw new TypeError();
	}
	catch(err) {
		log('TOKEN MATCH:', err);
		return(res.status(401).redirect('/'));
	};
};


const userTokenExpTime = async (req, res, next) => {
	try {
		const cookieData =	extractCookieData(req);
		const dbUser =		await db.retrieveDataUsers(cookieData.id, 'auth');

		if (!cookieData.authToken) {
			cookieData.authToken =	dbUser[0].auth_token;
			cookieData.refToken =	dbUser[0].refresh_token;
		};
		log("ExpToken", cookieData, 'and user:', dbUser[0]);
		if (!dbUser[0] && dbUser[0].session !== cookieData.session)
			return(res.status(401).json({msg: "Not authorized"}));
		jwt.verify(cookieData.authToken, process.env.SECRET_TOKEN, async (err) => {
			log('JWT', err);
			err ? res.status(403).json({msg: "Token access denied!"}) : next();
		});
	}
	catch (err) {
		log('TOKEN EXP:', err);
		return(res.status(401).redirect('/'));
	}
};

module.exports = {
	extractCookieData,
	insertNewUser,
	userLoginValidation,
	userTokenExpTime,
	userTokenMatch,
}
