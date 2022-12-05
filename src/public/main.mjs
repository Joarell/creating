"use strict"
import ArtWork from './front-modules/classes.def.mjs';
import * as Module from './front-modules/functions.front.end.mjs'

// TODO: design the remove function;
// TODO: add the correct error message on false cases to each function;

// ╭────────────────────────────────────────────────────────────────────────╮
// │ This function validates all inputs of the fields provided by the user. │
// ╰────────────────────────────────────────────────────────────────────────╯
export function checkWork(work) {
	const proc = regValid(intParser([work[1], work[2], work[3]]));

	if (proc.length > 0) {
		Module.list.push(new ArtWork(work[0], proc[0], proc[1], proc[2]));
		return (new ArtWork(work[0], proc[0], proc[1], proc[2]));
	}
	return (false);
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


// ╭───────────────────────────────────────────────────────────────────────╮
// │ // Regular expression function to validate if all inputs are numbers. │
// ╰───────────────────────────────────────────────────────────────────────╯
export function regValid(sizes_parsed) {
	const regx = /^\d{1,3}$/g.test(sizes_parsed[0]);
	const regz = /^\d{1,3}$/g.test(sizes_parsed[1]);
	const regy = /^\d{1,3}$/g.test(sizes_parsed[2]);
	const checked = [regx, regz, regy];
	let i;

	i = 3;
	while (--i > -1) {
		if (checked[i] === false) {
			// alert(`${sizes_parsed[i]} is not a number. Please try again!`);
			return (false);
		}
	}
	return (sizes_parsed);
}


// ╭───────────────────────────────────────────────────────────────────────╮
// │ This function start the verification of the inputs in the first step. │
// │ Secondly, calls the other functions from the function.front-modules.  │
// ╰───────────────────────────────────────────────────────────────────────╯
export function inOut () {
// TODO: Not tested yet;
	const cod = document.getElementById("input_estimate");
	const length = document.getElementById("input_len");
	const depth = document.getElementById("input_dep");
	const height = document.getElementById("input_hig");
	let tmp;

	tmp = checkWork([cod, length, depth, height]);
	if (tmp !== false) {
		Module.list.push(tmp);
		Module.addWorks(Module.list);
	}
	return (Module.cleanInputs());
}
