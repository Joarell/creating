


const pool = require('./db.settings');


async function shiftTokens(user) {
};

module.exports = { shiftTokens };

const counter = () => {
	let count = "working";
	let test = "now!!!";
	return () => {
		console.log(count);
		console.log(test);
	}
};
function obs() {
	console.log("I'm here");
};

// const increment = counter();
// const testing = [increment(), obs()]
// testing.forEach(ele => {
// 	return ele;
// });
