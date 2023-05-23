// ╭───────────────────────────────────────────────────────────────────╮
// │ ╭───────────────────────────────────────────────────────────────╮ │
// │ │ On this module has math functions to solve the artwork list.  │ │
// │ │                    function pitagoras();                      │ │
// │ │                      function cubing();                       │ │
// │ │                     function big_work();                      │ │
// │ ╰───────────────────────────────────────────────────────────────╯ │
// ╰───────────────────────────────────────────────────────────────────╯

import ArtWork from "../front-modules/Art.class.def.mjs";


// ╭─────────────────────────────────────────────╮
// │ This is a replic of the pitagoras`s teorem. │
// │             a**2 = b**2 + c**2              │
// ╰─────────────────────────────────────────────╯
export function pitagoras(a, b, c) {
	if (a && b && !c) {
		a = a ** 2;
		b = b ** 2;
		c = a - b;
		return (~~(Math.sqrt(c) * 100)/100);
	}
	else if (a && !b && c) {
		a = a ** 2;
		c = c ** 2;
		b = a - c;
		return (~~(Math.sqrt(b) * 100)/100);
	}
	else {
		b = b ** 2;
		c = c ** 2;
		a = b + c;
		return (~~(Math.sqrt(a) * 100)/100);
	}
}


// ╭────────────────────────────────────────────────────╮
// │ This function returns the cubed value to the work. │
// ╰────────────────────────────────────────────────────╯
export function cubing(dimensions) {
	let cm_to_m;

	cm_to_m = 1_000_000;
	const cubed = dimensions[1] * dimensions[2] * dimensions[3] / cm_to_m;
	return (~~(cubed * 1000) / 1000);
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
	return (great);
}


// ╭─────────────────────────────────────────────────────────────────╮
// │ Converts the sizes to inches if metric is equal to "in", and to │
// │             centimeters if metric is equal to "cm".             │
// ╰─────────────────────────────────────────────────────────────────╯
export function conversion(sizes, metric){
	const inch = 0.39;
	const dim = [sizes.code];

	if (metric === "cm"){
		dim.push(~~((sizes.x / inch) * 100) / 100);
		dim.push(~~((sizes.z / inch) * 100) / 100);
		dim.push(~~((sizes.y / inch) * 100) / 100);
	}
	else {
		dim.push(~~((sizes.x * inch) * 100) / 100);
		dim.push(~~((sizes.z * inch) * 100) / 100);
		dim.push(~~((sizes.y * inch) * 100) / 100);
	}
	return (dim = new ArtWork(dim[0], dim[1], dim [2], dim [3]));
}
