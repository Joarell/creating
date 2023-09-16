


export default class ArrangerSameSize {
	#list;

	constructor ({ sorted }) {
		this.#list = sorted
		return(this.#sameSizeTrail());
	};

	#trailOne() {
		const MAXDEPTH =	10;
		const getter =		[];
		const checker =		(a, b) => a[4] === b[4] && a[0] !== b[0];
		this.map(work => {
			let i =	0;

			if (work[2] <= MAXDEPTH)
				for(i in this)
					if (!getter.includes(this[i]) && checker(this[i], work))
						getter.push(this[i])
		});
		return(getter);
	};

	#checker(art, work) {
		const x =	work[1];
		const y =	work[3];
		const cub =	work[4];
	
		return (art[1] === x && art[3] === y && art[4] === cub);
	};

	#trailTwo(list) {
		const sameSize = [];
		list.map(work => {
			let getter =	[];
			let i =		0;

			for(i in list) {
				if (this.#checker(list[i], work) && !sameSize.includes(list[i]))
					getter.push(list[i]);	
			};
			if (getter.length >= 4)
				getter.map(element => {
					sameSize.push(element);
				});
			getter = null;
		});

		return(sameSize);
	};

	#sameSizeTrail () {
		const pathOne = this.#trailOne.call(this.#list);
		const pathTwo = this.#trailTwo(pathOne);

		pathTwo.map(art => {
			this.#list.splice(this.#list.indexOf(art), 1);
		});

		return({sorted: this.#list, sameSize: pathTwo});
	};
};
