// ╭──────────────────────────────────────────────────────────────────────────╮
// │ ╭──────────────────────────────────────────────────────────────────────╮ │
// │ │ INFO:            These are the second layer of the app:              │ │
// │ │                        function displayAirCub();                     │ │
// │ │                            function crate();                         │ │
// │ │                         function cleanInputs();                      │ │
// │ │                         function parseArtWork();                     │ │
// │ ╰──────────────────────────────────────────────────────────────────────╯ │
// ╰──────────────────────────────────────────────────────────────────────────╯

import ArtWork from "../core2/ArtWork.class.mjs";
import UnitAdapter from "../core2/Unit.Adapter.class.mjs";
import { addNewWorksToIndexedDB } from "./link.storage.mjs";


// ╭───────────────────────────────────────────────────────────────────╮
// │ Calls to each change on the localStorage to update the list pane. │
// ╰───────────────────────────────────────────────────────────────────╯
globalThis.onstorage = () => {
	displayCub();
	displayAirCub();
	countWorks();
};


// ╭─────────────────────────────────────────────╮
// │ This function adds the new work and counts. │
// ╰─────────────────────────────────────────────╯
export async function countWorks() {
	const result =	await parseArtWork();
	let counter =	document.getElementById("count");

	counter.innerText =	result ? "Counting: " + result?.length : "Counting 0";
	return (counter);
}


// ╭─────────────────────────────────────────────────────────────────────╮
// │ This function do the calculation of the cub of all works in meters. │
// ╰─────────────────────────────────────────────────────────────────────╯
export async function displayCub() {
	let result;
	const COMA =	1000;
	const element =	document.getElementById("cub-meter");

	result =		await parseArtWork();
	result =		result?.reduce((sum, val) => {
		return (sum + val.cubed);
	}, 0) ?? 0;
	element.innerText = "Cub: " + ((result * COMA) / COMA).toFixed(3) + "m³";
	return (element);
}


// ╭──────────────────────────────────────────────────────────────────────────╮
// │ Returns a calculation of the cub of all works based on the air companies.│
// ╰──────────────────────────────────────────────────────────────────────────╯
export async function displayAirCub() {
	let result;
	let element;
	let std_msg;
	const COMA = 1000;

	std_msg =		"Air-Cub: ";
	element =		document.getElementById("cub-air");
	result =		await parseArtWork();
	result =		result?.reduce((sum, val) => {
		return (sum + val.cAir);
	}, 0) ?? 0;
	element.innerText = std_msg + ((result * COMA) / COMA).toFixed(3);
	return (element);
}


// ╭──────────────────────────────────────────────────────────────────────────╮
// │ This function is the main function of the webapp. It solves the art work │
// │                         list to possible crates.                         │
// ╰──────────────────────────────────────────────────────────────────────────╯
export async function crate(fetched = false) {
	const cratesAsCm = await checkMetric();
	const estimate =	{};
	const padding =		document.createElement('padding-dialog');
	const weak =		new WeakSet();
	const fragment =	new DocumentFragment();
	const e_code =		localStorage.getItem('refNumb') ??
		document.getElementById('input_estimate').value;
	let list;

	if (fetched || confirm("Ready to crate all works?") && cratesAsCm) {
		estimate.reference =	e_code;
		list =					await parseArtWork();
		estimate.list =			list.map(art => art.data);
		estimate.crates =		cratesAsCm;
		addNewWorksToIndexedDB(estimate, fetched);

		// INFO: triggers to each panel render the result
		sessionStorage.setItem("pane1", "populate");
		setTimeout(() => {
			const closeDialog =	document.querySelector('.side-menu');

			closeDialog?.getElementsByTagName('padding-dialog')?.length > 0 ?
				sessionStorage.setItem('CLOSED', 'NOW') : false;
			fragment.appendChild(padding);
			document.querySelector(".side-menu").appendChild(fragment);
		}, 150);
	}
	weak.add(estimate);
	return ('Crated');
};


//╭───────────────────────────────────────────────────────────────────────────╮
//│ This function cleans all fields and puts the cursor in the code input box.│
//╰───────────────────────────────────────────────────────────────────────────╯
export async function cleanInputs(fetched = false) {
	document.getElementById("input_code").value =	"";
	document.getElementById("input_length").value =	"";
	document.getElementById("input_depth").value =	"";
	document.getElementById("input_height").value =	"";
	const dialog = document.querySelectorAll('padding-dialog').length;

	fetched ? await Promise.resolve(sessionStorage.setItem('pane1', 'clear'))
		.then(document.getElementById("input_code").select()):
		await Promise.resolve(sessionStorage.setItem('clean', 'eraser'))
		.then(document.getElementById("input_estimate").select());
	countWorks();
	displayCub();
	displayAirCub();
	dialog > 0 ? sessionStorage.setItem("CLOSED", "NOW") : false;
};


// ╭──────────────────────────────────────────────────────╮
// │ Converts the localStorage data in to ArtWork object. │
// ╰──────────────────────────────────────────────────────╯
async function parseArtWork() {
	const DB =		localStorage;
	const temp =	[];
	let works;
	const avoid =	[
		"doneList",
		"mode",
		"storage",
		"currency",
		"currency",
		"metrica",
		"refNumb",
		"offResults",
		"FETCHED",
	]

	Object.entries(DB).map(data => {
		!avoid.includes(data[0]) ? temp.push(JSON.parse(data[1])) : false;
	});
	if (temp.length > 0)
		works = temp.map(work => {
			return(new ArtWork(work.code, work.x, work.z, work.y));
		});
	return(works ? works : undefined);
};


// ╭──────────────────────────────────────────────────────────────────────────────╮
// │ Checks the works is in inches and converts to centimeters and solve the list.│
// ╰──────────────────────────────────────────────────────────────────────────────╯
async function checkMetric() {
	const storageUnit =	localStorage.getItem('metrica');
	const UNIT =		storageUnit === 'cm - centimeters' ? 'cm' : 'in';
	const list =		await parseArtWork();
	let crates;

	if (!list)
		return(alert("Oops! Sounds like you do not added any work yet. Please, try again!"));
	crates = await Promise.resolve(new UnitAdapter(list, UNIT));
	return (crates);
};
