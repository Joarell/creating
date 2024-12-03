/**
 * @param {String} doc The reference/document code estimate when the page is offline.
*/
function setOfflineRef(doc) {
	const STORAGE =	localStorage;
	const offList =	STORAGE.getItem('offResults');
	const list =	offList !== undefined ? JSON.parse(offList) : false;

	if (list) {
		list.push(doc);
		STORAGE.removeItem('offResults');
		STORAGE.setItem('offResults', JSON.stringify(list));
	}
	else
		STORAGE.setItem('offResults', JSON.stringify([doc]));
}


// TODO: develop a closure class to preserve the access and refresh token
// on the client side towards future http requests using Map().
/**
 * @param {Crater} content The solved list result from the algorithm.
*/
async function getNewTokens(content) {
	const url =		'/shift/tokens';
	const HEADER =	{ 'Content-Type': 'application/json; charset=UTF-8' };

	try {
		const result = await fetch (url, {
			method: "POST",
			headers: HEADER,
		}).then(code => code.status)
		.catch(err => console.error(`ALERT ${err}`));
		postDataFromClientSide(content);
		console.log(result);
	}
	catch(err) {
		alert(`ATTENTION: ${err}`);
	};
};


/**
 * @param {Number} code HTTP code.
 * @param {String} info The server answer about the user access token.
 * @param {Crater} data The crater object result serialized.
 * @param {Object} header Object header to HTTP request.
*/
function checkStatusCode(code, info, data, header) {
	switch(code) {
		case 409 :
			upDateEstimateClient(data, header, info);
			break ;
		case 403 :
			getNewTokens(info);
			break ;
	};
};


/**
 * @param {Object} solve the solved list with new crates sizes
*/
export async function upDateCrateSizes(solved) {
	const HEADER =	{ 'Content-Type': 'application/json; charset=UTF-8', };
	const url = '/update/estimate';
	const { reference, list, crates } = solved;
	const INFO = {
		reference,
		list,
		crates: Object.assign({}, crates)
	};
	try {
		await fetch (url, {
			method: "PUT",
			body: JSON.stringify(INFO),
			headers: HEADER,
		}).then(code => code.status).catch(err => console.error(`ALERT ${err}`));
	}
	catch(err) {
		alert(`ATTENTION: ${err}`);
	}
	finally {
		return('updated');
	}
}


/**
 * @param {String} content The server answer about the user access token.
 * @param {Crater} data The crater object result serialized.
 * @param {Object} header Object header to HTTP request.
 */
async function upDateEstimateClient(data, header, content) {
	if (confirm("This estimate already exist. Would you like to update it?")){
		const url = '/update/estimate';

		try {
			const result = await fetch (url, {
				method: "PUT",
				body: data,
				headers: header,
			}).then(code => code.status)
				.catch(err => console.error(`ALERT ${err}`));
			result === 403 ? checkStatusCode(result, content) : false;
		}
		catch(err) {
			alert(`ATTENTION: ${err}`);
		};
	}
	else
		alert(`Not updated!`);
};

/**
 * @param {Crater} content The solved list result from the algorithm.
 */
async function postDataFromClientSide(content) {
	const DATA =	JSON.stringify(content);
	const url =		`http://localhost:8787/api/v1/newEstimate`;
	const HEADER =	{
		'Content-Type': 'application/json; charset=UTF-8',
	};
	if (globalThis.navigator.onLine) {
		try {
			const result = await fetch (url, {
				method: "POST",
				body: DATA,
				headers: HEADER,
			}).then(code => code.status)
				.catch(err => console.error(`ALERT ${err}`));
			checkStatusCode(result, content, DATA, HEADER);
		}
		catch(err) {
			alert(`ATTENTION: ${err}`);
		}
	}
	else
		setOfflineRef(content.reference);
};


/**
 * @param {String} estimate The algorithm solved result.
 */
export async function saveTheCurrentEstimate (estimate) {
	const { reference, list, crates } = estimate;
	const INFO = {
		reference,
		list,
		crates: Object.assign({}, crates)
	};
	await postDataFromClientSide(INFO)
};


// export function deleteEstimateClient (estimaateCode) {
// };
