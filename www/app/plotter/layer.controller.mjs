

import { plotter } from "./layers.mjs";
import { displayClean, populateOptions } from "./select.menu.mjs";


export function openCloseDisplay (element) {
	element.map(plotter => {
		if (plotter.ariaHidden === 'true') {
			plotter.setAttribute("aria-hidden", false);
			plotter.setAttribute("aria-expanded", true);
		}
		else {
			plotter.setAttribute("aria-hidden", true);
			plotter.setAttribute("aria-expanded", false);
		}
	})
};


export async function openDisplay() {
	const estimate =	document.getElementById("input_estimate").value;
	const display =		document.querySelector(".plotter");
	const menu =		document.querySelector(".plotter__menu");
	
	if(!estimate)
		return(alert("Please, start an 'Doc', add works and press the 'Crate' button."));
	openCloseDisplay([display, menu]);
	if (display.ariaHidden === 'false') {
		await populateOptions();
		renderLayer();
		setTimeout(() => globalThis.scroll({ top: 1000, behavior: "smooth" }), 1000);
	};
};

// ╭─────────────────────────────────────────╮
// │ Functions to preparete rendering works. │
// ╰─────────────────────────────────────────╯
export function renderLayer() {
	const display =	document.getElementById('layers');
	const crate =	getCurrentCrate();
	const layer =	+sessionStorage.getItem('numLayer');

	display.appendChild(plotter(crate, layer));
};


function getCurrentCrate() {
	const crates =	JSON.parse(localStorage.getItem('doneList'));
	let crateNum =	document.getElementById('selected-crate').value.split(' ')[1];
	let key
	let works;
	let data;

	for (key in crates) {
		if (crates[key]?.hasOwnProperty('crates')) {
			crates[key].crates.map((crate, i) => {
				if (Array.isArray(crate) && --crateNum === 0) {
					works = crates[key].crates[i + 1];
					data = { type : key, crate : crate, works : works };
				}
			}, 0);
		};
	};
	return (data);
};


// ╭──────────────────────────────────────────────────────────╮
// │          Change the works on the current layer.          │
// ╰──────────────────────────────────────────────────────────╯
export function changeCrateDisplay() {
	const crateNum = document.getElementById('selected-crate').value;
	displayClean();
	return(renderLayer(+crateNum.split(' ')[1]));
};
