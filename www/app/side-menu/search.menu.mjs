


export async function checkBrowserDB(doc) {
	const workerDB =	new Worker('./panels/worker.IDB.crates.mjs');
	const checkIDB =	new Promise((resolve) => {
		workerDB.postMessage(doc)
		workerDB.onmessage = (result => {
			result !== undefined ? resolve(result.data): undefined;
		})
	});
	const data =		await checkIDB;

	if (data) {
		document.getElementById("input_estimate").value = doc;
		sessionStorage.setItem("FETCHED", JSON.stringify(data));
	}
	else if (!data)
		alert(`Document not found! Please, try again.`);
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

	return(!regexChecker(docEstimate) ? checkBrowserDB(docEstimate): false);
});


// function testClosure (num) {
// 	let count = num;
//
// 	const res = (() => {
// 		const num = 10;
//
// 		console.log(count * num);
// 		count += 10;
// 	});
// 	return (res);
// };
// const x = testClosure(3);
// x();
// x();
// x();
