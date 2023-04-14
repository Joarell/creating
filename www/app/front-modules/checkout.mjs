// ╭───────────────────────────────────────────────────────────────────────╮
// │ ╭───────────────────────────────────────────────────────────────────╮ │
// │ │ INFO: Here is some functions to work when the page is loaded, and │ │
// │ │          expose another ones to be available to the DOM:          │ │
// │ │                     browserStoragePrepare();                      │ │
// │ │                             crate();                              │ │
// │ │                            clearAll();                            │ │
// │ ╰───────────────────────────────────────────────────────────────────╯ │
// ╰───────────────────────────────────────────────────────────────────────╯

import * as mod from './functions.front.end.mjs'
import { createDB } from './link.storage.mjs';


// ╭───────────────────────────────────────────────────────────────────╮
// │ Calls to each change on the localStorage to update the list pane. │
// ╰───────────────────────────────────────────────────────────────────╯
globalThis.onload = () => {
	browserStoragePrepare();
};


globalThis.onstorage = () => {
	return (mod.displayCub() && mod.displayAirCub() && mod.countWorks());
}


function browserStoragePrepare() {
	const ref = localStorage.getItem("refNumb");
	
	if (ref) {
		document.getElementById("input_estimate").value = localStorage
			.getItem("refNumb");
		createDB();
	}
	return (mod.displayCub() && mod.displayAirCub() && mod.countWorks());
}

globalThis.onstorage = () => {
	return (mod.displayCub() && mod.displayAirCub() && mod.countWorks());
}


// ╭────────────────────────────────────────────────────────╮
// │ Defines the measure of the works selected by the user. │
// ╰────────────────────────────────────────────────────────╯
if (!localStorage.getItem("metrica"))
	localStorage.setItem( "metrica", document.getElementById("metrica").value);
globalThis.document.getElementById("metrica").addEventListener("change", () => {
	if (!localStorage.getItem("metrica")){
		localStorage.setItem("metrica",
			document.getElementById("metrica").value
		);
	}
	else {
		confirm(
			"Attention! You are going to change the measurement of the works."
		);
		localStorage.setItem(
			"metrica",
			document.getElementById("metrica").value
		);
	}
}, false);


// ╭──────────────────────────────────────────────────────╮
// │ This is the trigger to the "crate" and clear button. │
// ╰──────────────────────────────────────────────────────╯
export const crate = () => {
	browserStoragePrepare();
	mod.crate();
}

export const clearAll = () => {
	const del = confirm("Do you really want to delete the whole list?");

	if (del === true){
		mod.countWorks();
		mod.displayAirCub();
		mod.displayCub();
		localStorage.clear();
	}
	mod.cleanInputs();
}
