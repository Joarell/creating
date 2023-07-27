
import ArrangerLargestCanvas from "./Arranger.largest.works.mjs";
import ArrangerNoCanvas from "./Arranger.no.canvas.mjs";
import ArrangerSameSize from "./Arranger.same.size.class.mjs";
import ArrangerStarter from "./Arranger.starter.class.mjs";


export default class Arranger {
	#list;

	constructor (list) {
		this.#list = list;
		const dataChecker =	this.#checkData();

		if(dataChecker && dataChecker.constructor.name === 'TypeError')
			return (dataChecker);
		return(this.#solver());
	};
	
	// This is the 'chain of responsibility/Factory' pattern method.
	#solver () {
		this.#start();
		this.#sameSizeTrail();
		this.#noCanvasTrail();
		this.#largestCanvasTrail();

		return(this.#list);
	};

	#checkData () {
		try {
			const check =	(val) => val.length === 0 || !val;
			const checker =	(!Array.isArray(this.#list) || check(this.#list));

			if(checker) {
				const error = `Please, provide a type of 'ArtWork' object.`
				throw new TypeError(error);
			}

			const artWork =	this.#list.map(work => {
				return (work.constructor.name === "ArtWork");
			});

			if (artWork.includes(false)) {
				const error = `Some work is not of the type 'ArtWork' object.`;
				throw new TypeError(error);
			}
		}
		catch (err) {
			return(err);
		};
	};

	#start () {
		this.#list = new ArrangerStarter(this.#list);
	};

	#sameSizeTrail () {
		this.#list = new ArrangerSameSize(this.#list);
	};

	#noCanvasTrail () {
		this.#list = new ArrangerNoCanvas(this.#list);
	};

	#largestCanvasTrail () {
		this.#list = new ArrangerLargestCanvas(this.#list);
	};
};
