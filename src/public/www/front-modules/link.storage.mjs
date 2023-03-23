// ╭────────────────────────────────────────────────────╮
// │ ╭────────────────────────────────────────────────╮ │
// │ │ INFO: These are functions to handle indexedDB: │ │
// │ │                  createDB();                   │ │
// │ │                 addNewWorks();                 │ │
// │ │                 deleteData();                  │ │
// │ │          movingDataToSesseionStorage();        │ │
// │ ╰────────────────────────────────────────────────╯ │
// ╰────────────────────────────────────────────────────╯

import { saveTheCurrentEstimate } from "../API/bridge.link.web.db.mjs";


export function createDB() {
	const dataName = "Results";
	const request = globalThis.indexedDB.open(dataName);

	request.onerror = (event) => {
		alert(`ATTENTION! ${event.target.errorCode}`);
	};
	request.onupgradeneeded = (event) => {
		const db = event.target.result;
		let object;
	
		object = db.createObjectStore(dataName, {keyPath: "reference"});
		object.createIndex( "reference", "reference", { unique: true });
		console.log('Done!');
	};
}


export function addNewWorksToIndexedDB (works) {
	const dataName = "Results";
	const list = document.getElementById("input_estimate").value;
	const request = globalThis.indexedDB.open(dataName);

	request.onerror = (event) => {
		alert(`ERROR: ${event.target.errorCode}`);
	}
	request.onsuccess = async (event) => {
		const db = event.target.result;
		const object = db.transaction("Results", "readwrite")
			.objectStore("Results");
	
		object.add(works);
		movingDataToSesseionStorage(list);
	}
}


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
}


// TODO: refectory this function to use the worker script
export async function movingDataToSesseionStorage(reference) {
	const request = globalThis.indexedDB.open("Results");

	request.onerror = (event) => {
		alert(`WARNING: ${event.target.errorCode}`);
	};
	request.onsuccess = () => {
		const db = request
			.result
			.transaction("Results")
			.objectStore("Results").get(reference);
		
		db.onsuccess = () => {
			const reference = document.getElementById("input_estimate").value;
			const obj = db.result;

			globalThis.sessionStorage.setItem(reference, JSON.stringify(obj));
			saveTheCurrentEstimate(reference);
		};
	};
}

const worker = new Worker('./front-modules/worker.storage.mjs');
worker.postMessage("PID-1290");
worker.onmessage = (res) => {
	const result = JSON.stringify(res.data);
	console.log(res.data.reference);
	console.log(`It's working: ${result}`);
};
