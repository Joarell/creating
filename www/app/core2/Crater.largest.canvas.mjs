

export default class CraterPythagoras {
	#largest;

	constructor (canvas) {
		if(!canvas)
			return({ largest: false });
		this.#largest = canvas;
		return(this.#pitagorasCrater());
	};

	#setPadding(innerCrate, layers) {
		const PAD =			23;
		const HIGHPAD =		28;
		const LAYER =		10;
		const X =			innerCrate[1] + PAD;
		const Z =			(innerCrate[2] + PAD) + (LAYER * layers);
		const Y =			innerCrate[3] + HIGHPAD;

		return ([X, Z, Y]);
	};

	#pitagorasTheorem(crate) {
		const MAXHEIGHT =	240;
		const a =			crate[2] ** 2;
		const b =			MAXHEIGHT ** 2;
		const c =			a - b;
		const z =			~~(Math.sqrt(c) * 100) / 100;

		return ([crate[0], z, MAXHEIGHT]);
	};

	#defineCrate(canvas) {
		let biggestWork = canvas[0];
		let crate;

		canvas.map(work => {
			if (work[1] > biggestWork[1] && work[3] > biggestWork[3])
				biggestWork = work;
		});
		crate = this.#setPadding(biggestWork, canvas.length);
		return(crate);
	};

	#crateInterface(opt, works) {
		let crate;
		let pitagorasCrates;

		switch (opt){
			case 1:
				crate =				this.#defineCrate(works);
				pitagorasCrates =	this.#pitagorasTheorem(crate);
				return(pitagorasCrates);
			case 2:
				crate =				this.#defineCrate(works);
				pitagorasCrates =	this.#pitagorasTheorem(crate);
				return(pitagorasCrates);
			case 3:
				crate =				this.#defineCrate(works);
				pitagorasCrates =	this.#pitagorasTheorem(crate);
				return(pitagorasCrates);
		};
	};

	#largestCrateTrail () {
		const MAXCANVAS =	3;
		let crates =		[];
		let canvas;

		while(this.#largest.length) {
			canvas = this.#largest.splice(0, MAXCANVAS);
			crates.push(this.#crateInterface(canvas.length, canvas))
			crates.push({ works: canvas });
		};
		return(crates);
	};

	#pitagorasCrater() {
		const crates = this.#largestCrateTrail();
		return(this.largest = { crates: crates });
	};
};
