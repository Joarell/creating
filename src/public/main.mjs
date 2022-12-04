import ArtWork from './front-modules/classes.def.mjs';
import * as Module from './front-modules/functions.front.end.mjs'

Module.crate();
Module.removeWorks();


// ╭────────────────────────────────────────────────────────────────────────╮
// │ This function validates all inputs of the fields provided by the user. │
// ╰────────────────────────────────────────────────────────────────────────╯
export function checkAndAcceptWork(code, x, z, y) {
	const cod = document.getElementById("input_estimate");
	const length = document.getElementById("input_len");
	const depth = document.getElementById("input_dep");
	const height = document.getElementById("input_hig");

	// The if statement below allows calls from the tests for the momment.
	if (!(Boolean(code) && Boolean(x) && Boolean(z) && Boolean(y))) {
		if (regValid(intParser([length, depth, height])))
			Module.list.push(new ArtWork(cod, length, depth, height));
			Module.addWorks(Module.list);
	}
	else {
		if (regValid(intParser([x, z, y])) != false)
			Module.addWorks(new ArtWork(code, x, z, y));
	}
	return (Module.cleanInputs());
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
	const result = [regx, regz, regy];
	let i;

	i = 3;
	while (--i > -1) {
		if (result[i] === false) {
			// alert(`${sizes_parsed[i]} is not a number. Please try again!`);
			return (false);
		}
	}
	return (result);
}
