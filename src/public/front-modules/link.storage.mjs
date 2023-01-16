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
	// const list = document.getElementById("input_estimate").value;
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
		let object;
	
		object = db.transaction("Results", "readwrite").objectStore("Results");
		object.put(works);
		gettinData(list);
		return(globalThis.location.reload());
	}
}


// ╭───────────────────────────────────╮
// │ Delets the estimate on indexedDB. │
// ╰───────────────────────────────────╯
export function deleteData(reference) {
	const request = globalThis.indexedDB.open("Results");

	request.onerror = (event) => {
		alert(`ATTENTION: ${event.target.errorCode}`);
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
export function gettinData(reference){
	const request = globalThis.indexedDB.open("Results");

	request.onerror = (event) => {
		alert(`ATTETNTION: ${event.target.errorCode}`);
	};
	request.onsuccess = (event) => {
		const db = event.target.result;
		const data = db.transaction("Results", "readonly");
		const info = data.objectStore("Results").get(reference);
		
		return(info.result);
	};
}
