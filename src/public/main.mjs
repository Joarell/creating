import ArtWork from './front-modules/classes.def.mjs';
import * as module from './front-modules/functions.front.end.mjs'


export const crate = () => {
	module.crate();
}

// TODO: add the correct error message on false cases to each function;

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
export function inOut() {
	const cod = document.getElementById("input_code").value;
	const length = document.getElementById("input_len").value;
	const depth = document.getElementById("input_dep").value;
	const height = document.getElementById("input_hig").value;
	let tmp;

	tmp = checkWork([cod, length, depth, height]);
	if (tmp !== false) {
		module.list.push(tmp);
		module.countWorks(module.list);
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
		alert("ArtWork not found, please try again!") :
		module.removeWorks(module.list, found);
	return(module.cleanInputs());
}
