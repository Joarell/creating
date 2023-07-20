

import RegexChecker from "./Regex.Class.mjs";

export default class CubCalc {
	#x;
	#z;
	#y;

	constructor (x, z, y) {
		const regex = new RegexChecker(x, z, y).regex;

		try {
			if (!regex) {
				const error = "Not a valid entry to RegexChecker!";
				throw new TypeError(error);
			}
		}
		catch (err) {
			return (err);
		}
		this.#x = +x;
		this.#z = +z;
		this.#y = +y;
	};

	get cubCalcAir () {
		return (new CubCalcAir(this.#x, this.#z, this.#y).cubAir);
	};

	get cubArea () {
		return (new CubArea(this.#x, this.#z, this.#y).cubArea);
	};
}


class CubCalcAir extends CubCalc {
	#x;
	#z;
	#y;

	constructor (x, z ,y ) {
		super(x, z, y);
		this.#x = +x;
		this.#z = +z;
		this.#y = +y;
	};

	get cubAir () {
		const regex = new RegexChecker(this.#x, this.#z, this.#y).regex;

		if (!regex) 
			return(regex);
		const CUBAIR = 6000;
		const result = ((this.#x * this.#z * this.#y) / CUBAIR).toFixed(3);

		return(+result);
	};
};


class CubArea extends CubCalc {
	#x;
	#z;
	#y;

	constructor (x, z ,y ) {
		super(x, z, y);
		this.#x = +x;
		this.#z = +z;
		this.#y = +y;
	};

	get cubArea () {
		const CMTOM =	1_000_000;
		const result =	((this.#x * this.#z * this.#y) / CMTOM).toFixed(3);
		
		return(+result);
	};
};
