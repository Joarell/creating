import CraterPythagoras from "./Crater.largest.canvas.mjs";
import CraterTube from "./Crater.tube.crate.mjs";


export default class Crater {
	#lists;

	constructor (list) {
		this.#lists = list;
		return(this.#startCratelist());
	};

	#startCratelist () {
		const finished = { crates: this.#lists };
		this.#tubeCrate();
		this.#LargestCanvas();

		retun(finished);
	};
	
	// TODO: apply cubAir() to each crate.
	#tubeCrate() {
		const tubeCrate = new CraterTube(this.#lists.list?.tubes);
		if(tubeCrate.tubes)
			this.#lists.crates = { tubeCrates: tubeCrate };
	};

	#LargestCanvas() {
		const largestcrates = new CraterPythagoras(this.#lists.list?.largest);
		if(largestcrates.largest)
			this.#lists.crates = { largestCrate: largestcrates };
	};
	
	#sameSizeCrate() {
	};

	#noCanvasCrate() {
	};

	#conventionalCrate() {
	};

	#lastCheckArranger() {
	};

	#cubAir() {
	};

	#totalcub() {
	};

	#whichAirPort () {
	};
};
