let add = 0;
let list = {};


function hiThere() {
	let message;

	message = "Hi there! I' working every press time!";
	document.write(message);
}


//This function adds the new work and counts.
function addWorks () {
	let message;
	let counter;
	
	add += 1;
	message = "Counting: ";
	counter = document.getElementById("count")
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
	counter = document.getElementById("count")
	counter.innerText = message + add;
	//This function needs to ask the artwork code in order to remove it the list.
	return (counter);
}


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
	work = { code, x, z, y };
	console.log(work);

	document.getElementById("input_code").value = "";
	document.getElementById("input_code").select();
	document.getElementById("input_len").value = "";
	document.getElementById("input_dep").value = "";
	document.getElementById("input_hig").value = "";
	return (work);
}
