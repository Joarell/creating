// ╭───────────────────────────────╮
// │ Creates the browser database. │
// ╰───────────────────────────────╯
export function createDB() {
	const dataName = "Estimates";
	const list = document.getElementById("input_estimate").value;
	let request = indexedDB.open(dataName);
	const version = request.result.version;

	console.log(version);
	if(version)
		request = indexedDB.open(dataName, version + 1);
	request.onerror = (event) => {
		alert(`ATTENTION: ${event.error}`);
	}
	request.onsuccess = (event) => {
		const db = event.target.result;
		let object;
	
		if (!db.objectStoreNames.contains(list)){
			object = db.createObjectStore(list, {keyPath: "reference"});
			object.createIndex(
				"reference",
				"reference",
				{ unique: true }
			);
		}
		alert('Done');
	}
}


// ╭─────────────────────────────────╮
// │ Adds new works to the database. │
// ╰─────────────────────────────────╯
export function addNewWork(work, version) {
	const dataName = "Estimates";
	const list = document.getElementById("input_estimate").value;
	const request = indexedDB.open(dataName, version + 1); //take the version with: request.result.version
	alert(`Version: ${version}`);

	request.onerror = (event) => {
		alert(`ERROR: ${event.error}`);
		createDB();
	}
	request.onsuccess = (event) => {
		alert("Go on...");
		const db = event.target.result;
		const artWork = db.transaction(list, "readwrite");
		let objectStore;

		artWork.oncomplete = () =>{
			alert('Upgraded!');
		}
		objectStore = artWork.objectStore(list);
		objectStore.add(work);

		alert("Finished!");
		// request.result.close();
		// alert("DB was closed");
		// console.log(request.result.version);
	}
}
