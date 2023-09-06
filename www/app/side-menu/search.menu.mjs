

export async function checkBrowserDB(doc) {
	const workerDB =	new Worker('./panels/worker.IDB.crates.mjs');
	const checkIDB =	await new Promise((resolve, reject) => {
		workerDB.postMessage(doc);
		workerDB.onmessage = (result => {
			result !== undefined ? resolve(result.data): reject(undefined);
		})
	});

	if (checkIDB) {
		document.getElementById("input_estimate").value = doc;
		sessionStorage.setItem("FETCHED", JSON.stringify(checkIDB));
	}
	else if (!checkIDB)
		alert(`Document not found! Please, try again.`);
	else
		setTimeout(alert(`Document not found! Please, try again.`), 200);
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


export function searchEstimate() {
	const docEstimate =	document.getElementById("estimate_getter").value;

	return(!regexChecker(docEstimate) ? checkBrowserDB(docEstimate): false);
};


// INFO: Closure test.
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
