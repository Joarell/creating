//╭───────────────────────────────────────────────────────────────────────────╮
//│ ╭───────────────────────────────────────────────────────────────────────╮ │
//│ │ INFO:          These are the functions to the first layer:            │ │
//│ │                           Function checWork();                        │ │
//│ │                           Function regValid();                        │ │
//│ │                          Function catchWork();                        │ │
//│ │                         Function catchRemove();                       │ │
//│ ╰───────────────────────────────────────────────────────────────────────╯ │
//╰───────────────────────────────────────────────────────────────────────────╯

import ArtWork from './front-modules/classes.def.mjs';
import * as module from './front-modules/functions.front.end.mjs'
import { createDB, addNewWork } from './front-modules/link.storage.mjs';



// ╭────────────────────────────────────────────╮
// │ This is the trigger to the "crate" button. │
// ╰────────────────────────────────────────────╯
export const crate = () => {
	module.crate();
}

// ╭────────────────────────────────────────────────────────────────────────╮
// │ This function validates all inputs of the fields provided by the user. │
// ╰────────────────────────────────────────────────────────────────────────╯
export function checkWork(work) {
	const checked = regValid(intParser([work[1], work[2], work[3]]));
	const regex = /[^-a-z-A-Z-0-9]/g;
	const estimate = document.getElementById("input_estimate").value;

	switch (regex.test(work[0]) || regex.test(estimate)) {
		case true:
			alert(`Found special character NOT allowed on "Work code",\
			or "Estimate" input. Please, try again!`);
			return (false);
	}
	return (Array.isArray(checked) ? 
		new ArtWork(work[0], checked[0], checked[1], checked[2]) : false);
}


// ╭──────────────────────────────────────────────────────╮
// │ This function converts all string inputs in intager. │
// ╰──────────────────────────────────────────────────────╯
export function intParser(dimensions) {
	const result = dimensions.map(size => {
		return parseInt(size);
	});
	return (result);
}


// ╭────────────────────────────────────────────────────────────────────╮
// │ Regular expression function to validate if all inputs are numbers. │
// ╰────────────────────────────────────────────────────────────────────╯
export function regValid(sizes_parsed) {
	let i;
	const regex = /\D+[^0-9]{1,3}/;

	i = 3;
	while (--i > -1) {
		if (regex.test(sizes_parsed[i]) === true) {
			switch (i) {
				case 2:
					alert(`The provide HEIGHT is not a valid number.\
					Please, try again!`);
					return (false);
				case 1:
					alert(`The provide DEPTH is not a valid number.\
					Please, try again!`);
					return (false);
				case 0:
					alert(`The provide LENGTH is not a valid number.\
					Please, try again!`);
					return (false);
			}
		}
	}
	return (sizes_parsed);
}


// ╭───────────────────────────────────────────────────────────────────────╮
// │ This function start the verification of the inputs in the first step. │
// │ Secondly, calls the other functions from the function.front-modules.  │
// ╰───────────────────────────────────────────────────────────────────────╯
export function catchWork() {
	const cod = document.getElementById("input_code").value;
	const length = document.getElementById("input_len").value;
	const depth = document.getElementById("input_dep").value;
	const height = document.getElementById("input_hig").value;
	let tmp;

	switch (cod && length && depth && height) {
		case "":
			alert(`Oops! Do not forget to fill each field. Please, try again!`);
			return (module.cleanInputs());
	}
	tmp = checkWork([cod, length, depth, height]);
	if (tmp !== false) {
		module.list.push(tmp);
		module.countWorks(module.list);
		// sessionStorage.setItem(
		// 	JSON.stringify(module.list[0].code),
		// 	JSON.stringify(module.list[0])
		// );
		createDB();
		addNewWork(module.list[0], module.list.length);
		alert("Work added");
	}
	return (module.cleanInputs());
}
localStorage.setItem("number", 1);
localStorage.setItem("number", 2);
localStorage.setItem("number", 3);
localStorage.setItem("number", 4);

// ╭─────────────────────────────────────────────────────────────────╮
// │ This is the function to find the work in the list to remove it. │
// ╰─────────────────────────────────────────────────────────────────╯
export function catchRemove() {
	const work = prompt("Please enter the work code to be removed:", "code?");
	let found;
	
	found = module.list.findIndex((item) => {
		if (item.code === work)
			return (item.code);
	});
	found < 0 ?
		alert(`${work} was not found in the list. Please, try again!`) :
		module.removeWorks(module.list, found);
	return(module.cleanInputs());
}
