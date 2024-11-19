
export default class CraterTube {
	#tubes;
	#DIAMETER

	constructor(list) {
		if(!list || list.length === 0)
			return({ tube : false });

		this.#tubes =		list;
		this.#DIAMETER =	35;
		const checker =		this.#tubes.filter(item => {
			return(item[2] < this.#DIAMETER ? item : false);
		})
		const works =		checker.find(data => data !== false);

		if (!works)
			return ({ tube: false });
		return(this.#crateMaker());
	};

	#crateMaker() {
		this.#possibleCrates();
		return (this.#tubes);
	};

	#sizeComposer(){
		let x = this[0][1];
		let z = this[0][2];
		let y = 0;

		this.map(tube => {
			x = tube[1] > x ? tube[1]: x;
			z = tube[2] > z ? tube[2]: z;
			y += tube[3];
		});
		return([x, z, y]);
	}

	#setPaddings(pad, highPad) {
		const X = this[0] + pad;
		const Z = this[1] + pad;
		const Y = this[2] + highPad;

		return([X, Z, Y]);
	};

	#oneTubeCrate() {
		const DEFAULTPAD =	18;
		const HEIGHTPAD =	25;
		const X =			this[0][1] + DEFAULTPAD;
		const Z =			this[0][2] + DEFAULTPAD;
		const Y =			this[0][3] + HEIGHTPAD;

		return ([X, Z, Y]);
	};

	#tubeCrate(works) {
		const DEFAULTPAD =	18;
		const HEIGHTPAD =	25;
		const baseSize =	this.#sizeComposer.call(works);

		return (this.#setPaddings.call(baseSize, DEFAULTPAD, HEIGHTPAD));
	};

	#interfaceCrates(list) {
		switch(list.length) {
			case 1:
				return(this.#oneTubeCrate.call(list));
			case 2:
				return(this.#tubeCrate(list));
			case 3:
				return(this.#tubeCrate(list));
			case 4:
				return(this.#tubeCrate(list));
		};
	};

	#hugeTubes(tubes) {
		const result =		[];
		const MAXCONTENT =	3;
		let getter;

		while(tubes.length >= MAXCONTENT) {
			getter = tubes.splice(0, MAXCONTENT);
			result.push(this.#interfaceCrates(getter.length, getter));
			result.push({ works: getter });
		};
		return (result);
	};

	#checkHugeTubes() {
		const getter =		this.#tubes.filter(tube => {
			if (tube[2] > this.#DIAMETER)
				return (tube);
			return ;
		});
		getter.map(roll => {
			this.#tubes.splice(this.#tubes.indexOf(roll), 1);
		});
		return (getter);
	};

	#possibleCrates() {
		let reduce =		[];
		let crates =		[];
		const MAXCONTENT =	3;
		const biggest =		this.#checkHugeTubes();

		if (biggest.length > 0 || biggest.length > MAXCONTENT)
			crates.push(this.#hugeTubes(biggest));

		while(this.#tubes.length) {
			reduce = this.#tubes.splice(0, MAXCONTENT);
			crates.push(this.#interfaceCrates(reduce));
			crates.push({ works: reduce });
		};
		if (this.#tubes.length >= 1) {
			crates.push(this.#interfaceCrates(this.#tubes.length, this.#tubes));
			crates.push({ works: this.#tubes });
		};
		return(this.#tubes = { crates });
	};
};
