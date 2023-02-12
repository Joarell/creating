const data = require('../DB_models/db.transactions.js');


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

module.exports = {
	getDataUsers,
	getDataEstimates,
	addResultToDataBase,
	removeEstimates,
	updateEstimate
};
