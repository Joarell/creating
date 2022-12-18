// ╭───────────────────────────────────────────────────────────────────╮
// │ ╭───────────────────────────────────────────────────────────────╮ │
// │ │ On this module has math functions to solve the artwork list.  │ │
// │ │                    function pitagoras();                      │ │
// │ │                      function cubing();                       │ │
// │ │                     function big_work();                      │ │
// │ ╰───────────────────────────────────────────────────────────────╯ │
// ╰───────────────────────────────────────────────────────────────────╯


// ╭─────────────────────────────────────────────╮
// │ This is a replic of the pitagoras`s teorem. │
// │             a**2 = b**2 + c**2              │
// ╰─────────────────────────────────────────────╯
export function pitagoras(a, b, c) {
	if (a && b && !c) {
		a = a ** 2;
		b = b ** 2;
		c = a - b;
		return (Math.floor(Math.sqrt(c)));
	}
	else if (a && !b && c) {
		a = a ** 2;
		c = c ** 2;
		b = a - c;
		return (Math.floor(Math.sqrt(b)));
	}
	else {
		b = b ** 2;
		c = c ** 2;
		a = b + c;
		return (Math.floor(Math.sqrt(a)));
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
