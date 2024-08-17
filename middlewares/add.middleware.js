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


const db =						require('../DB_models/db.transactions');
const { extractCookieData } =	require('../controllers/user.controller');


// TODO: refactor code: "const isFalse = (data) => !data"
function validationData (data) {
	const result = data.find(info => info === '' || info === ' ')
	return (result);
};


const userDataValidation = async (req, res, next) => {
	const cookie = extractCookieData(req);
	if (!req.body)
		return( res.status(406).json({msg: "Missing data"}));
	const { name } = cookie;
	const dbUser = await db.retrieveDataUsers(name, 'auth');

	if (!dbUser)
		return (res.status(406).json({msg: "User error!"}));
	next();
};


const validationBodyEstimate = async (req, res, next) => {
	if (!req.body)
		return( res.status(406).json({msg: "Missing data"}));
	const { reference, list, crates } = req.body;
	const valid = validationData([reference, list, crates]);

	if (valid)
		return (res.status(206).json({
			message: `Oops! Please, Check all the information.` }));
	next();
}


const dataEstimateChecker = async (req, res, next) => {
	if (!req.body)
		return( res.status(406).json({msg: "Missing data"}));
	const { reference } = req.body;
	const estimate		= await db.retrieveDataEstimates(reference);

	if (!estimate) {
		return (res.status(409).json({
			message: `Oops! The estimate already exists!`}));
	};
	next();
};


const validationBodyUserAdd = async (req, res, next) => {
	if (!req.body)
		return( res.status(406).json({msg: "Missing data"}));
	const { user_name, email, lastName, passFrase, birthday } = req.body;
	const data = validationData([user_name, lastName, email, passFrase, birthday]);

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
	const prevUsers = await db.retrieveDataUsers(req.body.user_name);
	const checkUser = prevUsers.find(usr => usr.name === name);

	if (checkUser)
		return (res.status(409).json({msg: 'The user already exists on DB'}));
	next();
}


module.exports = {
	validationBodyUserAdd,
	validationBodyEstimate,
	dataEstimateChecker,
	dataUserChecker,
	userDataValidation,
};
