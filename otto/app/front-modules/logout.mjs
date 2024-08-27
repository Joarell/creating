
export async function logout() {
	const url = '/logout';
	const cookies = "id=deleted; sessin=deleted; name=deleted; expires=Thu, 01 Jan 1970 00:00:00 GMT";

	if (confirm("Are you sure to logout?")) {
		try {
			const checkOut = await fetch(url, {
				method: "GET",
				cookie: cookies,
				headers: { 'Content-Type': 'application/json; charset=UTF-8' },
			}).then(res => globalThis.location.assign(res.url))
		}
		catch (err) {
			alert(`Attention: ${err}`);
		};
	}
};
