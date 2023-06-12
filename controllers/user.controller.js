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


const checker		= require('../auth/user.check.out');
const db			= require('../DB_models/db.transactions');
const jwt			= require('jsonwebtoken');
const tokenMan		= require('../DB_models/db.auth.procedures');
const dataTokens	= require('../DB_models/db.tokens.stored');


const inserNewUser = async (req, res) => {
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


async function tokensCheckOut(tokenPairs, users, id){
	const user				= users.find(user => user.id === id);
	if (!user)
		return(404);
	const a_token			= tokenPairs[0].includes(user.auth_token);
	const r_token			= tokenPairs[1].includes(user.refresh_token);
	const checkedTokens		= await dbTokensCheckOut(tokenPairs);
	const suspiciousTokens	= await dbSuspiciousTokens(tokenPairs);

	if (checkedTokens || suspiciousTokens === true)
		return(403);
	if (a_token && r_token === true)
		return (true);
	return (false);
};


const userTokenMatch = async( req, res, next) => {
	if (!req.headers.authorization)
		return (res.status(401).json({msg: "Unauthorized"}));

	const authToken	= req.headers['authorization'].split(' ')[1]
	const { token }	= req.body;
	const dbUsers	= await db.retriveDataUsers();
	const userId	= req.body.id;
	const result	= await tokensCheckOut([authToken, token], dbUsers, userId);

	console.log(result);
	switch(result) {
		case true:
			next();
			break;
		case false :
			dataTokens.storeSuspiciousTokens([authToken, token], req.body.id);
			return(res.status(401).json({msg: "User blocked"}));
		case 404:
			return (res.status(404).json({msg: "User Not found"}));
		case 403:
			return (res.status(403).json({msg: "Suspicious try"}));
	};
};


const userTokenExpTime = async (req, res, next) => {
	const token	= req.headers.cookie && req.headers.cookie.split('=')[1];

	console.log('Token', token);
	if (!token)
		return (res.status(401).json({msg: "Unauthorized"}));

	const dbUsers	= await db.retriveDataUsers();
	const user		= dbUsers.find(user => {
		return (user.auth_token === token);
	});

	if (!user)
		return(res.status(401).json({msg: "Not authorized"}));
	jwt.verify(token, process.env.SECRET_TOKEN, async (err, user) => {
		err ? res.status(403).json({msg: "Token access denied!"}) :
		next();
	});
};

module.exports = {
	inserNewUser,
	userLoginValidation,
	userTokenExpTime,
	userTokenMatch,
};
