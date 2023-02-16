


async function postDataFromClientSide (content) {
	console.log(content);
	const url = '/insert';
	await fetch (url, {
		method: "POST",
		body: content,
		headers: {'Content-Type': 'application/json; charset=UTF-8'},
		cache: 'default'
	}).catch(err => console.error(`ALERT ${err}`));
};


async function getAllEstimatesReferenceClient () {
	const url = 'http://localhost:3000/search/estimates';
	const getter = await fetch(url).then(res => res.json().then(info => info));
	const codes = getter.map(refe => {
		const { reference_id } = refe;
		return ( reference_id );
	});
	return (codes);
};


export function saveTheCurrentEstimate (estimate) {
	const contentStorage = JSON.parse(sessionStorage.getItem(estimate));
	const { reference, list, crates } = contentStorage;
	const data = {
		reference: reference,
		list: list,
		crates: crates,
		user_name: 'Jev',
		user_id: 2
	};
	return (postDataFromClientSide(JSON.stringify(data)));
};


export function upDateEstimateClient(estimateCode) {
};


export function deleteEstimateClient (estimaateCode) {
};
