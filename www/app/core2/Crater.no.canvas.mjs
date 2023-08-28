

export default class CraterNotCanvas {
	#peces;

	constructor (list) {
		// console.log('NoCanvas:', list);
		if(!list || list.length === 0)
			return({ noCanvas: false});
		this.#peces = list;
		return (this.#noCanvasTrail());
	};

	#setPadding(innerCrate) {
		const PAD =		23;
		const HIGHPAD =	28;
		const X =		innerCrate[0] + PAD;
		const Z =		innerCrate[1] + PAD;
		const Y =		innerCrate[2] + HIGHPAD;

		return ([X, Z, Y]);
	};

	#defCrate(peces) {
		const LENLIMIT =	277;
		const PAD =			peces.length * 10;
		let x =				PAD;
		let z =				0;
		let y =				0;

		peces.map(item => {
			x +=	item[1];
			z =		item[2] > z ? item[2] : z;
			y =		item[3] > y ? item[3] : y;
		});
		if (x > LENLIMIT && peces.length % 2 === 0) {
			x /= 2;
			z *= 2;
		};
		return (this.#setPadding([x, z, y]));
	};

	#validationComp(val1, val2) {
		const MAXLEN =		277;
		const MAXDEPTH =	177;
		const MAXHEIGHT =	132;
		const compareX =	val1[1] === val2[1] && val1[1] < MAXLEN;
		const compareZ =	val1[2] === val2[2] && val1[2] < MAXDEPTH;
		const compareY =	val1[3] <= MAXHEIGHT;

		return (compareX && compareZ && compareY ? true : false);
	};

	#validationSizes(x, z, equals, items) {
		const PAD =			10;
		const MAXLEN =		554;
		const MAXDEPTH =	177;

		if (x < MAXLEN && z < MAXDEPTH)
			return(items.length);
		else if(items.length % 2 === 0) {
			if(x > MAXLEN && (z * 2) + PAD < MAXDEPTH)
				return (items.length);
			return(~~(MAXLEN / x * items.length));
		};
		return (equals === 0 || items[0][1] > MAXLEN ? 1 : equals);
	};

	//returns how many works to put in side the crate.
	#defineMaxPeces(items) {
		const PAD =			10;
		let x =				PAD * items.length;
		let z =				0;
		let equals =		0;

		items.map(art => {
			const compare =	this.#validationComp(art, items[0]);
			const bool1 =	art[2] - items[0][2];
			const bool2 =	items[0][2] - art[2];
			
			if (compare === true)
				equals++;
			else if((bool1 > 0 && bool1 <= PAD) || (bool2 > 0 && bool2 <= PAD))
				equals++;
			x += art[1];
			z += art[3];
		});
		return (this.#validationSizes(x, z, equals, items));
	};

	#noCanvasTrail(){
		const crate =	[];
		let peces;

		while(this.#peces.length) {
			peces =		this.#defineMaxPeces(this.#peces);
			peces =		this.#peces.splice(0, peces);
			if (peces.length > 0) {
				crate.push(this.#defCrate(peces));
				crate.push({ works: peces });
			}
			else {
				crate.push(this.#defCrate(this.#peces.splice(0, 1)));
				crate.push({ works: peces });
			};
		};
		return ({ crates: crate});
	};
};
