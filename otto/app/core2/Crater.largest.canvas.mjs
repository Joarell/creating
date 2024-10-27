

export default class CraterPythagoras {
	#largest;

	constructor (canvas) {
		if(!canvas || canvas.length === 0)
			return({ largest: false });
		this.#largest = canvas;
		return(this.#pitagorasCrater());
	};

	#setPadding(innerCrate, layers) {
		const PAD =		23;
		const HIGHPAD =	28;
		const LAYER =	2.5;
		const X =		innerCrate[0] + PAD;
		const Z =		(innerCrate[1] + PAD) + (LAYER * layers);
		const Y =		innerCrate[2] + HIGHPAD;

		return ([X, Z, Y]);
	};

	#pitagorasTheorem(crate) {
		const MAXHEIGHT =	240;
		const a =			crate[2] ** 2;
		const b =			MAXHEIGHT ** 2;
		const c =			a > b ? a - b : b - a;
		const z =			(~~(Math.sqrt(c) * 100)) / 100;

		return ([crate[0], z, MAXHEIGHT]);
	};

	#defineCrate(canvas) {
		let crate;
		let x = 0;
		let z = 0;
		let y = 0;

		canvas.map(work => {
			x < work[1] ? x = work[1] : false;
			z < work[2] ? z = work[2] : false;
			y < work[3] ? y = work[3] : false;
		});
		crate = this.#setPadding([x, z, y], canvas.length);
		return(crate);
	};

	#crateInterface(works) {
		let crate;
		let pitagorasCrates;

		crate =				this.#defineCrate(works);
		pitagorasCrates =	this.#pitagorasTheorem(crate);
		return(pitagorasCrates);
	};

	#largestCrateTrail () {
		const MAXCANVAS =	3;
		let crates =		[];
		let canvas;

		while(this.#largest.length) {
			canvas = this.#largest.splice(0, MAXCANVAS);
			crates.push(this.#crateInterface(canvas))
			crates.push({ works: canvas });
		};
		return(crates);
	};

	#pitagorasCrater() {
		const crates = this.#largestCrateTrail();
		return(this.largest = { crates: crates });
	};
};
