//       ╭──────────────────────────────────────────────────────────────╮
//       │ ╭──────────────────────────────────────────────────────────╮ │
//       │ │   INFO: Here you are going to find the copy interface.   │ │
//       │ ╰──────────────────────────────────────────────────────────╯ │
//       ╰──────────────────────────────────────────────────────────────╯

import { findCrates, findCratesAndWorks } from "./clip.board.formatter.mjs";


globalThis.document.getElementById("copy-pane1")
	.addEventListener("click", () => {
	const crates =		new Worker('./panels/worker.IDB.crates.mjs');
	const estimate =	document.getElementById("input_estimate").value;
	const checker =		sessionStorage.getItem(estimate);
	
	if (!checker)
		return (
			alert(`Please, press the \"Crate\" button if already added works.`)
		);
	crates.postMessage(estimate);
	crates.onmessage = (test) => {
		return (
			Array.isArray(test.data.crates) ?
			findCrates(test.data): 
			false
		);
	};
});


globalThis.document.getElementById("copy-pane2")
	.addEventListener("click", () => {
	const crates =		new Worker('./panels/worker.IDB.crates.mjs');
	const estimate =	document.getElementById("input_estimate").value;
	const checker =		sessionStorage.getItem(estimate);
	
	if (!checker)
		return (
			alert(`Please, press the \"Crate\" button if already added works.`)
		);
	crates.postMessage(estimate);
	crates.onmessage = (test) => {
		return (
			Array.isArray(test.data.crates) ?
			findCratesAndWorks(test.data): 
			false
		);
	};
});
