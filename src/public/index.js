//TODO - Create some protection against blank and invalid inputs before pussh any button.
//	Fields:
//		Estimate;
//		Work code;
//		Length;
//		Depth;
//		Height;

let list = [];
let estimate = new Object();
let add = 1;

//This is the calls "work" to each work added on the list;
class Work {
	constructor (code, x, z, y) {
		this.code = code;
		this.x = x;
		this.z = z;
		this.y = y;
	}
	get cubeAir () {
		return (Math.floor(this.cAir() * 1000) / 1000);
	}
	cAir () {
		const cons = 6000;
		const x = parseInt(this.x);
		const z = parseInt(this.z);
		const y = parseInt(this.y);

		return ((x * z * y) / cons);
	}
	get cub () {
		return (Math.floor(this.cubed() * 1000) / 1000);
	}
	cubed () {
		const cmToM = 1000000;
		const x = parseInt(this.x);
		const z = parseInt(this.z);
		const y = parseInt(this.y);

		return ((x * z * y) / cmToM);
	}
}


//This function do the calculation of the cub of all works in meters.
function displayCub (n_list) {
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
function displayAirCub (n_list) {
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
function crate () {
	let e_code;

	e_code = document.getElementById("input_estimate").value;
	console.log(e_code);
	estimate["reference"] = e_code;
	estimate["list"] = list;
	//In this point the function should call the modules to solve the list.
}


//This function adds the new work and counts.
function addWorks () {
	let counter;
	
	counter = document.getElementById("count");
	counter.innerText = "Counting: " + add++;
	insertWorks();
	displayAirCub(list);
	displayCub(list);
	return (counter);
}


//This function remove the new work and counts.
function removeWorks () {
	let message;
	let counter;
	let report;
	
	// add -= 1;
	message = prompt("Please enter the code to be removed: ");
	if (message == null || message == "") {
		report = "Remove canceled!";
	} else {
	// 	try
	}
	counter = document.getElementById("count");
	counter.innerText = message + add;
	//TODO - This function needs to ask the artwork code in order to remove it
	//from the list.
	return (counter);
}


//This function is responsible to add the size works to the list.
function insertWorks () {
	let x;
	let z;
	let y;
	let code;

	code = document.getElementById("input_code").value;
	x = document.getElementById("input_len").value;
	z = document.getElementById("input_dep").value;
	y = document.getElementById("input_hig").value;
	//TODO - check if all inputs are valid;
	list.push(new Work(code, x, y, z));
	cleanFields();
	return (list);
}


//This function cleans all fields and puts the cursor in the code input box.
function cleanFields () {
	document.getElementById("input_code").value = "";
	document.getElementById("input_code").select();
	document.getElementById("input_len").value = "";
	document.getElementById("input_dep").value = "";
	document.getElementById("input_hig").value = "";
}
