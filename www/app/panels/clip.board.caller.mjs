// ╭──────────────────────────────────────────────────────────────╮
// │ ╭──────────────────────────────────────────────────────────╮ │
// │ │   INFO: Here you are going to find the copy interface.   │ │
// │ ╰──────────────────────────────────────────────────────────╯ │
// ╰──────────────────────────────────────────────────────────────╯

import { findCrates, findCratesAndWorks } from "./clip.board.formatter.mjs";


export function copyButton1 () {
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
};


export function copyButton2 () {
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
};
