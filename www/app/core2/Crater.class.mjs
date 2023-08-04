
import CraterPythagoras from "./Crater.largest.canvas.mjs";
import CraterSameSize from "./Crater.same.size.mjs";
import CraterTube from "./Crater.tube.crate.mjs";


export default class Crater {
	#lists;

	constructor (list) {
		this.#lists = list;
		return(this.#startCrateList());
	};

	#startCrateList () {
		this.#tubeCrate();
		this.#LargestCanvas();
		this.#sameSizeCrate();
		this.#noCanvasCrate();

		return({ crates: this.#lists });
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
		const sameMeasure = new CraterSameSize(this.#lists.list?.sameSize);
		if(sameMeasure.largest)
			this.#lists.crates = { sameSizeCrate: sameMeasure };
	};

	#noCanvasCrate() {
		const noCanvas = new CraterSameSize(this.#lists.list?.sameSize);
		if(noCanvas.largest)
			this.#lists.crates = { noCanvasCrate: noCanvas };
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
