// ╭──────────────────────────────────────────────────────────────────────────╮
// │ ╭──────────────────────────────────────────────────────────────────────╮ │
// │ │ INFO:             These are the first layer of the app:              │ │
// │ │                        function displayAirCub                        │ │
// │ │                            function crate                            │ │
// │ │                          function addWorks                           │ │
// │ │                         function removeWorks                         │ │
// │ │                         function cleanInputs                         │ │
// │ ╰──────────────────────────────────────────────────────────────────────╯ │
// ╰──────────────────────────────────────────────────────────────────────────╯

// TODO: Resolve the global variables in side the code.
// NOTE:
//	Maybe creat a linked list is the solution to store the works and
//	solve the global variables problem.

export const list = [];

// ╭─────────────────────────────────────────────────────────────────────╮
// │ This function do the calculation of the cub of all works in meters. │
// ╰─────────────────────────────────────────────────────────────────────╯
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


// ╭──────────────────────────────────────────────────────────────────────────╮
// │ Returns a calculation of the cub of all works based on the air companies.│
// ╰──────────────────────────────────────────────────────────────────────────╯
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


// ╭──────────────────────────────────────────────────────────────────────────╮
// │ This function is the main function of the webapp. It solves the art work │
// │                         list to possible crates.                         │
// ╰──────────────────────────────────────────────────────────────────────────╯
export function crate () {
	const estimate = {};
	const e_code = document.getElementById("input_estimate").value;

	estimate["reference"] = e_code;
	estimate["list"] = list;
	// TODO:In this point the function must call the modules to solve the list;
	// Async call to save the original list on the DB;
	// Return the crates;
	// Save the crates on the DB;
}


// ╭─────────────────────────────────────────────╮
// │ This function adds the new work and counts. │
// ╰─────────────────────────────────────────────╯
export function addWorks () {
	let counter;
	
	counter = document.getElementById("count");
	counter.innerText = "Counting: " + list.length;
	displayAirCub(list);
	displayCub(list);
	return (counter);
}


// ╭───────────────────────────────────────────────╮
// │ This function remove the new work and counts. │
// ╰───────────────────────────────────────────────╯
export function removeWorks () {
	// TODO: - This function needs to ask the artwork code in order to remove it
	//from the list using a "alert".
	// FIX: after remove the work it does some procedures below:
	displayAirCub(list);
	displayCub(list);
}


//╭───────────────────────────────────────────────────────────────────────────╮
//│ This function cleans all fields and puts the cursor in the code input box.│
//╰───────────────────────────────────────────────────────────────────────────╯
export function cleanInputs () {
	document.getElementById("input_code").value = "";
	document.getElementById("input_code").select();
	document.getElementById("input_len").value = "";
	document.getElementById("input_dep").value = "";
	document.getElementById("input_hig").value = "";
}
