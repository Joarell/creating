// This is a replicable Pythagoras`s theorem.
// a**2 = b**2 + c**2
export function pythagoras(a: number, b: number, c: number): number {
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


//This function returns the cubed value to the work.
export function cubing(dimensions: Array<number>): number {
	const cm_to_m = 1000000;

	const cubed = dimensions[1] * dimensions[2] * dimensions[3] / cm_to_m;
	return (Math.floor(cubed * 1000) / 1000);
}


//This function returns the biggest cubed work.
export function big_work(work_list: Array<number>): number {
	let cubed: number;
	let greatest: number;

	cubed = 0;
	greatest = 0;
	work_list.forEach(work => {
		cubed = work;
		if (cubed > greatest) {
			greatest = cubed;
		}

	})
	return (greatest);
}

export * from "./extras.math";
