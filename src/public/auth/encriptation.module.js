const bcrypt = require('bcrypt');


async function passEncriptProcedure (passFrase) {
	try {
		const salt = await bcrypt.genSalt(11);
		const hashedPass = await bcrypt.hash(passFrase, salt);

		return (hashedPass);
	}
	catch (err) {
		console.error(`Pass failed ${err}`); 
		return (500);
	};
};

module.exports = { passEncriptProcedure };
