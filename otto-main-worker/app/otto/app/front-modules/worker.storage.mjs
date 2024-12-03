

globalThis.onmessage = (estimate) => {
	const request = globalThis.indexedDB.open("Results");

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
			globalThis.postMessage(undefined);
		}
		db.onsuccess = () => {
			globalThis.postMessage(db.result);
		};
	};
};
