const bcrypt = require('bcrypt');
const db = require('../DB_models/db.transactions');
require('dotenv').config();

async function checkUserAuthDB (userLogin) {
	const data		= await db.retriveDataUsers();
	const dbUser	= data.find(user => {
		if(userLogin.name === user.name)
			return(user);
	});
	console.log(userLogin);
	console.log(dbUser);

	if(!dbUser)
		return (404);
	try {
		if (await bcrypt.compare(userLogin.passFrase, dbUser.pass_frase))
			return(200);
		else
			return(401);
	}
	catch (err) {
		console.error(`WARNING ${err}`);
	}
};

module.exports = { checkUserAuthDB };
