

import { plotter } from "./layers.mjs";
import { displayClean, populateOptions } from "./select.menu.mjs";


export function openCloseDisplay (element, template) {
	element.map(plotter => {
		if (plotter) {
			plotter.setAttribute("aria-hidden", false);
			plotter.setAttribute("aria-expanded", true);
		};
	})
};


function closeDisplay(element, display) {
	element.map(plotter => {
		console.log("Close element");
		plotter.setAttribute("aria-hidden", true);
		plotter.setAttribute("aria-expanded", false);
		while(display.firstChild)
			display.removeChild(display.firstChild);
	});
};


export async function openDisplay() {
	const RENDER =		document.getElementById("show-layer");
	const template =	document.getElementById("Render");
	const clone =		template.content.cloneNode(true);
	const estimate =	document.getElementById("input_estimate").value;
	const display =		clone.childNodes[1];
	const menu =		clone.childNodes[1].children[0].children[1];

	if(!estimate)
		return(alert("Please, add some works and press the 'Crate' button."));
	switch (RENDER.hasChildNodes()) {
		case false :
			RENDER.appendChild(clone);
			openCloseDisplay([display, menu]);
			break;
		default :
			closeDisplay([display, menu], RENDER);
	};
	if (display.ariaHidden === 'false') {
		await populateOptions();
		renderLayer();
		setTimeout(
			() => globalThis.scroll({ top: 1000, behavior: "smooth" }), 1000
		);
	};
};

// ╭─────────────────────────────────────────╮
// │ Functions to preparete rendering works. │
// ╰─────────────────────────────────────────╯
export function renderLayer() {
	const display =	document.getElementById('layers');
	const crate =	getCurrentCrate();
	const layer =	+sessionStorage.getItem('numLayer');

	display.appendChild(plotter(crate, layer - 1));
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
