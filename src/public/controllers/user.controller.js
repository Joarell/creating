


const checker	= require('../auth/user.check.out');
const db		= require('../DB_models/db.transactions');
const jwt		= require('jsonwebtoken');
const tokenGen	= require('../DB_models/db.auth.procedures');


const inserNewUser = async (req, res) => {
	const set		= new WeakSet();
	const token		= tokenGen.authTokenGen( req.body.name );
	const refToken	= tokenGen.refTokenGen( req.body.email);
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
			new_token: tokenGen.authTokenGen(token.name)}
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


const userTokenMatch = async( req, res, next) => {
	const authToke	= req.headers['authorization'].split(' ')[1]
	const { token }	= req.body;
	const dbTokens	= await db.retriveDataUsers();
	const match		= [authToke, token ];
	const user		= dbTokens.find(user => {
		const a_token = match.includes(user.auth_token);
		const r_token = match.includes(user.refresh_token);
		if (a_token && r_token !== undefined)
			return (user);
	});

	console.log("user", user);
	console.log("tokens", match);
	user !== undefined ? next() : res.status(401).json({msg: "Token Denied"});
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
