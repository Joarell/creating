import Converter from "./Converter.class.mjs";
import CubCalc from "./CubCalc.class.mjs";
import Hexaedro from "./Hexaedro.class.mjs";


export default class ArtWork extends Hexaedro {
	#code;
	#x;
	#z;
	#y;

	constructor (code, x, z, y) {
		super(x, z, y);
		try {
			if (!code || code.trim() <= 0) {
				const error = `Please, provide a valid code. Current: ${code}`;
				throw new TypeError(error);
			}
		}
		catch (err) {
			return (err);
		}
		this.#code =	""+code;
		this.#x =		+x;
		this.#z =		+z;
		this.#y =		+y;
	};

	get arr () {
		return ([this.#code, this.#x, this.#z, this.#y]);
	};

	get cAir () {
		return (new CubCalc(this.#x, this.#z, this.#y).cubCalcAir);
	};

	get cubed () {
		return (new CubCalc(this.#x, this.#z, this.#y).cubArea);
	};

	get autoConvert () {
		const CMVALUES = new Converter(this.#x, this.#z, this.#y).cmConvert;

		this.#x =	CMVALUES[0];
		this.#z =	CMVALUES[1];
		this.#y =	CMVALUES[2];

		return([this.#code, this.#x, this.#z, this.#y]);
	};

	get data () {
		return ({ code : this.#code, x : this.#x, z : this.#z, y : this.#y});
	};
	
};
