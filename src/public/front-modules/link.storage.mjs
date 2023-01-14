// ╭───────────────────────────────╮
// │ Creates the browser database. │
// ╰───────────────────────────────╯
export function createDB() {
	const dataName = "Estimates";
	const list = document.getElementById("input_estimate").value;
	let request = globalThis.indexedDB.open(dataName);
	const version = request.result.version;

	console.log(version);
	if(version)
		request = indexedDB.open(dataName, version + 1);
	request.onerror = (event) => {
		alert(`ATTENTION: ${event.target.errorCode}`);
	}
	request.onupgradeneeded = (event) => {
		const db = event.target.result;
		let object;
	
		if (!db.objectStoreNames.contains(list)){
			object = db.createObjectStore(list, {keyPath: "reference"});
			object.createIndex( "reference", "reference", { unique: true });
		}
		alert('Done');
	}
}


// ╭─────────────────────────────────╮
// │ Adds new works to the database. │
// ╰─────────────────────────────────╯
export function addNewWork(works, version) {
	const dataName = "Estimates";
	const list = document.getElementById("input_estimate").value;
	const request = globalThis.indexedDB.open(dataName, version + 1); // TODO: take the version with: request.result.version
	alert(`Version: ${version}`);

	request.onerror = (event) => {
		alert(`ERROR: ${event.target.errorCode}`);
	}
	request.onupgradeneeded = (event) => {
		alert("Go on...");
		const db = event.target.result;
		const artWork = db.transaction(list, "readwrite");
		let objectStore;

		artWork.onerror = (error) => {
			error.stopPropagation();
			alert(`ATTENTION: ${error.target.errorCode}`);
			error.abort();
		};
		artWork.oncomplete = () =>{
			alert('Upgraded!');
		}
		objectStore = artWork.objectStore(list);
		objectStore.add(works);

		alert("Finished!");
		request.result.close();
		alert("DB was closed");
		// console.log(request.result.version);
	}
}


// TODO: test
// ╭───────────────────────────────────╮
// │ Delets the estimate on indexedDB. │
// ╰───────────────────────────────────╯
export function deleteData(reference) {
	const request = globalThis.indexedDB.open("Estimates");

	request.onerror = (event) => {
		alert(`ATTENTION: ${event.target.errorCode}`);
	}
	request.onupgradeneeded = (event) => {
		const db = event.target.result;
		const deleted = db.transaction(reference, "readwrite")
		.objectStore("Estimates").delete(reference);

		deleted.onsuccess = () =>{
			alert(`The ${reference} was success deleted!`);
		};
		deleted.onerror = (error) => {
			alert(`ATTENTION: ${error.target.errorCode}`);
		};
		request.result.close();
	}
}


// TODO: test
// ╭────────────────────────────────────╮
// │ Returns the estimate on indexedDB. │
// ╰────────────────────────────────────╯
export function gettinData(reference){
	const request = globalThis.indexedDB.open("Estimate");

	request.onerror = (event) => {
		alert(`ATTETNTION: ${event.target.errorCode}`);
	};
	request.onsuccess = (event) => {
		const db = event.target.result;
		const transaction = db.transaction(reference, "readonly");

		transaction.onerror = (error) => {
			alert(`ATTENTION: ${error.target.erroCode}`);
		};
		transaction.onsuccess = () => {
			const objectstore = transaction.get(reference)

			objectstore.onerror = (error) => {
				alert(`ATTENTION: ${error.target.erroCode}`);
			}
			objectstore.onsuccess = () => {
				alert(`There you have it: ${objectstore}`);
			}
		};
		request.result.close();
	};
}
