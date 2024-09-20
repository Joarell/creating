globalThis.onmessage = async (session) => {
	let check = true;

	while(check && session) {
		let res = await fetch (`/loginCheck/${session.data}`, {
			method: "GET",
			headers: { 'Content-Type': 'application/json; charset=UTF-8' },
		}).then(body => body.json());

		res.access === "ended" ? check = false : true;
	};
	globalThis.postMessage(false);
};
