// ╭──────────────────────────────────────────────────────────────╮
// │ ╭──────────────────────────────────────────────────────────╮ │
// │ │            INFO: Here is the API controllers             │ │
// │ │                      getDataUsers()                      │ │
// │ │                    getDataEstimates()                    │ │
// │ │                  addResultToDataBase()                   │ │
// │ │                    removeEstimates()                     │ │
// │ │                     updateEstimate()                     │ │
// │ │                      shiftTokens()                       │ │
// │ │                        newLogin()                        │ │
// │ ╰──────────────────────────────────────────────────────────╯ │
// ╰──────────────────────────────────────────────────────────────╯


const checker		= require('../auth/user.check.out');
const db			= require('../DB_models/db.transactions');
const keepTokens	= require('../DB_models/db.auth.procedures');


const getDataUsers = async (req, res) => {
	const result = await db.retriveDataUsers();
	return (res.status(200).send(result));
}


const getDataEstimates = async (req, res) => {
	const result = await db.retriveDataEstimates();
	return (res.status(200).send(result));
}


const addResultToDataBase = async (req, res) => {
	await db.addResultToDataBase(req.body);
	return (res.status(201).send(req.body));
};


const removeEstimates = async (req, res) => {
	const { reference_id } = req.params;
	await db.delEstimate(reference_id);
	return (res.status(204).json({msg:"Done!"}));
};


const updateEstimate = async (req, res) => {
	await db.updateData(req.body);
	return(res.status(202).send(req.body));
};


const shiftTokens = async (req, res) => {
	const authToken	= req.headers['authorization'].split(' ')[1];
	const result	= await keepTokens.tokenProcedures(authToken, req.body);
	
	result === 403 ?
		res.status(403).json({msg: "Not authorized!"}) :
		res.status(201).json({tokens: result});
};


const newLogin = async (req, res) => {
	const dbUsers	= await db.retriveDataUsers();
	const user		= dbUsers.find(user => user.name === req.body.name);
	const body		= {id: user.id, token: user.refresh_token};
	const result	= await keepTokens.tokenProcedures(user.auth_token, body);

	result !== 500 ?
	res.status(201).json({msg: "Logged"}) :
	res.status(500).json({msg: "Server error"});
};

module.exports = {
	addResultToDataBase,
	getDataUsers,
	getDataEstimates,
	newLogin,
	removeEstimates,
	shiftTokens,
	updateEstimate,
};
