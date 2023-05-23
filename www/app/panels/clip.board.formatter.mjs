


export function findCratesAndWorks (target) {
	const { crates } = target;
	let allCrates;

	crates ?
		allCrates = crates.filter(crate => {
			return (
				["Final"].includes(crate[0]) || crates.length === 5 ?
				crate: false
			);
		}):
		false;
	return(formatterClipBoard(allCrates));
};


export function findCrates (target) {
	const { crates } = target;
	let allCrates;

	crates ?
		allCrates = crates.filter(crate => {
			return (["Final"].includes(crate[0]) ? crate: false);
		}):
		false;
	return(formatterClipBoard(allCrates));
};


function formatterClipBoard(crates) {
	if(!crates)
		return("There is no crates. Please, try again!");
	const formatted =	crates.map(info => {
		let line;
		const unit =	localStorage.getItem("metrica");

		line = `${info[0]} - ${info[1]} x ${info[2]} x ${info[3]} - ${unit}`;
		return(line);
	});
	const getString =		JSON.stringify(formatted);
	const copyFinished =	characterRemover(getString, formatted.length);
	navigator.clipboard.writeText(copyFinished);
}


function characterRemover(target, len) {
	let result = target;

	while(len--) {
		result = result.replace('"','');
		result = result.replace('"','');
		result = result.replace(',','\n');
	}
	result = result.replace('[','');
	result = result.replace(']','');
	return(result);
};


globalThis.document.getElementById("copy-pane1")
	.addEventListener("click", async () => {
	const crates =		new Worker('./panels/worker.IDB.crates.mjs');
	const estimate =	document.getElementById("input_estimate").value;
	const checker =		sessionStorage.getItem(estimate);
	
	if (!checker)
		return (
			alert(`Please, press the \"Crate\" button if already added works.`)
		);
	crates.postMessage(estimate);
	crates.onmessage = (test) => {
		console.log(test.data);
		return (
			Array.isArray(test.data.crates) ?
			findCrates(test.data): 
			false
		);
	};
});


globalThis.document.getElementById("copy-pane2")
	.addEventListener("click", async () => {
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
