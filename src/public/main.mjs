//╭───────────────────────────────────────────────────────────────────────────╮
//│ ╭───────────────────────────────────────────────────────────────────────╮ │
//│ │ INFO:          These are the functions to the first layer:            │ │
//│ │                           Function checWork();                        │ │
//│ │                           Function regValid();                        │ │
//│ │                          Function catchWork();                        │ │
//│ │                         Function catchRemove();                       │ │
//│ │                         Function checkReference();                    │ │
//│ │                         Function intParser();                         │ │
//│ ╰───────────────────────────────────────────────────────────────────────╯ │
//╰───────────────────────────────────────────────────────────────────────────╯

import ArtWork from './front-modules/classes.def.mjs';
import * as mod from './front-modules/functions.front.end.mjs'


// ╭────────────────────────────────────────────────────────────────────────╮
// │ This function validates all inputs of the fields provided by the user. │
// ╰────────────────────────────────────────────────────────────────────────╯
export function checkWork(work) {
	const checked = regValid(intParser([work[1], work[2], work[3]]));
	const regex = /[^-a-z-A-Z-0-9]/g;
	const estimate = document.getElementById("input_estimate").value;
	let i;
	
	i = 0;
	for (i in localStorage.key(i)){
		if(work[0] === localStorage.key(i)){
			alert(`${work[0]} already added to the list. Please, try again`);
			return(false);
		}
	}
	switch (regex.test(work[0]) || regex.test(estimate)) {
		case true:
			alert(`Found special character NOT allowed on "Work code",\
			or "Estimate" input. Please, try again!`);
			return (false);
	}
	checkReference();
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
	const regex = /^[0-9]{1,3}/;

	i = 3;
	while (--i > -1) {
		if (regex.test(sizes_parsed[i]) === false) {
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


//╭───────────────────────────────────────────────────────────────────────────╮
//│   This function start the verification of the inputs in the first step.   │
//│Secondly, calls the other functions from the modules when all verifications│
//│                           were done and right.                            │
//╰───────────────────────────────────────────────────────────────────────────╯
export function catchWork() {
	const cod = document.getElementById("input_code").value;
	const length = document.getElementById("input_len").value;
	const depth = document.getElementById("input_dep").value;
	const height = document.getElementById("input_hig").value;
	let tmp;

	switch (cod && length && depth && height) {
		case "":
			alert(`Oops! Do not forget to fill each field. Please, try again!`);
			return (mod.cleanInputs());
	}
	tmp = checkWork([cod, length, depth, height]);
	if (tmp !== false) {
		localStorage.setItem(tmp.code, JSON.stringify(tmp));
		mod.countWorks();
		mod.displayAirCub();
		mod.displayCub();
	}
	return (mod.cleanInputs());
}


// ╭─────────────────────────────────────────────────────────────────╮
// │ This is the function to find the work in the list to remove it. │
// ╰─────────────────────────────────────────────────────────────────╯
export function catchRemove() {
	const work = prompt("Please enter the work code to be removed:", "code?");
	
	if(localStorage.getItem(work)){
		localStorage.removeItem(work);
		mod.countWorks();
		mod.displayAirCub();
		mod.displayCub();
	}
	else if(work === null)
		return(mod.cleanInputs());
	else
		alert(`"${work}" was not found in the list. Please, try again!`);
	return(mod.cleanInputs());
}


// ╭─────────────────────────────────────────────────────────────────╮
// │ This functions checks if the reference has changed by the user. │
// ╰─────────────────────────────────────────────────────────────────╯
export function checkReference() {
	const ref = sessionStorage.getItem("reference");
	const actual = document.getElementById("input_estimate").value;
	
	if (ref){
		if (ref !== actual){
			if (confirm("ATTENTION! The reference has changed")){
				sessionStorage.removeItem("reference");
				sessionStorage.setItem("reference", actual);
				document.getElementById("input_estimate").value = actual;
			}
			else
				document.getElementById("input_estimate").value = ref;
		}
	}
	else
		sessionStorage.setItem("reference", actual);
}
