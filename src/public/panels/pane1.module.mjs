// import { createHeader } from "../front-modules/elements.mjs";


// ╭──────────────────────────────────────────────────╮
// │ This is the trigger actived by the crate button. │
// ╰──────────────────────────────────────────────────╯
globalThis.onstorage = () => {
	const press = sessionStorage.getItem("crate");
	const getter = sessionStorage.getItem("reference");

	if(press){
		sessionStorage.removeItem("crate");
		showCrates(getter);
	}
}


// ╭───────────────────────────────────────────────────────────╮
// │ Returns all crates from the indexedDB or gets from cloud. │
// ╰───────────────────────────────────────────────────────────╯
export function showCrates(estimate){
	const request = globalThis.indexedDB.open("Results");
	let db;
	let req;
	const pane = document.getElementById("crates-opened");


	createHeader(pane);
	request.onerror = (event) => {
		alert(`WARNING: ${event.target.errorCode}`);
	};
	db = request.result.transaction("Results").objectStore("Results");
	req = db.get(estimate);
	return(globalThis.location.reload());
}
