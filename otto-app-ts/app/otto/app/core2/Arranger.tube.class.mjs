

export default class ArrangerTube {
	#list;

	constructor (list) {
		this.#list = list;
		return(this.#findTubesOnTheList());
	};

	#findTubesOnTheList() {
		const { noCanvas } =	this.#list;
		const tubes =			noCanvas.filter(pece => {
			const MAXDIM =	35;
			const LIMIT =	pece[2] < MAXDIM && pece[3] < MAXDIM;
			const CHECK =	pece[2] === pece[3];

			if (LIMIT && CHECK)
				if(pece[1] !== pece[2] && CHECK)
					return(pece);
			return ;
		});

		tubes.map(art => {
			this.#list.noCanvas.splice(this.#list.noCanvas.indexOf(art), 1);
		});
		this.#list.tubes = tubes;
		return (this.#list);
	};
};
