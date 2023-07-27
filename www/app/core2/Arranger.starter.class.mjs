

export default class ArrangerStarter {
	#list;

	constructor (works) {
		this.#list = works;
		return(this.#starter());
	};

	#addCubValueToEachWork() {
		const cubedList = this.#list.map(work => {
			const arrWork = work.arr();
			arrWork.push(work.cubed());

			return(arrWork);
		});

		return(cubedList);
	};

	#quickSort(list, pos) {
		if (list.length <= 1)
			return(list);

		const left =	[];
		const pivot =	list.splice(0, 1);
		const right =	[];
		let i =			0;

		for (i in list)
			list[i][pos] <= pivot[0][pos] ? 
				left.push(list[i]):
				right.push(list[i]);
		
		return (
			this.#quickSort(left, pos)
			.concat(pivot, this.#quickSort(right, pos))
		);
	};

	#starter() {
		const arrCubedList =	this.#addCubValueToEachWork();
		const CUBEDPOS =		4
		const sorted =			this.#quickSort(arrCubedList, CUBEDPOS);

		return({ sorted });
	};
};
