
export async function logout() {
	const url = '/logout';
	const cookies = "id=deleted; sessin=deleted; name=deleted; expires=Thu, 01 Jan 1970 00:00:00 GMT";

	if (confirm("Are you sure to logout?")) {
		globalThis.location.replace('/otto/login/');
		try {
			await fetch(url, {
				method: "GET",
				cookie: cookies,
				headers: { 'Content-Type': 'application/json; charset=UTF-8' },
			}).then(res => console.log(res))
			// }).then(res => globalThis.location.replace(res.url))
			.catch(err => console.error(`Alert ${err}`));
		}
		catch (err) {
			alert(`Attention: ${err}`);
		};
	}
};
