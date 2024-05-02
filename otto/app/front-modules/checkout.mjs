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
import { createIDB, createOffLineIDB } from './link.storage.mjs';
import { openCloseDisplay } from '../plotter/layer.controller.mjs'
// import { checkTokens } from './token.checkout.mjs';


globalThis.onload = () => {
	const color = localStorage.getItem("mode");

	browserStoragePrepare();
	color === null ? localStorage.setItem("mode", "light") : false;
	setCheckRadio();
	setModeColor();
	setTimeout(loadingPage, 1500);
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
		// INFO: This is the trigger to the "create" and clear button.
	}
	else if (check) {
		const storage = localStorage.getItem('metrica');

		storage === 'cm - centimeters' ?
			localStorage.setItem("metrica", "in - inches") :
			localStorage.setItem("metrica", "cm - centimeters");
		sessionStorage.setItem('clean', 'reload');
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

	if (sessionStorage.getItem('codes')) {
		element.ariaHidden === 'true' ? openCloseDisplay([element]) : false;
		setTimeout(
			() => globalThis.scroll({ top: 300, behavior: "smooth" }), 1000
		);
	};
};


export const clearAll = () => {
	const mode = localStorage.getItem("mode");
	const unit = localStorage.getItem("metrica");
	const element = document.querySelector(".result");
	const plotter = document.getElementById('layers');
	const menu = document.querySelector(".plotter__menu");

	if (confirm("Do you really want to delete the whole list?")) {
		mod.cleanInputs();
		localStorage.clear();
		sessionStorage.clear();
		sessionStorage.setItem("clean", "eraser");
		localStorage.setItem("mode", mode);
		localStorage.setItem("metrica", unit);
		globalThis.document.getElementById("input_estimate").value = "";
		openCloseDisplay([element, plotter, menu]);
	}
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

	if (ref)
		document.getElementById("input_estimate").value = ref;
	createIDB();
	createOffLineIDB();
	return (mod.displayCub() && mod.displayAirCub() && mod.countWorks());
};


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
};


function setModeColor() {
	const color = localStorage.getItem("mode");
	const body = document.body;

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
}
