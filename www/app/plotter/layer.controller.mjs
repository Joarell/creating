

import { plotter } from "./layers.mjs";
import { populateOptions } from "./select.menu.mjs";


export async function getCrates(doc) {
	const dataIDB =	new Worker('./panels/worker.IDB.crates.mjs');
	return(new Promise((resolve, reject) => {
			dataIDB.postMessage(doc);
			dataIDB.onmessage = (solvedList => {
				solvedList.data !== undefined ?
					resolve(solvedList.data):
					reject(alert(`
"${doc}" NOT found. Please, try again or press 'Crate' button!`
				));
			});
		})
	);
};


export function processStart(doc) {
	const display = document.getElementById('layers');

	display.appendChild(plotter(doc));
};


export async function renderDisplay() {
	const estimate =	document.getElementById("input_estimate").value;
	const display =		document.querySelector(".plotter");
	const menu =		document.querySelector(".plotter__menu");
	
	if(!estimate)
		return (
			alert(
			"Please, start an 'Doc', add works and press the 'Crate' button."
		)
	);
	const { crates } =	await getCrates(estimate);
	openCloseDisplay([display, menu]);
	if (display.ariaHidden) {
		processStart(crates);
		setTimeout(() => globalThis.scroll({
				top: 1000, behavior: "smooth"
			}), 1200);
		setTimeout(() => globalThis.scroll({
				top: 1000, behavior: "smooth"
			}), 2000);
			populateOptions(crates);
	};
};


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
