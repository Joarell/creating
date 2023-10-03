

async function getNewTokenPairs() {
	const url =		'/shift/tokens';
	let cookie =	globalThis.document.cookie.split(' ');
	let user_id =	cookie.find(data => data.split('=')[0] === 'id').split('=')[1];
	let user_name =	cookie.find(data => data.split('=')[0] === 'user').split('=')[1];
	const HEADER =	{ 'Content-Type': 'application/json; charset=UTF-8' };
	const DATA =	JSON.stringify({ user_id, user_name })
	
	try {
		await fetch (url, {
			method: "GET",
			body: DATA,
			headers: HEADER,
		}).catch(err => console.error(`ALERT ${err}`));
		postDataFromClientSide(content);
	}
	catch(err) {
		alert(`ATTENTION: ${err}`);
	};
}


export async function checkTokens() {
	const request = new XMLHttpRequest();
	request.open('GET', '/app');
	request.onload = () => {
		console.log("DONE:", request.status);
	};
	request.send();
};
