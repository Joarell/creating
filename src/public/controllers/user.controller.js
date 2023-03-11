


const checker	= require('../auth/user.check.out');
const db		= require('../DB_models/db.transactions');
const jwt		= require('jsonwebtoken');
const tokenMan	= require('../DB_models/db.auth.procedures');


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


const newAccessToken = async (req, res, next) => {
	const authRefToken	= req.body.token;
	const dbToken		= await db.retriveDataUsers();
	const getToken		= dbToken.find(
		token => token.refresh_token === authRefToken
	);

	if(!getToken)
		return (res.status(401).json({msg: 'Not authorized'}));
	const newToken = jwt.verify(
		authRefToken, process.env.REF_SECRET_TOKEN, (err, token) => {
		if(err)
			return (res.status(403).json({msg: 'Access denied!'}));
		return (res.status(200).json({
			new_token: tokenMan.authTokenGen(token.name)}
		));
	});
	next();
}


const userLoginValidation = async (req, res) => {
	const auth = await checker.checkUserAuthDB(req.body);
	console.log(auth);

	switch (auth) {
		case 404:
			return(res.status(404).json({msg: "User not found"}));
		case 401:
			return(res.status(401).json({msg: "Wrong password."}));
		case 200:
			return(res.status(200).json({msg: "Authorized"}));
	};
};


function tokensSearcher(tokenPairs, users, id){
	const user		= users.find(user => user.id === id);
	const a_token	= tokenPairs[0].includes(user.auth_token);
	const r_token	= tokenPairs[1].includes(user.refresh_token);
	
	if (a_token && r_token === true)
		return (true);
	if (a_token || r_token === true)
		return (false);
	return(404);
};


const userTokenMatch = async( req, res, next) => {
	const authToken		= req.headers['authorization'].split(' ')[1]
	const { token }		= req.body;
	const dbUsers		= await db.retriveDataUsers();
	const userId		= req.body.id;
	const result		= tokensSearcher([authToken, token], dbUsers, userId);

	switch(result) {
		case true:
			next();
			break;
		case false:
			tokenMan.storeSuspiciousTokens([authToken, token], req.body.id);
			return(res.status(401).json({msg: "Token blocked"}));
		case 404:
			return (res.status(404).json({msg: "User Not found"}));
	};
};


const userTokenExpTime = async (req, res, next) => {
	const authToken		= req.headers['authorization'];
	const token			= authToken && authToken.split(' ')[1];
	const dbToken		= await db.retriveDataUsers();
	const user			= dbToken.find(user => user.auth_token === authToken);

	if (!token)
		return (res.status(401).json({msg: "Not authorized"}));
	jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
		const time_limit = 10;
		const hourInSec = 3600;
		const time = ~~ (
			(new Date(Date.now()) - new Date(err.expiredAt)) / hourInSec
		) / 1000;

		if (time > time_limit) {
			return (res.status(403).json({msg: "Access denied!"}));
		}
		next();
	});
};

module.exports = {
	inserNewUser,
	newAccessToken,
	userLoginValidation,
	userTokenExpTime,
	userTokenMatch,
}
