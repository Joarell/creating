//TODO - Create some protection against blank inputs before pussh any button.
//	Fields:
//		Estimate;
//		Work code;
//		Length;
//		Depth;
//		Height;

let list = {};
let add = 0;
let estimate = {};


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
	let message;
	let counter;
	
	add++;
	message = "Counting: ";
	counter = document.getElementById("count");
	counter.innerText = message + add;
	insertWorks();
	return (counter);
}


//This function remove the new work and counts.
function removeWorks () {
	let message;
	let counter;
	
	add -= 1;
	message = "Counting: ";
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
	let work;

	code = document.getElementById("input_code").value;
	x = document.getElementById("input_len").value;
	z = document.getElementById("input_dep").value;
	y = document.getElementById("input_hig").value;
	//TODO - check if all inputs are valid;
	work = { code, x, z, y };
	list["work"] = work;
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
