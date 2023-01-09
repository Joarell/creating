// ╭──────────────────────────────────────────────────────────────────────────╮
// │ ╭──────────────────────────────────────────────────────────────────────╮ │
// │ │ INFO:            These are the second layer of the app:              │ │
// │ │                        function displayAirCub();                     │ │
// │ │                            function crate();                         │ │
// │ │                          function addWorks();                        │ │
// │ │                         function cleanInputs();                      │ │
// │ │                         function parseArtWork();                     │ │
// │ ╰──────────────────────────────────────────────────────────────────────╯ │
// ╰──────────────────────────────────────────────────────────────────────────╯

import ArtWork from "./classes.def.mjs";
import * as dB from "./link.storage.mjs";
import { boss } from "../core/start.adm.mjs";


// ╭─────────────────────────────────────────────────────────────────────╮
// │ This function do the calculation of the cub of all works in meters. │
// ╰─────────────────────────────────────────────────────────────────────╯
export function displayCub() {
	let result;
	let element;

	element = document.getElementById("cub-meter");
	result = parseArtWork();
	result = result.reduce((sum, val) => {
		return (sum + val.cub);
	}, 0)
	element.innerText = "Cubed: " + (Math.floor(result * 1000) / 1000) + "m³";
	return (element);
}


// ╭──────────────────────────────────────────────────────────────────────────╮
// │ Returns a calculation of the cub of all works based on the air companies.│
// ╰──────────────────────────────────────────────────────────────────────────╯
export function displayAirCub() {
	let result;
	let element;
	let std_msg;

	std_msg = "Air-Cubed: ";
	element = document.getElementById("cub-air");
	result = parseArtWork();
	result = result.reduce((sum, val) => {
		return (sum + val.cubeAir);
	}, 0)
	element.innerText = std_msg + (Math.floor(result * 1000) / 1000);
	return (element);
}


// ╭──────────────────────────────────────────────────────────────────────────╮
// │ This function is the main function of the webapp. It solves the art work │
// │                         list to possible crates.                         │
// ╰──────────────────────────────────────────────────────────────────────────╯
export function crate() {
	let crates;
	const estimate = {};
	const e_code = document.getElementById("input_estimate").value;

	if(confirm("Ready to crate all works?")) {
		crates = checkMetric();
		estimate["reference"] = e_code;
		estimate["list"] = parseArtWork();
		estimate["solved"] = crates;
		return (dB.createDB());
		// TODO: In this point the function must call the modules to solve the list;
		// TODO: Async call to save the original list on the DB;
		// TODO: Return the crates
		// TODO: Save the crates on the DB;
	}
	return (alert("Aborting!!!"));
}


// ╭─────────────────────────────────────────────╮
// │ This function adds the new work and counts. │
// ╰─────────────────────────────────────────────╯
export function countWorks() {
	let counter;
	let result;
	
	result = parseArtWork();
	counter = document.getElementById("count");
	counter.innerText = "Counting: " + result.length;
	return (counter);
}


//╭───────────────────────────────────────────────────────────────────────────╮
//│ This function cleans all fields and puts the cursor in the code input box.│
//╰───────────────────────────────────────────────────────────────────────────╯
export function cleanInputs() {
	document.getElementById("input_code").value = "";
	document.getElementById("input_code").select();
	document.getElementById("input_len").value = "";
	document.getElementById("input_dep").value = "";
	document.getElementById("input_hig").value = "";
}


// ╭──────────────────────────────────────────────────────╮
// │ Converts the localStorage data in to ArtWork object. │
// ╰──────────────────────────────────────────────────────╯
function parseArtWork(){
	const db = localStorage;
	let temp;
	let i;
	
	i = 0;
	temp = [];
	while(db.key(i)){
		if(db.key(i) !== "metrica")
			temp.push(JSON.parse(db.getItem(db.key(i))));
		i++;
	}
	if(temp[0] !== null){
		temp = temp.map((work) => {
			return(new ArtWork(work.code, work.x, work.z, work.y));
		})
	}
	else
		return (false);
	return (temp);
}


// ╭───────────────────────────────────────────────────────────╮
// │ Checks the works is in inches and converts to centimeters │
// ╰───────────────────────────────────────────────────────────╯
function checkMetric() {
	let list;
	const works = localStorage;

	list = parseArtWork();
	if (works.length === 1)
		return(alert("Oops! Sounds like you not added any work yet.\
		Please, try again!"));
	else if(works.getItem("metrica") === "cm - centimeters")
		return (boss(list));
	else {
		list = list.map((sizes) => {
			let j;
			const tmp = [sizes.code];
			const converted = sizes.convertion("cm");

			j = 0;
			for (j in converted)
				tmp.push(converted[j]);
			return (tmp);
		});
	}
	return(boss(list));
}
