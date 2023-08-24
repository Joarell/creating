
export default class CraterTube {
	#tubes;

	constructor(list) {
		if(!list || list.length === 0) 
			return({ tube : false });

		this.#tubes = list;
		return(this.#crateMaker());
	};

	#crateMaker() {
		this.#possibleCrates();
		return (this.#tubes);
	};

	#sizeComposer(){
		let X = this[0][1];
		let Z = this[0][2];
		let Y = this[0][3];
		
		this.map(tube => {
			X = tube[1] > X ? tube[1]: X;
			Z = tube[2] > Z ? tube[2]: Z;
			Y = tube[3] > Y ? tube[3]: Y;
		});

		return([X, Z, Y]);
	}

	#setPaddings(pad, highPad) {
		const X = this[0] + pad;
		const Z = this[1] + pad;
		const Y = this[2] + highPad;

		return([X, Z, Y]);
	};

	#oneTubeCrate() {
		const DEFAULTPAD =	23;
		const HEIGHTPAD =	25;
		const X =			this[0][1] + DEFAULTPAD;
		const Z =			this[0][2] + DEFAULTPAD;
		const Y =			this[0][3] + HEIGHTPAD;

		return ([X, Z, Y]);
	};

	#tubeCrate(works, content) {
		const DEFAULTPAD =	18;
		const HEIGHTPAD =	25 * content;
		const baseSize =	this.#sizeComposer.call(works);

		return (this.#setPaddings.call(baseSize, DEFAULTPAD, HEIGHTPAD));
	};

	#interfaceCrates(opt, list) {
		switch(opt) {
			case 1:
				return(this.#oneTubeCrate.call(list));
			case 2:
				return(this.#tubeCrate(list, 2));
			case 3:
				return(this.#tubeCrate(list, 3));
			case 4:
				return(this.#tubeCrate(list, 4));
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
		const DIAMETER =	40;
		const getter =		this.#tubes.filter(tube => {
			if (tube[2] > DIAMETER)
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
			crates.push(this.#interfaceCrates(reduce.length, reduce));
			crates.push({ works: reduce });
		};
		if (this.#tubes.length >= 1) {
			crates.push(this.#interfaceCrates(this.#tubes.length, this.#tubes));
			crates.push({ works: this.#tubes });
		};
		return(this.#tubes = { crates: crates });
	};
};


