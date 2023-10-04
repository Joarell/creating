

export default class ArrangerTube {
	#list;

	constructor (list) {
		this.#list = list;
		return(this.#findTubesOnTheList());
	};

	#findTubesOnTheList() {
		const { noCanvas } =	this.#list;
		const tubes =			noCanvas.filter(pece => {
			if(pece[1] !== pece[2] && pece[2] === pece[3])
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
