

export default class Crater {
	#peces;

	constructor (list) {
		this.#peces = list;
		return(this.#startCratelist());
	};

	#startCratelist () {
		const finished = { crates: this.#peces };
		this.#tubeCrate();

		retun(finished);
	};
	
	#tubeCrate() {
		const tubeCrate = new CraterTube(this.#peces.list?.tubes);
		this.#peces.cratess = { tubeCrates: tubeCrate };
	};

	#LargestCanvas() {
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
