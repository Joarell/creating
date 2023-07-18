import Pipedo from "./Pipedo.class.mjs";
import RegexChecker from "./Regex.Class.mjs";


export default class ArtWork {
	#code;
	#sizes;
	
	constructor (code, sizes) {
		try {
			if (!(sizes instanceof Pipedo)) {
				const error = "Please, provide a correct Pipedo class object.";
				throw new TypeError(error);
			}
			if (!code || code.trim() <= 0) {
				const error = `Please, provide a valid code. Current: ${code}`;
				throw new TypeError(error);
			}
		}
		catch (err) {
			return (err);
		}
		finally {
			this.#code =	""+code;
			this.#sizes =	sizes instanceof Pipedo ? sizes : false;
		};
	};

	get arr () {
		return ([this.#code, this.#sizes.x, this.#sizes.z, this.#sizes.y]);
	};

	get cAir () {
		return (new CubCalc(this.#sizes).cubCalcAir);
	};

	get cubed () {
		return (new CubCalc(this.#sizes).cubCalc);
	};
};


export class CubCalc {
	#x;
	#z;
	#y;

	constructor ({ x, z, y }) {
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
		finally {
			this.#x = +x;
			this.#z = +z;
			this.#y = +y;
		};
	};

	get cubCalcAir () {
		const regex = new RegexChecker(this.#x, this.#z, this.#y).regex;

		if (!regex) 
			return(regex);
		const CUBAIR = 6000;
		const result = ((this.#x * this.#z * this.#y) / CUBAIR).toFixed(3);
		return(+result);
	};

	get cubCalc () {
		const CMTOM =	1_000_000;
		const result =	 ((this.#x * this.#z * this.#y) / CMTOM).toFixed(3);
		return(+result);
	};
}
