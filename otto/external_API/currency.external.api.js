require('dotenv').config();


async function getCurrency () {
	const header =	new Headers();
	header.append("apikey", process.env.API_KEY2);
	const url =		`https://api.currencybeacon.com/v1/latest?api_key=
	${process.env.API_KEY2}`;
	const getterOptions = {
		method: 'GET',
		headers: header,
		redirect: 'follow'
	};
	const result =	await fetch(url, getterOptions).then(resp => resp.json())
		.catch(err => (console.error("warning", err)));

	return (result);
};

module.exports = { getCurrency };
