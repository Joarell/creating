


const db = require('../DB_models/db.transactions');
const jwt = require('jsonwebtoken');
const authProcDB = require('../DB_models/db.auth.procedures');


function validationContent (data) {
	const result = data.some((info) => {
		let test = [undefined, "", null, NaN].includes(info);
		return (test);
	});
	return (result);
};


const validationBodyEstimate = async (req, res, next) => {
	let { body } = req;
	const { reference, list, crates, user_name, user_id } = body;
	let content = [reference, list, crates, user_name, user_id];
	const estimates = await db.retriveDataEstimates();
	const validation = validationContent(content);
	const checkEstimate = estimates.find(ref => ref.reference_id === reference);
	const set = new WeakSet();

	console.log("Test of invalid fields:", validationContent);
	console.log("Test if the estimate in on DB:", checkEstimate);

	set.add(content);
	set.add(body);
	if (validation) {
		return (res.status(206).json({
			message: `Oops! Please, Check all the information and try again`
		}));
	};
	if (checkEstimate) {
		return (res.status(409).json({
			message: `Oops! The estimate already exists!`}));
	};
	content = null;
	body = null;
	next();
}


const validationBodyUserAdd = async (req, res, next) => {
	const { name, email, lastName, passFrase, birthday } = req.body;
	const prevUsers = await db.retriveDataUsers();
	const checkUser = prevUsers.find(usr => usr.name === name);
	let data = validationContent([name, lastName, email, passFrase, birthday]); 

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

	if (!checkUser)
		return (res.status(409).json({msg: 'The user already exists on DB'}));
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
		next();
	});
};


module.exports = { 
	validationBodyUserAdd,
	validationBodyEstimate,
	userTokenCheckOut,
};
