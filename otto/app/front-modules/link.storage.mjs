// ╭────────────────────────────────────────────────────╮
// │ ╭────────────────────────────────────────────────╮ │
// │ │ INFO: These are functions to handle indexedDB: │ │
// │ │                  createIDB();                  │ │
// │ │              createOffLineIDB();               │ │
// │ │                 addNewWorks();                 │ │
// │ │                 deleteData();                  │ │
// │ │          movingDataToSesseionStorage();        │ │
// │ ╰────────────────────────────────────────────────╯ │
// ╰────────────────────────────────────────────────────╯

import { saveTheCurrentEstimate, upDateCrateSizes } from "./bridge.link.web.db.mjs";


/**
 * @function Creates a new indexedDB table in the browser for all results.
*/
export function createIDB() {
	const dataName =	"Results";
	const request =		globalThis.indexedDB.open(dataName);

	request.onerror = (event) => {
		alert(`ATTENTION! ${event.target.errorCode}`);
	};
	request.onupgradeneeded = (event) => {
		const db = event.target.result;
		let object;

		object = db.createObjectStore(dataName, {keyPath: "reference"});
		object.createIndex( "reference", "reference", { unique: true });
	};
};


/**
 * @function Creates a new indexedDB table in the browser for all off-line results.
*/
export function createOffLineIDB() {
	const dataName =	"off_line_results";
	const request =		globalThis.indexedDB.open(dataName);

	request.onerror = (event) => {
		alert(`ATTENTION! ${event.target.errorCode}`);
	};
	request.onupgradeneeded = (event) => {
		const db = event.target.result;
		let object;

		object = db.createObjectStore(dataName, { keyPath: "reference" });
		object.createIndex( "reference", "reference", { unique: true });
	};
};


/**
 * @param {Crater} works The list to add in indexed DB when the page is off-line.
*/
export function addNewWorksToIndexedDBOffLine (works, fetched) {
	const dataName =	"off_line_results";
	const list =		document.getElementById("input_estimate").value;
	const request =		globalThis.indexedDB.open(dataName);

	request.onerror = (event) => {
		alert(`ERROR: ${event.target.errorCode}`);
	}
	request.onsuccess = async (event) => {
		const db =			event.target.result;
		const object =		db.transaction(dataName, "readwrite")
			.objectStore(dataName);
		const existsInIDB =	object.get(works.reference);

		existsInIDB.onsuccess = () => {
			existsInIDB.result === undefined ? object.add(works):
			(object.delete(existsInIDB.result.reference)) &&
			(object.add(works));
			movingDataToSesseionStorage(list, fetched);
		};
	}
};


/**
 * @param {Crater} works The list to add in indexedDB when all crates is done.
*/
export function addNewWorksToIndexedDB (works, fetched = false) {
	const reference =	localStorage.getItem('refNumb');
	const dataName =	"Results";
	const request =		globalThis.indexedDB.open(dataName);
	const onLine =		globalThis.navigator.onLine;

	request.onerror = (event) => {
		alert(`ERROR: ${event.target.errorCode}`);
	}
	request.onsuccess = async (event) => {
		const db =			event.target.result;
		const object =		db.transaction(dataName, "readwrite")
			.objectStore(dataName);
		const existsInIDB =	object.get(works.reference);

		existsInIDB.onsuccess = async () => {
			existsInIDB.result === undefined ? object.add(works):
			await Promise.resolve(object.delete(existsInIDB.result.reference))
				.then(object.add(works));
			movingDataToSesseionStorage(reference, fetched);
		};
		onLine ? 'ok' : addNewWorksToIndexedDBOffLine(works);
	}
};


/**
 * @param {String} reference The code/reference to delete from indexedDB.
*/
export function deleteDataFromIndexedDB(reference) {
	const request = globalThis.indexedDB.open("Results");

	request.onerror = (event) => {
		alert(`OPS!: ${event.target.errorCode}`);
	}
	request.onsuccess = (event) => {
		const db = event.target.result;
		db.transaction("Results", "readwrite")
			.objectStore("Results").delete(reference);
	}
};


/**
 * @param {String} reference The code/reference to the crates process.
*/
export async function movingDataToSesseionStorage(reference, fetched = false) {
	const request = globalThis.indexedDB.open("Results");

	request.onerror = (event) => {
		alert(`WARNING: ${event.target.errorCode}`);
	};
	request.onsuccess = () => {
		const db = request
			.result
			.transaction("Results")
			.objectStore("Results").get(reference);

		db.onsuccess = async () => {
			const reference = localStorage.getItem('refNumb');
			const obj = db.result;

			globalThis.sessionStorage.setItem(reference, JSON.stringify(obj));
			fetched === false ? await saveTheCurrentEstimate(db.result) :
				sessionStorage.setItem('pane1', "populate");
			fetched === 'crate' ? await upDateCrateSizes(db.result): 0;
		};
	};
};
