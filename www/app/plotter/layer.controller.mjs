

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
	const layer =		Number.parseInt(sessionStorage.getItem('numLayer'));

	display.appendChild(plotter(crate, layer));
};


function getCurrentCrate(index, list) {
	let sizeXY;
	let counter =		0;
	const limitIndex =	findNextCrate(list, index);
	const content =	list.filter((target, info) => {
		if (counter === index && info < limitIndex) {
			(sizeXY === undefined) && (info < (limitIndex - 1)) ?
				sizeXY = list[info - 2]:
				false;
			return(target);
		}
		(counter < index) && (target[0] === 'Crate') ? counter++ : false;
	}, 0);
	return ({ crate: content, size: sizeXY });
};


function findNextCrate (list, index) {
	let i;
	let count = 0;
	let next;

	for (i in list) {
		if((list[i][0] === 'Crate' || list[i].length === 4) && count === index){
			count++;
			next = Number.parseInt(i);
		}
		(list[i][0] === 'Crate') || (list[i].length === 4) ? count++ : false;
	};
	return(next);
};


// ╭──────────────────────────────────────────────────────────╮
// │          Change the works on the current layer.          │
// ╰──────────────────────────────────────────────────────────╯
export function changeCrateDisplay() {
	const crateNum = document.getElementById('selected-crate').value;
	displayClean();
	return(renderLayer(Number.parseInt(crateNum.split(' ')[1])));
};
