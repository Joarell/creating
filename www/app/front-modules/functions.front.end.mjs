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


// ╭─────────────────────────────────────────────────────────────────────╮
// │ This function do the calculation of the cub of all works in meters. │
// ╰─────────────────────────────────────────────────────────────────────╯
export function displayCub() {
	let result;
	const COMA =	1000;
	const element =	document.getElementById("cub-meter");

	result =		parseArtWork();
	console.log(result);
	result =		result?.reduce((sum, val) => {
		return (sum + val.cubed);
	}, 0) ?? 0;
	element.innerText = "Cub: " + (Math.floor(result * COMA) / COMA) + "m³";
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
	element.innerText = std_msg + (Math.floor(result * COMA) / COMA);
	return (element);
}


// ╭──────────────────────────────────────────────────────────────────────────╮
// │ This function is the main function of the webapp. It solves the art work │
// │                         list to possible crates.                         │
// ╰──────────────────────────────────────────────────────────────────────────╯
export async function crate() {
	let crates;
	const estimate =	{};
	const e_code =		document.getElementById("input_estimate").value;

	if (confirm("Ready to crate all works?")) {
		crates =				await checkMetric();
		estimate["reference"] =	e_code;
		estimate["list"] =		parseArtWork();
		estimate["crates"] =	crates;
		addNewWorksToIndexedDB (estimate);

		// INFO: Efemeral triggers to each panel render the result
		sessionStorage.setItem("pane1", "populate");
		sessionStorage.setItem("pane2", "populate");
	}
}


// ╭─────────────────────────────────────────────╮
// │ This function adds the new work and counts. │
// ╰─────────────────────────────────────────────╯
export function countWorks() {
	const result =		parseArtWork();
	let counter =		document.getElementById("count");

	counter.innerText =	"Counting: " + result?.length;
	return (counter);
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
function parseArtWork(){
	const DB =		localStorage;
	const avoid =	["mode", "storage", "currency", "currency", "metrica", "refNumb" ]
	const temp =	[];
	let works;
	
	Object.entries(DB).map(data => {
		avoid.includes(data[0]) ? false : temp.push(JSON.parse(data[1]));
	});
	works = temp.map(work => {
		return(new ArtWork(work.code, work.x, work.z, work.y));
	})
	return(works.length > 0 ? works : false);
}


// ╭───────────────────────────────────────────────────────────╮
// │ Checks the works is in inches and converts to centimeters │
// ╰───────────────────────────────────────────────────────────╯
async function checkMetric() {
	const storageUnit =	localStorage.getItem('metrica');
	const UNIT =		storageUnit === 'cm - centimeters' ? 'cm' : 'in';
	const list =		parseArtWork();
	let crates;

	if (storageUnit.length === 1)
		return(alert("Oops! Sounds like you not added any work yet.\
		Please, try again!"));
	// if (works.getItem("metrica") !== "cm - centimeters") {
	// 	list = list.map((sizes) => {
	// 		let j;
	// 		const tmp = [sizes.code];
	// 		const converted = sizes.conversion("cm");
	//
	// 		j = 0;
	// 		for (j in converted)
	// 			tmp.push(converted[j]);
	// 		return (tmp);
	// 	});
	// }
	crates = await Promise.resolve(new UnitAdapter(list, UNIT));
	return (crates);
}
