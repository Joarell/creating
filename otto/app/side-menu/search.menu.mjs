// NOTE: reset the code changed by the data base in order to render on status panel.
function resetList(list) {
	const reset = [];

	list.map((work) => {
		const { code, x, z, y } = work;
		reset.push({ code, x, z, y });
	});
	return reset;
};

// NOTE: the path is different with or without the bundle file.
export async function checkBrowserDB(doc) {
	const workerDB = new Worker(
		// new URL("../panels/worker.IDB.crates.mjs", import.meta.url),
		new URL("./panels/worker.IDB.crates.mjs", import.meta.url),
		{ type: "module" },
	);
	const checkIDB = await new Promise((resolve, reject) => {
		workerDB.postMessage(doc);
		workerDB.onmessage = (result) => {
			result !== undefined ? resolve(result.data) : reject(undefined);
		};
	});

	if (checkIDB) {
		document.getElementById("input_estimate").value = doc;
		sessionStorage.setItem("FETCHED", JSON.stringify(checkIDB));
		return(setDBFetched([checkIDB]));
	};
	return fetchDB(doc);
};

function setDBFetched(result) {
	try {
		if (result.length > 0 || result?.hasOwnProperty('crates')) {
			const { crates, works, reference_id } = result[0];
			const fetched = {
				crates,
				list: result[1]?.hasOwnProperty('crates') ?
					resetList(result[1]):
					resetList(works.list),
				reference: reference_id,
			};
			const data = JSON.stringify(fetched);

			document.getElementById("input_estimate").value = reference_id;
			globalThis.sessionStorage.clear();
			globalThis.sessionStorage.setItem("FETCHED", data);
		}
		else throw new TypeError("Data not found!");
	} catch (err) {
		console.log(`ATTENTION: ${err}`);
		alert(`Document not found! Please, try again.`);
	};
};

async function fetchDB(doc) {
	const url = `/estimates/${doc}`;
	const HEADER = {
		"Content-Type": "application/json; charset=UTF-8",
	};
	if (globalThis.navigator.onLine) {
		try {
			await fetch(url, {
				method: "GET",
				headers: HEADER,
			}).then((estimate) => estimate.json())
			.then(setDBFetched)
			.catch((err) => console.error(`ALERT ${err}`));
		} catch (err) {
			console.log(`ATTENTION: ${err}`);
			alert(`Document not found on database! Please, try again.`);
		}
	}
};

function regexChecker(data) {
	const regex = /[^-a-z-A-Z-0-9]/g;

	switch (regex.test(data)) {
		case true:
			alert(`Found special character NOT allowed. Please, try again!`);
			return true;
		case false:
			return false;
	}
};

export function searchEstimate() {
	const docEstimate = document.getElementById("estimate_getter").value;

	return !regexChecker(docEstimate) ? checkBrowserDB(docEstimate) : false;
};
