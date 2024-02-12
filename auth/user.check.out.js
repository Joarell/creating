

const cryptics =	require('./encryptation.module.js');
const db =			require('../DB_models/db.transactions');
require('dotenv').config();


async function checkUserAuthDB (userLogin) {
	const data		= await db.retrieveDataUsers(userLogin.name);

	console.log('LOGGED', data[0], 'and', userLogin);
	if(!data[0])
		return (404);
	try {
		const pass =	userLogin.passFrase;
		const hash =	data[0].pass_frase;

		if (cryptics.decryptChecker(pass, hash))
			return(200);
	}
	catch (err) {
		console.error(`WARNING ${err}`);
		return(401);
	}
};

module.exports = { checkUserAuthDB };
