import ArtWork from './classes.def.mjs';
//TODO - Create some protection against blank and invalid inputs before pussh any button.
//	Fields:
//		Estimate;
//		Work code;
//		Length;
//		Depth;
//		Height;
//	Resolve the global variables in side the code.

export let estimate = {};
const list = [];
let add = 0;
console.log(list);
console.log(estimate);

//This function do the calculation of the cub of all works in meters.
export function displayCub (n_list) {
	let result;
	let element;

	element = document.getElementById("cub-meter");
	result = n_list.reduce((sum, value) => {
		return (sum + value.cub);
	}, 0);
	element.innerText = "Cubed: " + (Math.floor(result * 1000) / 1000) + "m³";
	return (element);
}


//This function do the calculation of the cub of all works based on the air 
//companies.
export function displayAirCub (n_list) {
	let result;
	let element;
	let std_msg;

	std_msg = "Air-Cubed: ";
	element = document.getElementById("cub-air");
	result = n_list.reduce((sum, value) => {
		return (sum + value.cubeAir);
	}, 0);
	element.innerText = std_msg + (Math.floor(result * 1000) / 1000);
	return (element);
}


//This function is the main function of the webapp. It solves the art work list
//to possible crates.
export function crate () {
	let e_code;

	e_code = document.getElementById("input_estimate").value;
	estimate["reference"] = e_code;
	estimate["list"] = list;
	//In this point the function should call the modules to solve the list.
}


//This function adds the new work and counts.
export function addWorks () {
	let counter;
	
	counter = document.getElementById("count");
	counter.innerText = "Counting: " + list.length;
	insertWorks();
	displayAirCub(list);
	displayCub(list);
	return (counter);
}


//This function remove the new work and counts.
export function removeWorks () {
	let message;
	let counter;
	
	add -= 1;
	counter = document.getElementById("count");
	counter.innerText = message + add;
	//TODO - This function needs to ask the artwork code in order to remove it
	//from the list.
	return (counter);
}


//This function is responsible to add the size works to the list.
export function insertWorks () {
	let x;
	let z;
	let y;
	let code;

	code = document.getElementById("input_code").value;
	x = document.getElementById("input_len").value;
	z = document.getElementById("input_dep").value;
	y = document.getElementById("input_hig").value;
	//TODO - check if all inputs are valid;
	list.push(new ArtWork(code, x, y, z));
	cleanFields();
	return (list);
}


//This function cleans all fields and puts the cursor in the code input box.
export function cleanFields () {
	document.getElementById("input_code").value = "";
	document.getElementById("input_code").select();
	document.getElementById("input_len").value = "";
	document.getElementById("input_dep").value = "";
	document.getElementById("input_hig").value = "";
}
