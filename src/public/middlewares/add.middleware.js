// ╭────────────────────────────────────────────────────╮
// │ ╭────────────────────────────────────────────────╮ │
// │ │ INFO: Here is the estimate checkout functions: │ │
// │ │                validationData()                │ │
// │ │              userDataValidation()              │ │
// │ │            validationBodyUserAdd()             │ │
// │ │            validationBodyEstimate()            │ │
// │ │             dataEstimateChecker()              │ │
// │ │               dataUserChecker()                │ │
// │ ╰────────────────────────────────────────────────╯ │
// ╰────────────────────────────────────────────────────╯



const db			= require('../DB_models/db.transactions');
const jwt			= require('jsonwebtoken');
const authProcDB	= require('../DB_models/db.auth.procedures');


function validationData (data) {
	const result = data.map((info) => { return((info ?? '') !== ''); });
	return (result.includes(false));
};


const userDataValidation = async (req, res, next) => {
	if (!req.body)
		return( res.status(406).json({msg: "Missing data"}));
	const { user_name, user_id } = req.body;
	const dbUser = await db.retriveDataUsers();
	const user = dbUser.find(user => user.id === user_id);

	if (user_name !== user.name)
		return (res.status(406).json({msg: "User error!"}));
	next();
};


const validationBodyEstimate = async (req, res, next) => {
	if (!req.body)
		return( res.status(406).json({msg: "Missing data"}));
	const { reference, list, crates, user_name, user_id } = req.body;
	const valid		= validationData([
		reference, list, crates, user_name, user_id
	]);

	if (valid)
		return (res.status(206).json({
			message: `Oops! Please, Check all the information` }));
	next();
}


const dataEstimateChecker = async (req, res, next) => {
	if (!req.body)
		return( res.status(406).json({msg: "Missing data"}));
	const { reference } = req.body;
	const estimates		= await db.retriveDataEstimates();
	const checkEstimate = estimates.find(ref => ref.reference_id === reference);

	if (checkEstimate) {
		return (res.status(409).json({
			message: `Oops! The estimate already exists!`}));
	};
	next();
};


const validationBodyUserAdd = async (req, res, next) => {
	if (!req.body)
		return( res.status(406).json({msg: "Missing data"}));
	const { name, email, lastName, passFrase, birthday } = req.body;
	const data = validationData([name, lastName, email, passFrase, birthday]); 

	if (data) {
		return (res.status(206).json({
			message: `Oops! Please, Check all the information and try again`
		}));
	};
	next();
};


const dataUserChecker = async (req, res, next) => {
	if (!req.body)
		return(res.status(406).json({msg: "Missing data"}));
	const { name }	= req.body;
	const prevUsers = await db.retriveDataUsers();
	const checkUser = prevUsers.find(usr => usr.name === name);

	if (checkUser) {
		return (res.status(409).json({msg: 'The user already exists on DB'}));
	};
	next();
}

module.exports = { 
	validationBodyUserAdd,
	validationBodyEstimate,
	dataEstimateChecker,
	dataUserChecker,
	userDataValidation,
};
