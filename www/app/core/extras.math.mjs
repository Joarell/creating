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
// ╰─────────────────────────────────────────────╯
export function pitagoras(a, b, c) {
	const stringCheck = [a, b, c].filter(num => !Number.isSafeInteger(num));

	if(stringCheck.length > 0)
		return(false);
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
	const stringCheck = dimensions.filter(num => !Number.isSafeInteger(num));
	const round =		1000;

	if(stringCheck.length > 1)
		return(false);
	const CMTOM = 1_000_000;
	const cubed = dimensions[1] * dimensions[2] * dimensions[3] / CMTOM;
	return ((cubed * round) / round);
}


// ╭───────────────────────────────────────────────╮
// │ This function returns the biggest cubed work. │
// ╰───────────────────────────────────────────────╯
export function big_work(workList) {
	let i =			0;
	let cubed =		0;
	let greater =	0;

	if (workList.length < 1 || !Array.isArray(workList))
		return (false);
	for (i in workList) {
		if(workList[i].length < 4)
			return (false);
		cubed = cubing(workList[i]);
		cubed > greater ? greater = cubed : false;
	}
	return (greater);
}
