


export async function checkBrowserDB(doc) {
	const workerDB =	new Worker('./panels/worker.IDB.crates.mjs');
	const checkIDB =	new Promise((resolve) => {
		let data;

		workerDB.postMessage(doc)
		workerDB.onmessage = (result => {
			result !== undefined ? resolve(data = result.data): data;
		})
	});
	const data =		await checkIDB;

	if (data) {
		document.getElementById("input_estimate").value = doc;
		sessionStorage.setItem("FETCHED", JSON.stringify(data));
	}
	else
		return(fetchDB(doc));
};


function fetchDB(doc) {
}


function regexChecker(data){
	const regex = /[^-a-z-A-Z-0-9]/g;

	switch(regex.test(data)) {
		case true:
			alert(`Found special character NOT allowed. Please, try again!`);
			return (true);
		case false:
			return (false);
	};
};


globalThis.document.getElementById("fetch-btn")
	.addEventListener("click", () => {
	const docEstimate =		document.getElementById("estimate_getter").value;
	const checkStorage =	checkBrowserDB(docEstimate);

	return(!regexChecker(docEstimate) ? checkBrowserDB(docEstimate): false);
});
