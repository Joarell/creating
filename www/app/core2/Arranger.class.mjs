

export default class Arranger {
	#list;

	constructor (list) {
		this.#list = list;
	};

	// This is the visible method to the client.
	get solveTheList() {
		const checker = (
			!Array.isArray(this.#list) || 
			this.#list.length === 0 ||
			!this.#list
		);

		if(checker)
			return(`Please, provide a type of 'ArtWork' object.`);
		const start = this.#starter();

		return(start);
	};

	// This is the 'chain of responsibility' method.
	async #starter () {
		const solver = new Promise((resolve, reject) => {
			const artWork =	this.#list.map(work => {
				return (work.constructor.name === "ArtWork");
			});

			if (artWork.includes(false)) {
				reject(`Some work is not of the type 'ArtWork' object.`);
			}
			resolve(this.#list);
		});
		const CUBEDPOS = 4
		
		return(
			solver
			.then(addCubValueToEachWork)
			.then(list => { return({sorted: quickSort(list, CUBEDPOS) })})
			.catch(err => err)
		);
	};
};

function addCubValueToEachWork(list) {
	const cubedList = list.map(work => {
		const arrWork = work.arr();
		arrWork.push(work.cubed());

		return(arrWork);
	});

	return(cubedList);
};


function quickSort(list, pos) {
	if (list.length <= 1)
		return(list);

	const left =	[];
	const pivot =	list.splice(0, 1);
	const right =	[];
	let i =			0;

	for (i in list)
		list[i][pos] <= pivot[0][pos] ? left.push(list[i]): right.push(list[i]);
	return (quickSort(left, pos).concat(pivot, quickSort(right, pos)));
};


function sameSizeSolver (list) {
	list.test = 'test';
};

function noCanvasChecker (list) {
};

function largeCanvasChecker (list) {
};

function conventionalCrate(list) {
};

function lastCheckArranger(list) {
};
