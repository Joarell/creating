


// TODO: develop a closure class to preserve the access and refresh token
// on the client side towards future http requests using Map().

async function getIDBData (ref) {
	const WORKER = new Worker('./panels/worker.IDB.crates.mjs');
	let request;

	WORKER.postMessage(ref);
	request = await new Promise((resolve, reject) => {
		WORKER.onmessage = (res) => {
			const { data } = res;
			data.reference === ref ? resolve(data) : reject(res);
		};
	});

	return(request);
};


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


// TODO: test.
async function getNewTokens(content) {
	const url =		'/shift/tokens';
	let cookie =	globalThis.document.cookie.split(' ');
	let user_id =	cookie.find(data => data.split('=')[0] === 'id').split('=')[1];
	let user_name =	cookie.find(data => data.split('=')[0] === 'user').split('=')[1];
	const HEADER =	{ 'Content-Type': 'application/json; charset=UTF-8' };
	const DATA =	JSON.stringify({ user_id, user_name })

	try {
		await fetch (url, {
			method: "PUT",
			body: DATA,
			headers: HEADER,
		}).catch(err => console.error(`ALERT ${err}`));
		postDataFromClientSide(content);
	}
	catch(err) {
		alert(`ATTENTION: ${err}`);
	};
};


function checkStatusCode(code, info, data, header) {
	switch(code) {
		case 409 :
			upDateEstimateClient(data, header);
			break ;
		case 403 :
			getNewTokens(info);
			break ;
	};
};


async function upDateEstimateClient(data, header) {
	if (confirm("This estimate already exist. Would you like to update it?")){
		const url = '/update/estimate';

		try {
			await fetch (url, {
				method: "PUT",
				body: data,
				headers: header,
			}).catch(err => console.error(`ALERT ${err}`));
		}
		catch(err) {
			alert(`ATTENTION: ${err}`);
		};
	}
	else
		alert(`Not updated!`);
};


async function postDataFromClientSide(content) {
	const DATA =	JSON.stringify(content);
	const url =		`/new/estimate/`;
	let token =		globalThis.document.cookie.split(' ');
	token = token.find(data => data.split('=')[0] === 'token').split('=')[1];
	const HEADER =	{
		'Authorization': `Bearer ${token}`,
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
		// TODO: set offline estimates to LocalStorage for upploading online.
};


export async function saveTheCurrentEstimate (estimate) {
	const contentStorage =	await getIDBData(estimate);
	const { reference, list, crates } = contentStorage;
	const result = Object.assign({}, crates);
	const INFO = {
		reference,
		list,
		crates : result,
		user_name: 'Bianca',
		user_id : 1,
	};
	return (postDataFromClientSide(INFO));
};


export function deleteEstimateClient (estimaateCode) {
};
