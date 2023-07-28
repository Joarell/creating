
import ArrangerLargestCanvas from "./Arranger.largest.works.mjs";
import ArrangerNoCanvas from "./Arranger.no.canvas.mjs";
import ArrangerSameSize from "./Arranger.same.size.class.mjs";
import ArrangerStarter from "./Arranger.starter.class.mjs";
import ArrangerTube from "./Arranger.tube.class.mjs";


export default class Arranger {
	#works;

	constructor (list) {
		this.#works = list;
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
		this.#findTubes();
		const finished = { list: this.#works };

		return(finished);
	};

	#checkData () {
		try {
			const check =	(val) => val.length === 0 || !val;
			const checker =	(!Array.isArray(this.#works) || check(this.#works));

			if(checker) {
				const error = `Please, provide a type of 'ArtWork' object.`
				throw new TypeError(error);
			}

			const artWork =	this.#works.map(work => {
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
		this.#works = new ArrangerStarter(this.#works);
	};

	#sameSizeTrail () {
		this.#works = new ArrangerSameSize(this.#works);
	};

	#noCanvasTrail () {
		this.#works = new ArrangerNoCanvas(this.#works);
	};

	#largestCanvasTrail () {
		this.#works = new ArrangerLargestCanvas(this.#works);
	};

	#findTubes () {
		this.#works = new ArrangerTube(this.#works);
	};
};
