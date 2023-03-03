

const currency = require('../www/API/currency.external.api');


const externalAPICurrency = async (req, res) => {
	const coins = await currency.getCurrency();

	if (!coins)
		res.status(404).json({msg: "External API error."});
	return (res.status(202).send(coins));
};

module.exports = { externalAPICurrency };
