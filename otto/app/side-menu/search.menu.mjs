
import * as status from '../front-modules/functions.front.end.mjs';
import { addNewWorksToIndexedDB } from '../front-modules/link.storage.mjs';


function closeDialog() {
	const closeDialog =	document.querySelector('.side-menu');

	closeDialog?.getElementsByTagName('padding-dialog')?.length > 0 ?
		sessionStorage.setItem('CLOSED', 'NOW') : false;
	status.displayCub();
	status.displayAirCub();
	status.countWorks();
};


// NOTE: reset the code changed by the data base in order to render on status panel.
/**
 * @param {Crater} list The Crater object fetched from the DB.
 */
function resetList(list) {
	const reset = [];

	list.map((work) => {
		const { code, x, z, y } = work;
		reset.push({ code, x, z, y });
	});
	return reset;
};


// NOTE: the path is different with or without the bundle file.
/**
 * @param {String} doc The reference/document with artwork list.
 */
export async function checkBrowserDB(doc) {
	const workerDB =	new Worker(
		// new URL("../panels/worker.IDB.crates.mjs", import.meta.url),
		new URL("./panels/worker.IDB.crates.mjs", import.meta.url),
		{ type: "module" },
	);
	const checkIDB =	await new Promise((resolve, reject) => {
		workerDB.postMessage(doc);
		workerDB.onmessage = (result) => {
			result !== undefined ? resolve(result.data) : reject(undefined);
		};
	});

	if (checkIDB) {
		document.getElementById("input_estimate").value = doc;
		sessionStorage.setItem("FETCHED", JSON.stringify(checkIDB));
		closeDialog();
		setDBFetched([checkIDB]);
		return("IDB data Found.");
	};
	return(false);
};


/**
 * @param {Crater} result The Crater object with the solved list from DB.
 */
async function setDBFetched(result) {
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
			closeDialog();
		}
		else
			throw new TypeError("Data not found!");
	} catch (err) {
		return(err);
	};
};


/**
 * @param {String} doc The reference/document with artwork list.
 */
async function fetchDB(doc) {
	const url =		`/estimates/${doc}`;
	const HEADER =	{
		"Content-Type": "application/json; charset=UTF-8",
	};

	if (globalThis.navigator.onLine) {
		let data;

		await fetch(url, {
			method: "GET",
			headers: HEADER,
		}).then((estimate) => {
			data = estimate.json();
			return(data);
		}).then(setDBFetched);
		return(data);
	}
};


/**
 * @param {String} doc The reference/document with artwork list.
 */
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


/**
 * @function Gets the reference/document number from the page in order to search.
 */
export async function searchEstimate() {
	const docEstimate =	document.getElementById("estimate_getter").value;
	const update =		memoization(document.getElementById("input_estimate").value);

	if (!regexChecker(docEstimate)) {
		const data = [checkBrowserDB(docEstimate), fetchDB(docEstimate)];

		await Promise.any(data).then(async val => {
			!val[0] && val[1].length === 0 ?
				alert(`Document not found! Please, try again.`):
				await Promise.resolve(update(docEstimate))
				.then(async () => {
					if (val[1].length > 0) {
						const result = {
							reference: val[1][0].reference_id,
							crates: val[1][0].crates.crates,
							list: val[1][0].works.list
						};
						addNewWorksToIndexedDB(result, true);
					}
					else
						status.crate(true)
				});
		});
	};
};


/**
 * @function check if the fetch to doc/reference was successful and updates the app status.
 */
function memoization(before) {
	return async (after) => {
		before && before !== after ? status.cleanInputs(true) : false;
	};
}
