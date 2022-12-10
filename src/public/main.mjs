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
	const regex = /^\d{1,3}$/;

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
		elementList(module.list);
	}
	return (module.cleanInputs());
}


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


// ╭────────────────────────────────────────────────────╮
// │ Retunns the HTML table with all works in the list. │
// ╰────────────────────────────────────────────────────╯
export function elementList(nList) {
	let i;
	const table = document.createElement("tr");

	i = 0;
	while (i <= nList.length) {
		table.innerHTML += nList[i].vector.map(
			item => `<th>${item}</th>`
		).join("");
		i++;
	}
	console.log(table);
	return (table);
}


export function elementTable () {
	const frameDiv = document.createElement("div");
	const table = document.createElement("table");
	const target = document.getElementById("frame-list");

	table.innerHTML = `
		<th>CODE</th>
		<th>LENGTH</th>
		<th>DEPTH</th>
		<th>HEIGHT</th>
	`;
	frameDiv.appendChild(table);
	target.appendChild(frameDiv);
	return (target);
}

elementTable();
