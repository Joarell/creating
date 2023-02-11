// ╭────────────────────────────────────────────────────╮
// │ ╭────────────────────────────────────────────────╮ │
// │ │ INFO: These are functions to handle indexedDB: │ │
// │ │                  createDB();                   │ │
// │ │                 addNewWorks();                 │ │
// │ │                 deleteData();                  │ │
// │ │                 gettinData();                  │ │
// │ ╰────────────────────────────────────────────────╯ │
// ╰────────────────────────────────────────────────────╯


// ╭───────────────────────────────╮
// │ Creates the browser database. │
// ╰───────────────────────────────╯
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


// ╭─────────────────────────────────╮
// │ Adds new works to the database. │
// ╰─────────────────────────────────╯
export function addNewWorks(works) {
	const dataName = "Results";
	const list = document.getElementById("input_estimate").value;
	const request = globalThis.indexedDB.open(dataName);

	request.onerror = (event) => {
		alert(`ERROR: ${event.target.errorCode}`);
	}
	request.onsuccess = (event) => {
		const db = event.target.result;
		const object = db.transaction("Results", "readwrite")
			.objectStore("Results");
	
		object.add(works);
		gettingData(list);
	}
}


// ╭───────────────────────────────────╮
// │ Delets the estimate on indexedDB. │
// ╰───────────────────────────────────╯
export function deleteData(reference) {
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


// ╭────────────────────────────────────╮
// │ Returns the estimate on indexedDB. │
// ╰────────────────────────────────────╯
export async function gettingData(reference) {
	let obj;
	let db;
	const request = globalThis.indexedDB.open("Results");

	request.onerror = (event) => {
		alert(`WARNING: ${event.target.errorCode}`);
	};
	request.onsuccess = () => {
		db = request
			.result
			.transaction("Results")
			.objectStore("Results").get(reference);
		
		return (db.onsuccess = () => {
			obj = db.result;
			// const {list} = obj;
			// const {reference} = obj;
			// const {crates} = obj;

			console.log(JSON.stringify(obj));
			console.table(obj);
		});
	};
}
// await gettingData("PED-2022");
