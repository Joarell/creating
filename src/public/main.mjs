import ArtWork from './front-modules/classes.def.mjs';
import * as Module from './front-modules/functions.front.end.mjs'

// Module.addWorks();
// Module.crate();
// Module.removeWorks();


//This is the thats validate all inputs of the fields provided by the user.
export function checkAndAcceptWork (x, z , y) {
	//verify if all data were provided by the user and then call the module functions.
	if (!(x, z, y)) {
		const length = document.getElementById("input_len");
		const depth = document.getElementById("input_dep");
		const height = document.getElementById("input_hig");
	}
	else {
		regValidation (intParser ([x , z, y]))
	}
}


//This is the regular expression function to validate if all inputs are numbers.
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

//This function converts all string inputs in intager.
export function intParser(dimensions) {
	const result = dimensions.map(size => {
		return parseInt(size);
	});
	return (result);
}
