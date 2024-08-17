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


const db =						require('../DB_models/db.transactions');
const keepTokens =				require('../DB_models/db.auth.procedures');
const { randomBytes } =			require('crypto');
const { extractCookieData } =	require('./user.controller');

const getDataUsers = async (req, res) => {
	const result = await db.retrieveDataUsers();
	return (res.status(200).send(result));
}


const getDataEstimates = async (req, res) => {
	const result = await db.retrieveDataEstimates(req.params.ref_id);
	return (res.status(200).send(result));
}


const addResultToDataBase = async (req, res) => {
	const cookie =		extractCookieData(req);
	const result =		await db.addResultToDataBase(req.body, cookie);
	return (result === 201 ?
		res.status(201).send(req.body) :
		res.status(409).send('DATA ERROR!')
	);
};


const removeEstimates = async (req, res) => {
	const { ref_id } = req.params;
	await db.delEstimate(ref_id);
	return (res.status(204).json({msg:"Done!"}));
};


const updateEstimate = async (req, res) => {
	const session =	extractCookieData(req).session;
	const checker = await db.updateData(req.body, session);
	return(checker === 500 ?
		res.status(500):
		res.status(202).send(req.body)
	);
};


const shiftTokens = async (req, res) => {
	const cookie =	extractCookieData(req);
	console.log('RENEWED', cookie, 'and', typeof cookie.id);
	const body =	{
		id : cookie.id,
		token: cookie.refToken,
		name : cookie.name
	};
	const result =	await keepTokens
		.tokenProcedures(cookie.authToken, body, cookie.session);

	if(result !== 500) {
		res.set({'Set-Cookie': [
			`user=${result.newAuthToken};
				Max-Age=10; HttpOnly; SameSite=Strict; Secure;`,
			`token=${result.newRefToken};
				Max-Age=10; HttpOnly; SameSite=Strict; Secure;`,
		]});
		res.status(201).json({ msg: 'active', result });
	}
	else
		res.status(401).json({msg: "Not authorized!"});
};


const newLogin = async (req, res) => {
	const session =	randomBytes(5).toString('hex');
	const dbUsers =	await db.retrieveDataUsers(req.body.name, 'login');
	const user =	dbUsers[0];
	const body =	{id : user.id, token: user.refresh_token, name : user.name};
	const result =	await keepTokens
		.tokenProcedures(user.auth_token, body, session);

	if (result === 500)
		return(res.status(500).json({msg: 'Server error'}));
	res.set({
		'Set-Cookie': [
		`name=${user.name}; Max-Age=43200; HttpOnly; SameSite=Strict; Secure;`,
		`session=${session}; Max-Age=43200; HttpOnly; SameSite=Strict; Secure;`,
		`user=${result[1]}; Max-Age=3; HttpOnly; SameSite=Strict; Secure;`,
		`token=${result[0]}; Max-Age=3; HttpOnly; SameSite=Strict; Secure;`,
		`id=${user.id}; Max-Age=43200; HttpOnly; SameSite=Strict; Secure;`,
		],
	});
	res.status(201).json({
		msg: 'active', result, id : user.id, access: user.grant_access
	});
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
