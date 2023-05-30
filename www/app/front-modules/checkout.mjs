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
globalThis.onstorage = () => {
	return (
		mod.displayCub() &&
		mod.displayAirCub() &&
		mod.countWorks()
	);
}

globalThis.document.getElementById("input_estimate")
	.addEventListener("change", () => {
		createDB();
});

globalThis.onload = () => {
	setCheckRadio();
	browserStoragePrepare();
	localStorage.setItem("metrica", document.getElementById("cm").value);
};

// ╭────────────────────────────────────────────────────────╮
// │ Defines the measure of the works selected by the user. │
// ╰────────────────────────────────────────────────────────╯
if (!localStorage.getItem("metrica")) {
	const metrica = document.getElementById("cm").value;
	localStorage.setItem("metrica", metrica);
}
document.getElementById("unit-seg").addEventListener("change", () => {
	const measure = localStorage.getItem("metrica");

	if (!measure || measure === undefined) {
		localStorage.setItem("metrica",
			document.getElementById("cm").value
		);
		document.getElementById('cm').checked = true;
	}
	else if ( confirm(
			"Attention! You are going to change the measurement of the works."
		)){;
		const storage = localStorage.getItem('metrica');
		
		storage === 'cm - centimeters' ? 
		localStorage.setItem("metrica", "in - inches") :
		localStorage.setItem("metrica", "cm - centimeters");
		return ;
	}
	setCheckRadio();
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

	if (del === true) {
		mod.countWorks();
		mod.displayAirCub();
		mod.displayCub();
		localStorage.clear();
		sessionStorage.clear();
		globalThis.location.reload();
	}
	mod.cleanInputs();
}


function browserStoragePrepare() {
	const ref = localStorage.getItem("refNumb");

	if (ref) {
		document.getElementById("input_estimate").value = ref;
		createDB();
	}
	return (mod.displayCub() && mod.displayAirCub() && mod.countWorks());
}


function setCheckRadio() {
	const measure = localStorage.getItem("metrica");

	switch (measure) {
		case 'cm - centimeters':
			document.getElementById('cm').checked = true;
			break;
		case 'in - inches':
			document.getElementById('in').checked = true;
			break;
	}
}
