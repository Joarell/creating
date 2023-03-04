


const checker = require('../auth/user.check.out');
const db = require('../DB_models/db.transactions');
const jwt = require('jsonwebtoken');


const inserNewUser = async (req, res) => {
	const set = new WeakSet();
	const token = jwt.sign(
		{ data: req.body.name },
		process.env.SECRET_TOKEN,
		{ expiresIn: '30s'}
	);
	const refToken = jwt.sign(req.body.email, process.env.REF_SECRET_TOKEN);
	let userData = {...req.body, accessToken: token, refreshToken: refToken};
	const confirmation = await db.addNewUser(userData);

	set.add(userData);
	if (confirmation === 500)
		return (res.status(501).json({msg: "Pass frase procedure failure"}));
	userData = null;
	return(res.status(confirmation).send(req.body));
};


const newAccessToken = async (req, res) => {
	const authRefToken = req.body.token;
	const dbToken = await db.retriveDataUsers();
	const getToken = dbToken.find(token => token.refresh_token === authRefToken);

	if(!getToken)
		return (res.status(401).json({msg: 'Not authorized'}));
	const newToken = jwt.verify(
		authRefToken, process.env.REF_SECRET_TOKEN, (err, token) => {
		if(err)
			return (res.status(403).json({msg: 'Access denied!'}));
		return (jwt.sign( {email: token.email},
				process.env.SECRET_TOKEN,
				{ expiresIn: '30s' }
			));
	});
	db.addUserNewToken(newToken);
	return (res.status(200).json({accessToek: newToken}));
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


const userTokenCheckOut = async (req, res, next) => {
	const authToken = req.headers['authorization'];
	const token = authToken && authToken.split(' ')[1];
	const dbToken = await db.retriveDataUsers();
	const user = dbToken.find(user => user.auth_token === authToken);
	console.log(token);

	if(!token)
		return (res.status(401).json({msg: "Not authorized"}));
	jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
		if (err)
			return (res.status(403).json({msg: "Access denied!"}));
		next();
	});
};


const userShiftToken = async (req, res) => {
	const { name } = req.body;
	const dbUserCheck = await db.retriveDataUsers();
	let userGetter = dbUserCheck.find(user => user.name === name);

	if(!userGetter)
		return (res.status(404).json({msg: "User not found"}));
	authProcDB.shiftTokens(userGetter);
};

module.exports = {
	inserNewUser,
	newAccessToken,
	userShiftToken,
	userLoginValidation,
	userTokenCheckOut,
};