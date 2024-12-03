export async function getCurrency(key: string): Promise<unknown | Error>{
	const headers: Headers = new Headers();
	const url =		`https://api.currencybeacon.com/v1/latest?api_key=${key}`;
	headers.append("apikey", key);
	const request: Request = new Request(url, {
		method: 'GET',
		headers,
		redirect: 'follow'
	});
	const response: unknown | Error = await fetch(request)
		.then(resp => resp.json())
		.catch(e => e)

	return(response);
};
