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


// const checker =		require('../auth/user.check.out');
const db =			require('../DB_models/db.transactions');
const keepTokens =	require('../DB_models/db.auth.procedures');
const extract =		require('./user.controller');


const getDataUsers = async (req, res) => {
	const result = await db.retriveDataUsers();
	return (res.status(200).send(result));
}


const getDataEstimates = async (req, res) => {
	const result = await db.retriveDataEstimates(req.params.ref_id);
	return (res.status(200).send(result));
}


const addResultToDataBase = async (req, res) => {
	const result = await db.addResultToDataBase(req.body);
	return (result === 201 ? 
		res.status(201).send(req.body) : 
		res.status(409).send('DATA ALREADY EXIST!')
	);
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
	const tokens =	extract.extractTokens(req);
	const body =	{
		id : req.body.user_id,
		token: tokens.refToken,
		name : req.body.user_name
	};
	const result =	await keepTokens.tokenProcedures(tokens.authToken, body);

	if(result) {
		res.set({'Set-Cookie': [
			`user=${result.newAuthToken} ; Secure`,
			`token=${result.newRefToken} ; Secure`,
		]});
		res.status(201).json({ msg: 'active', result });
	}
	else
		res.status(403).json({msg: "Not authorized!"});
};


// TODO: HTTPS cookie tests.
const newLogin = async (req, res) => {
	console.log('LOGIN:', req.body.name);
	const dbUsers =	await db.retriveDataUsers(req.body.name);
	const user =	dbUsers[0];
	const body =	{id : user.id, token: user.refresh_token, name : user.name};
	const result =	await keepTokens.tokenProcedures(user.auth_token, body);

	if (result === 500)
		return(res.status(500).json({msg: 'Server error'}));
	res.set({'Set-Cookie': [
		`user=${result[1]}; SameSite; Secure`,
		`token=${result[0]}; SameSite; Secure`,
		`id=${user.id}; SameSite; Secure`,
	]});
	res.status(201).json({msg: 'active', result, id : user.id});
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
