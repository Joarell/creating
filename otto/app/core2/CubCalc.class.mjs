

import RegexChecker from "./Regex.class.mjs";


export default class CubCalc {
	#x;
	#z;
	#y;

	constructor (x, z, y) {
		this.#x = +x;
		this.#z = +z;
		this.#y = +y;
	};

	get cubCalcAir () {
		return (CubCalcAir(this.#x, this.#z, this.#y));
	};

	get cubArea () {
		return (CubArea(this.#x, this.#z, this.#y));
	};
};


function CubCalcAir(x, z, y) {
	const regex = new RegexChecker(x, z, y).regexSizes;

	if (typeof(regex) === 'object')
		return (regex);

	const CUBAIR = 6000;
	const result = ((x * z * y) / CUBAIR).toFixed(3);

	return(+result);
};


function CubArea(x, z, y) {
	const regex = new RegexChecker(x, z, y).regexSizes;

	if (typeof(regex) === 'object')
		return (regex);

	const CMTOM =	1_000_000;
	const result =	((x * z * y) / CMTOM).toFixed(3);
	
	return(+result);
};
