


globalThis.onmessage = async (estimate) => {
	const request = globalThis.indexedDB.open("Results");

	request.onerror = (event) => {
		console.log(`WARNING: ${event.target.errorCode}`);
	};
	request.onsuccess = () => {
		const db = request
			.result
			.transaction("Results")
			.objectStore("Results").get(estimate.data);
	
		db.onsuccess = () => {
			globalThis.postMessage(db.result);
		};
	};
};