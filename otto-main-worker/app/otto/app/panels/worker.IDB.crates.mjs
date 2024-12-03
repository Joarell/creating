

globalThis.onmessage = (estimate) => {
	const dataName	= "Results";
	const request	= globalThis.indexedDB.open(dataName);

	request.onerror = (event) => {
		console.log(`WARNING: ${event.target.errorCode}`);
	};
	request.onsuccess = () => {
		const db = request
		.result
		.transaction("Results")
		.objectStore("Results")
		.get(estimate.data);

		db.onerror = () => {
			globalThis.postMessage(false);
		}
		db.onsuccess = () => {
			globalThis.postMessage(db.result);
		};
	};
};
