const checker = require('../auth/user.check.out');
const db = require('../DB_models/db.transactions');

const getDataUsers = async (req, res) => {
	const result = await data.retriveDataUsers();
	return (res.status(200).send(result));
}


const getDataEstimates = async (req, res) => {
	const result = await data.retriveDataEstimates();
	return (res.status(200).send(result));
}


const addResultToDataBase = async (req, res) => {
	await data.addResultToDataBase(req.body);
	return (res.status(201).send(req.body));
};


const removeEstimates = async (req, res) => {
	const { reference_id } = req.params;
	await data.delEstimate(reference_id);

	return (res.status(204).send("Done!"));
};


const updateEstimate = async (req, res) => {
	await data.updateData(req.body);
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

	switch(auth){
		case 404:
			return(res.status(404).json({msg: "User not found"}));
		case 401:
			return(res.status(401).json({msg: "Wrong password."}));
		case 200:
			return(res.status(200).json({msg: "Authorized"}));
	}
};


module.exports = {
	inserNewUser,
	getDataUsers,
	getDataEstimates,
	addResultToDataBase,
	removeEstimates,
	updateEstimate,
	userLoginValidation
};
