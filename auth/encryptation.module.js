
const { scryptSync, randomBytes } = require('crypto');


function encryptPassWord(pass, salt) {
	return (scryptSync(pass, salt, 32).toString('hex'));
}


function decryptChecker(pass, hash) {
	const salt =				hash.slice(64);
	const originalPassHash =	hash.slice(0, 64);
	const currentPassHash =		encryptPassWord(pass, salt);

	console.log('HASHES', originalPassHash, 'and', currentPassHash);
	return(originalPassHash === currentPassHash);
};


function passEncryptProcedure (passFrase) {
	try {
		const salt =	randomBytes(16).toString('hex');
		const hashed =	encryptPassWord(passFrase, salt) + salt;

		return (hashed);
	}
	catch (err) {
		console.error(`Pass failed ${err}`);
		return (500);
	};
};

module.exports = {
	decryptChecker,
	encryptPassWord,
	passEncryptProcedure
};
