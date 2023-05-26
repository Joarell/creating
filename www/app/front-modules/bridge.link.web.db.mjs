


// TODO: develop a closure class to preserve the access and refresh token
// on the client side towards future http requests using Map().


async function postDataFromClientSide (content) {
	// console.log(content);
	const url = '/insert/estimate';
	await fetch (url, {
		method: "POST",
		body: content,
		headers: {'Content-Type': 'application/json; charset=UTF-8'},
		cache: 'default'
	}).catch(err => console.error(`ALERT ${err}`));
};


export function saveTheCurrentEstimate (estimate) {
	const contentStorage = JSON.parse(sessionStorage.getItem(estimate));
	const { reference, list, crates } = contentStorage;
	const data = {
		reference: reference,
		list: list,
		crates: crates,
		name: 'Jev',
		id: 2
	};
	return (postDataFromClientSide(JSON.stringify(data)));
};


export function upDateEstimateClient (estimateCode) {
};


export function deleteEstimateClient (estimaateCode) {
};
