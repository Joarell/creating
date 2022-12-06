// ╭──────────────────────────────────────────────────────────────────────────╮
// │ ╭──────────────────────────────────────────────────────────────────────╮ │
// │ │ INFO:            These are the second layer of the app:              │ │
// │ │                        function displayAirCub                        │ │
// │ │                            function crate                            │ │
// │ │                          function addWorks                           │ │
// │ │                         function removeWorks                         │ │
// │ │                         function cleanInputs                         │ │
// │ ╰──────────────────────────────────────────────────────────────────────╯ │
// ╰──────────────────────────────────────────────────────────────────────────╯

export const list = [];

// ╭─────────────────────────────────────────────────────────────────────╮
// │ This function do the calculation of the cub of all works in meters. │
// ╰─────────────────────────────────────────────────────────────────────╯
export function displayCub(n_list) {
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
export function displayAirCub(n_list) {
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
export function crate() {
	// TODO: Not tested yet;
	const estimate = {};
	const e_code = document.getElementById("input_estimate").value;

	estimate["reference"] = e_code;
	estimate["list"] = list;
	console.log(e_code);
	// TODO: In this point the function must call the modules to solve the list;
	// TODO: Async call to save the original list on the DB;
	// TODO: Return the crates;
	// TODO: Save the crates on the DB;
}


// ╭─────────────────────────────────────────────╮
// │ This function adds the new work and counts. │
// ╰─────────────────────────────────────────────╯
export function countWorks() {
	// TODO: Not tested yet;
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
export function removeWorks(n_list, index) {
	// TODO: - Not tested yet;
	n_list.splice(index, 1);
	console.log(list);
	alert("The work was removed from the list");
	return (countWorks() && displayAirCub(n_list) && displayCub(n_list));
}


//╭───────────────────────────────────────────────────────────────────────────╮
//│ This function cleans all fields and puts the cursor in the code input box.│
//╰───────────────────────────────────────────────────────────────────────────╯
export function cleanInputs() {
	// TODO: Not tested yet;
	document.getElementById("input_code").value = "";
	document.getElementById("input_code").select();
	document.getElementById("input_len").value = "";
	document.getElementById("input_dep").value = "";
	document.getElementById("input_hig").value = "";
}
