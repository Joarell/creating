

import { plotter } from "./layers.mjs";
import { populateOptions } from "./select.menu.mjs";


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


export function openDisplay() {
	const estimate =	document.getElementById("input_estimate").value;
	const display =		document.querySelector(".plotter");
	const menu =		document.querySelector(".plotter__menu");
	
	if(!estimate)
		return (
			alert(
			"Please, start an 'Doc', add works and press the 'Crate' button."
		)
	);
	const { crates } =	JSON.parse(sessionStorage.getItem(estimate));
	openCloseDisplay([display, menu]);
	if (display.ariaHidden === 'false') {
		populateOptions(crates);
		renderLayer(1);
		setTimeout(() => globalThis.scroll({
			top: 1000, behavior: "smooth"
		}), 1000);
	};
};


export function renderLayer(num) {
	const estimate =	document.getElementById("input_estimate").value;
	const { crates } =	JSON.parse(sessionStorage.getItem(estimate));
	const display =		document.getElementById('layers');
	const crate =		getCurrentCrate(num, crates);

	display.appendChild(plotter(crate));
};


function getCurrentCrate(index, list) {
	let sizeXY;
	const limit =	findNextCrate(list);
	const content =	list.filter((target, info) => {
		if (info >= index && info < (limit - 1)) {
			sizeXY === undefined ? sizeXY = list[info - 2] : false;
			return(target);
		}
	}, 0);
	return ({ crate: content, size: sizeXY });
};


function findNextCrate (list) {
	let i;
	let next =		0;

	for (i in list) {
		if(list[i][0] === 'Crate')
			next = Number.parseInt(i);
	};
	return(next);
};


export function changeCrateDisplay() {
	const crateNum = document.getElementById('selected-crate').value;
	return(renderLayer(Number.parseInt(crateNum.split(' ')[1])));
};
