

export default class ArrangerNoCanvas {
	#peces;

	constructor (list) {
		this.#peces = list;
		return(this.#noCanvas());
	};

	#removePeces (peces) {
		peces.map(element => {
			this.sorted.splice(this.sorted.indexOf(element), 1);
		});
	};

	#noCanvasOut () {
		let { 
			sorted, 
			sameSize 
		} =					this.#peces;
		const MAXDEPTH =	10;
		let checkerOne =	sorted.filter(pece => pece[2] > MAXDEPTH);
		let checkerTwo =	sameSize.filter(pece => pece[2] > MAXDEPTH);
		let found =			[];

		checkerOne.map(pece => found.push(pece));
		this.#removePeces.call(this.#peces, checkerOne);
		checkerTwo.map(pece => found.push(pece));
		this.#removePeces.call(this.#peces, checkerTwo);

		sorted =		null;
		sameSize =		null;
		checkerOne =	null;
		checkerTwo =	null;
		this.#peces.noCanvas = found;
		return(this.#peces);
	};

	#noCanvas () {
		const filtered = this.#noCanvasOut();
		return (filtered);
	};
};
