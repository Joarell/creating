// ╭───────────────────────────────────────────────────────────────────╮
// │ ╭───────────────────────────────────────────────────────────────╮ │
// │ │ On this module has math functions to solve the artwork list.  │ │
// │ │                    function pitagoras();                      │ │
// │ │                      function cubing();                       │ │
// │ │                     function big_work();                      │ │
// │ ╰───────────────────────────────────────────────────────────────╯ │
// ╰───────────────────────────────────────────────────────────────────╯

import ArtWork from "../front-modules/classes.def.mjs";


// ╭─────────────────────────────────────────────╮
// │ This is a replic of the pitagoras`s teorem. │
// │             a**2 = b**2 + c**2              │
// ╰─────────────────────────────────────────────╯
export function pitagoras(a, b, c) {
	if (a && b && !c) {
		a = a ** 2;
		b = b ** 2;
		c = a - b;
		return (Math.floor(Math.sqrt(c) * 100)/100);
	}
	else if (a && !b && c) {
		a = a ** 2;
		c = c ** 2;
		b = a - c;
		return (Math.floor(Math.sqrt(b) * 100)/100);
	}
	else {
		b = b ** 2;
		c = c ** 2;
		a = b + c;
		return (Math.floor(Math.sqrt(a) * 100)/100);
	}
}


// ╭────────────────────────────────────────────────────╮
// │ This function returns the cubed value to the work. │
// ╰────────────────────────────────────────────────────╯
export function cubing(dimensions) {
	let cm_to_m;

	cm_to_m = 1000000;
	const cubed = dimensions[1] * dimensions[2] * dimensions[3] / cm_to_m;
	return Math.floor(cubed * 1000) / 1000;
}


// ╭───────────────────────────────────────────────╮
// │ This function returns the biggest cubed work. │
// ╰───────────────────────────────────────────────╯
export function big_work(work_list) {
	let i = 0;
	let cubed = 0;
	great = 0;

	for (i in work_list) {
		cubed = cubing(work_list[i]);
		if (cubed > great) {
			great = cubed;
		}
	}
	return great;
}


// ╭─────────────────────────────────╮
// │ Converts centimeters to inches. │
// ╰─────────────────────────────────╯
export function convertCmToIn(sizes){
	let converted;
	const inch = 0.39;

	converted = sizes.map((size) => {
		let i;
		const dimensions = [size.code];

		i = 0;
		while (++i <= 3)
			dimensions.push(Math.floor((size.vector[i] * inch) * 100) / 100);
		return (dimensions);
	});
	converted = converted.map((sizes) => {
		return(new ArtWork(sizes[0], `${sizes[1]}`, `${sizes[2]}`, `${sizes[3]}`));
	});
	return (converted);
}


// ╭─────────────────────────────────╮
// │ Converts iches to centimenters. │
// ╰─────────────────────────────────╯
export function convertInToCm(sizes){
	let converted;
	const inch = 0.39;

	converted = sizes.map((size) => {
		let i;
		const dimensions = [size.code];

		i = 0;
		while (++i <= 3)
			dimensions.push(Math.floor((size.vector[i] / inch) * 100) / 100);
		return (dimensions);
	});
	converted = converted.map((sizes) => {
		return(new ArtWork(sizes[0], `${sizes[1]}`, `${sizes[2]}`, `${sizes[3]}`));
	});
	return (converted);
}
