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


// ╭─────────────────────────────────────────────╮
// │ This function adds the new work and counts. │
// ╰─────────────────────────────────────────────╯
export function countWorks() {
	const result =		parseArtWork();
	let counter =		document.getElementById("count");

	counter.innerText =	result ? "Counting: " + result?.length : "Counting 0";
	return (counter);
}


// ╭─────────────────────────────────────────────────────────────────────╮
// │ This function do the calculation of the cub of all works in meters. │
// ╰─────────────────────────────────────────────────────────────────────╯
export function displayCub() {
	let result;
	const COMA =	1000;
	const element =	document.getElementById("cub-meter");

	result =		parseArtWork();
	result =		result?.reduce((sum, val) => {
		return (sum + val.cubed);
	}, 0) ?? 0;
	element.innerText = "Cub: " + ((result * COMA) / COMA).toFixed(3) + "m³";
	return (element);
}


// ╭──────────────────────────────────────────────────────────────────────────╮
// │ Returns a calculation of the cub of all works based on the air companies.│
// ╰──────────────────────────────────────────────────────────────────────────╯
export function displayAirCub() {
	let result;
	let element;
	let std_msg;
	const COMA =	1000;

	std_msg =		"Air-Cub: ";
	element =		document.getElementById("cub-air");
	result =		parseArtWork();
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
export async function crate() {
	let crates;
	let list;
	const estimate =	{};
	const e_code =		document.getElementById("input_estimate").value;

	if (confirm("Ready to crate all works?")) {
		crates =				await checkMetric();
		estimate["reference"] =	e_code;
		list =					parseArtWork();
		estimate["list"] =		list.map(art => art.data);
		estimate["crates"] =	crates;
		addNewWorksToIndexedDB (estimate);

		// INFO: Efemeral triggers to each panel render the result
		sessionStorage.setItem("pane1", "populate");
		sessionStorage.setItem("pane2", "populate");
	}
}


//╭───────────────────────────────────────────────────────────────────────────╮
//│ This function cleans all fields and puts the cursor in the code input box.│
//╰───────────────────────────────────────────────────────────────────────────╯
export function cleanInputs() {
	document.getElementById("input_code").value = "";
	document.getElementById("input_code").select();
	document.getElementById("input_length").value = "";
	document.getElementById("input_depth").value = "";
	document.getElementById("input_height").value = "";
}


// ╭──────────────────────────────────────────────────────╮
// │ Converts the localStorage data in to ArtWork object. │
// ╰──────────────────────────────────────────────────────╯
function parseArtWork() {
	const DB =		localStorage;
	const temp =	[];
	let works;
	const avoid =	[
		"doneList" ,"mode", "storage", "currency", "currency", "metrica", "refNumb" 
	]
	
	Object.entries(DB).map(data => {
		!avoid.includes(data[0]) ? temp.push(JSON.parse(data[1])) : false;
	});
	works = temp.map(work => {
		return(new ArtWork(work.code, work.x, work.z, work.y));
	})
	return(works.length > 0 ? works : undefined);
}


// ╭──────────────────────────────────────────────────────────────────────────────╮
// │ Checks the works is in inches and converts to centimeters and solve the list.│
// ╰──────────────────────────────────────────────────────────────────────────────╯
async function checkMetric() {
	const storageUnit =	localStorage.getItem('metrica');
	const UNIT =		storageUnit === 'cm - centimeters' ? 'cm' : 'in';
	const list =		parseArtWork();
	let crates;

	if (storageUnit.length === 1)
		return(alert("Oops! Sounds like you not added any work yet.\
		Please, try again!"));
	crates = await Promise.resolve(new UnitAdapter(list, UNIT));
	return (crates);
}
