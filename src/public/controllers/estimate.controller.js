const checker = require('../auth/user.check.out');
const db = require('../DB_models/db.transactions');
const currency = require('../www/API/currency.external.api');


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

	return (res.status(204).send("Done!"));
};


const updateEstimate = async (req, res) => {
	await db.updateData(req.body);
	return(res.status(202).send(req.body));
};


const inserNewUser = async (req, res) => {
	const confirmation = await db.addNewUser(req.body);

	if (confirmation === 500)
		return (res.status(501).json({msg: "Pass frase procedure failure"}));
	return(res.status(201).send(req.body));
};


const userLoginValidation = async (req, res) => {
	const auth = await checker.checkUserAuth(req.body);
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


const externalAPICurrency = async (req, res) => {
	const coins = await currency.getCurrency();

	if (!coins)
		res.status(404).json({msg: "External API error."});
	return (res.status(202).send(coins));
};

module.exports = {
	inserNewUser,
	getDataUsers,
	getDataEstimates,
	addResultToDataBase,
	removeEstimates,
	updateEstimate,
	userLoginValidation,
	externalAPICurrency
};
