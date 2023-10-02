// ╭─────────────────────────────────────────────────────────╮
// │ ╭─────────────────────────────────────────────────────╮ │
// │ │ INFO: Here is the functions to handle user requests │ │
// │ │                dbSuspiciousTokens()                 │ │
// │ │                  dbTokensCheckOut()                 │ │
// │ │                   inserNewUser()                    │ │
// │ │                userLoginValidation()                │ │
// │ │                  userTokenMatch()                   │ │
// │ │                 userTokenExpTime()                  │ │
// │ │                  tokensCheckOut()                   │ │
// │ ╰─────────────────────────────────────────────────────╯ │
// ╰─────────────────────────────────────────────────────────╯


const checker =		require('../auth/user.check.out');
const db =			require('../DB_models/db.transactions');
const jwt =			require('jsonwebtoken');
const tokenMan =	require('../DB_models/db.auth.procedures');
const dataTokens =	require('../DB_models/db.tokens.stored');


const insertNewUser = async (req, res) => {
	const set		= new WeakSet();
	const token		= tokenMan.authTokenGen( req.body.name );
	const refToken	= tokenMan.refTokenGen( req.body.email);
	let userData	= {
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

	console.log("login", auth);
	switch (auth) {
		case 404:
			return(res.status(404).json({msg: "User not found"}));
		case 401:
			return(res.status(401).json({msg: "Wrong password."}));
		case 200:
			next();
	};
};


// NOTE: maybe the database should do this search.
async function dbSuspiciousTokens (tokens) {
	const dbTokens			= await dataTokens.retrieveOldTokens();
	const checkedAuthToken	= dbTokens.includes(tokens[0]);
	const checkedRefToken	= dbTokens.includes(tokens[1]);

	if ((checkedAuthToken && checkedRefToken) === false)
		return (false);
	return (true);
};


async function dbTokensCheckOut (tokens) {
	const oldTokens			= await dataTokens.retrieveOldTokens();
	const checkedAuthToken	= oldTokens.includes(tokens[0]);
	const checkedRefToken	= oldTokens.includes(tokens[1]);

	if ((checkedAuthToken && checkedRefToken) === false)
		return (false);
	return (true);
};


function extractTokens (request) {
	let authToken =		request.headers['authorization']?.split(' ')[1];
	const COOKIE =		request.headers['cookie']?.split(' ');

	cookieToken = COOKIE.find(data => {
		if(data.split('=')[0] === 'token')
			return(data);
	})?.split('=')[1];
	refToken = COOKIE.find(data => {
		if (data.split('=')[0] === 'user')
			return(data);
	})?.split('=')[1];

	authToken && authToken.at(-1) === ';' ? authToken = authToken.slice(0, -1) : 0;
	cookieToken.at(-1) === ';' ? cookieToken = cookieToken.slice(0, -1) : 0;
	refToken.at(-1) === ';' ? refToken = refToken.slice(0, -1) : 0;
	authToken === undefined ? authToken = cookieToken : false;

	return ({ authToken, refToken });
};


async function tokensCheckOut(tokenPairs, users, id){
	console.log(tokenPairs, 'and', users);
	if (!users && id !== users.id)
		return(404);
	const a_token			= tokenPairs.authToken === users.auth_token;
	const r_token			= tokenPairs.refToken === users.refresh_token;
	const checkedTokens		= await dbTokensCheckOut(tokenPairs);
	const suspiciousTokens	= await dbSuspiciousTokens(tokenPairs);

	if (checkedTokens || suspiciousTokens === true)
		return(403);
	if (a_token && r_token === true)
		return (true);
	return (false);
};


function getId(request) {
	let id =	request.body.user_id ?? request.headers['cookie'].split(' ');

	if (!Array.isArray(id) && id)
		return ({id});
	id = id.find(data => data.split('=')[0] === 'id')?.split('=')[1];
	id.at(-1) === ';' ? id = id.slice(0, -1) : false;
	return ({id});
};


const userTokenMatch = async(req, res, next) => {
	const tokens =		extractTokens(req);
	const cookieData =	getId(req);
	console.log('COOKIE', cookieData);
	const dbUsers =		await db.retriveDataUsers(cookieData.user);
	const result = 		await tokensCheckOut(tokens, dbUsers[0], cookieData.id);

	console.log("Match-access", result);
	switch(result) {
		case true:
			next();
			break;
		case false :
			dataTokens.storeSuspiciousTokens(tokens, userId);
			return(res.status(401).json({msg: "User blocked"}));
		case 404:
			return (res.status(404).json({msg: "User Not found"}));
		case 403:
			return (res.status(403).json({msg: "Suspicious try"}));
	};
};


const userTokenExpTime = async (req, res, next) => {
	const tokens =		extractTokens(req);
	const dbUser =		await db.retriveDataUsers(req.body.user_id);

	console.log("ExpToken", tokens, 'and user:', dbUser[0]);
	if (!dbUser[0])
		return(res.status(401).json({msg: "Not authorized"}));
	jwt.verify(tokens.authToken, process.env.SECRET_TOKEN, async (err) => {
		console.log('JWT', err);
		err ? res.status(403).json({msg: "Token access denied!"}) : next();
	});
};

module.exports = {
	extractTokens,
	inserNewUser: insertNewUser,
	userLoginValidation,
	userTokenExpTime,
	userTokenMatch,
}
