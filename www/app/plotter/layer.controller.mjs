

import { processStart } from "./layers.mjs";

globalThis.document.getElementById("crate-layers")
	.addEventListener("click", () => {
	const estimate =	document.getElementById("input_estimate").value;
	const display =		document.querySelector(".plotter");
	const menu =		document.querySelector(".plotter__menu");
	
	if(!estimate)
		return (
			alert(
			"Please, start an 'Doc', add works and press the 'Crate' button."
		)
	);
	console.log(display.ariaHidden);
	openCloseDisplay([display, menu]);
	// openCloseDisplay([display]);
	if (display.ariaHidden) {
		processStart(estimate);
		setTimeout(() => globalThis.scroll({
				top: 1000, behavior: "smooth"
			}), 1200);
		setTimeout(() => globalThis.scroll({
				top: 1000, behavior: "smooth"
			}), 2000);
	}
});


function openCloseDisplay (element) {
	element.map(plotter => {
		if (plotter.ariaHidden) {
			plotter.setAttribute("aria-hidden", false);
			plotter.setAttribute("aria-expanded", true);
		}
		else {
			plotter.setAttribute("aria-hidden", true);
			plotter.setAttribute("aria-expanded", false);
		}
	})
};
