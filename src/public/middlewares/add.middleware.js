


const db = require('../DB_models/db.transactions');
const jwt = require('jsonwebtoken');


function validationContent (data) {
	const result = data.some((info) => {
		let test = [undefined, "", null, NaN].includes(info);n
		return (test);
	});
	return (result);
};


// TODO: improve the validation keys from the request body
const validationBodyEstimate = async (req, res, next) => {
	const { body } = req;
	const { reference, list, crates, user_name, user_id } = body;
	const content = [reference, list, crates, user_name, user_id];
	const estimates = await db.retriveDataEstimates();
	const validation = validationContent(content);
	const checkEstimate = estimates.find(ref => ref.reference_id === reference);

	console.log("Test of invalid fields:", validationContent);
	console.log("Test if the estimate in on DB:", checkEstimate);

	if (validation) {
		return (res.status(206).json({
			message: `Oops! Please, Check all the information and try again`
		}));
	};
	if (checkEstimate) {
		return (res.status(409).json({
			message: `Oops! The estimate already exists!`}));
	};
	next();
}


// TODO: improve the validation keys from the request body
const validationBodyUserAdd = async (req, res, next) => {
	const { name, email, lastName, passFrase, birthday } = req.body;
	const prevUsers = await db.retriveDataUsers();
	const checkUser = prevUsers.find(usr => usr.name === name);
	const data = validationContent([name, lastName, email, passFrase, birthday]); 

	console.log(data);
	if (checkUser) {
		return (res.status(409).json({msg: 'The user already exists on DB'}));
	};
	if (data) {
		return (res.status(206).json({
			message: `Oops! Please, Check all the information and try again`
		}));
	};
	next();
};


const validationBodyUser = async (req, res, next) => {
	const { name} = req.body;
	const prevUsers = await db.retriveDataUsers();
	const checkUser = prevUsers.find(usr => usr.name === name);
	console.log(checkUser);

	if (!checkUser) {
		return (res.status(409).json({msg: 'The user already exists on DB'}));
	};
	next();
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
		req.user = user;
		next();
	});
};

module.exports = { 
	validationBodyUserAdd,
	validationBodyEstimate,
	userTokenCheckOut
};
