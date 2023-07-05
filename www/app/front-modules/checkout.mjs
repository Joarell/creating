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
import { openCloseDisplay } from '../plotter/layer.controller.mjs'


// ╭───────────────────────────────────────────────────────────────────╮
// │ Calls to each change on the localStorage to update the list pane. │
// ╰───────────────────────────────────────────────────────────────────╯
globalThis.onstorage = () => {
	mod.displayCub();
	mod.displayAirCub();
	mod.countWorks();
};

globalThis.onload = () => {
	const color = localStorage.getItem("mode");

	browserStoragePrepare();
	// localStorage.setItem("metrica", document.getElementById("cm").value);
	color === null ? localStorage.setItem("mode", "light") : false;
	setCheckRadio();
	setTimeout(loadingPage, 2500);
};


// ╭────────────────────────────────────────────────────────╮
// │ Defines the measure of the works selected by the user. │
// ╰────────────────────────────────────────────────────────╯
if (!localStorage.getItem("metrica")) {
	const metrica = document.getElementById("cm").value;
	localStorage.setItem("metrica", metrica);
}


export function setUnit() {
	const measure = localStorage.getItem("metrica");
	const check =	confirm(
		"Attention! You are going to change the measurement of the works."
	);

	if (!measure || measure === undefined) {
		localStorage.setItem("metrica",
			document.getElementById("cm").value
		);
		document.getElementById('cm').checked = true;
	}
	else if (check) {
		const storage = localStorage.getItem('metrica');

		storage === 'cm - centimeters' ?
			localStorage.setItem("metrica", "in - inches") :
			localStorage.setItem("metrica", "cm - centimeters");
		return;
	}
	setCheckRadio();
};


// ╭──────────────────────────────────────────────────────╮
// │ This is the trigger to the "crate" and clear button. │
// ╰──────────────────────────────────────────────────────╯
export const crate = () => {
	browserStoragePrepare();
	mod.crate();
	const element = document.querySelector(".result");

	element.ariaHidden === 'true' ? openCloseDisplay([element]) : false;
	setTimeout(() => globalThis.scroll({ top: 300, behavior: "smooth" }), 1000);
};


export const clearAll = () => {
	const clear = confirm("Do you really want to delete the whole list?");
	const mode = localStorage.getItem("mode");
	const unit = localStorage.getItem("metrica");
	const element = document.querySelector(".result");
	const plotter = document.getElementById('layers');
	const menu = document.querySelector(".plotter__menu");

	if (clear === true) {
		mod.countWorks() && mod.displayAirCub() && mod.displayCub();
		localStorage.clear();
		sessionStorage.clear();
		sessionStorage.setItem("clean", "eraser");
		localStorage.setItem("mode", mode);
		localStorage.setItem("metrica", unit);
		globalThis.document.getElementById("input_estimate").value = "";
		openCloseDisplay([element, plotter, menu]);
	}
	mod.cleanInputs();
};


function loadingPage() {
	const animation = document.querySelector(".loading");
	const pageApp = document.querySelector(".app");
	const footer = document.querySelector(".footer-content");

	animation.style.display = "none";
	animation.setAttribute("aria-hidden", true);
	pageApp.setAttribute("aria-hidden", false);
	footer.setAttribute("aria-hidden", false);
};


function browserStoragePrepare() {
	const ref = localStorage.getItem("refNumb");

	if (ref) {
		document.getElementById("input_estimate").value = ref;
		createDB();
	}
	return (mod.displayCub() && mod.displayAirCub() && mod.countWorks());
};


function setCheckRadio() {
	const measure = localStorage.getItem("metrica");
	const color = localStorage.getItem("mode");
	const body = document.body;

	switch (measure) {
		case 'cm - centimeters':
			document.getElementById('cm').checked = true;
			break;
		case 'in - inches':
			document.getElementById('in').checked = true;
			break;
	}
	switch (color) {
		case ('light' || null):
			document.getElementById('light-mode').checked = true;
			body.classList.remove("dark-mode");
			body.classList.toggle("light-mode");
			break;
		case 'dark':
			document.getElementById('dark-mode').checked = true;
			body.classList.remove("light-mode");
			body.classList.toggle("dark-mode");
			break;
	}
};
