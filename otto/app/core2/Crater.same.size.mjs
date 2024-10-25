

export default class CraterSameSize {
	#peces;

	constructor(list) {
		if(!list || list.length === 0)
			return({ sameSize: false});

		this.#peces = list;
		return (this.#startCrateTrail());
	};

	#setPad(innerCrate) {
		const PAD =			23;
		const HIGHPAD =		28;
		const LAYERPAD =	2;
		const X =			innerCrate[0] + PAD;
		const Z =			innerCrate[1] + LAYERPAD;
		const Y =			innerCrate[2] + HIGHPAD;

		return([X, Z, Y]);
	};

	#checkComp(getter, test, baseLayer) {
		const checker =	getter.map(value => {
			const checkX = (value[0] + test[0]) <= baseLayer[0];
			const checkZ = (value[1] + test[1]) <= baseLayer[1];
			const checkY = (value[2] + test[2]) <= baseLayer[2];

			if (checkX && checkZ && checkY)
				return (value);
			return
		});

		if(checker[0] !== undefined)
			checker.map(size => getter.splice(getter.indexOf(size), 1));
		return(checker[0] !== undefined);
	};

	#composeLayer(baseSize, list) {
		const PACKAGECM =	10;
		let getter =		[];
		const compLayer =	list.map(size => {
			const X =		size[0] === baseSize[0][0];
			const Y =		size[2] === baseSize[0][2];
			const secondX = size[0] === (baseSize[0][0] - PACKAGECM);
			const secondY = size[2] === (baseSize[0][2] - PACKAGECM);

			if (X && Y || secondX && secondY)
				return(size);
			if (getter.length > 0) {
				if (this.#checkComp(getter, size, baseSize))
					return(size);
			}
			else
				getter.push(size);
		});
		return (compLayer[0] !== undefined);
	};

	#orderSizes(base, art) {
		const STACK =		base.shift();
		const PACKAGECM =	5;
		const LEN =			art.length === 1 ? art[0].length : art.length;
		let DEPTH;
		let x;
		let z;
		let y;

		if (STACK) {
			DEPTH =	(LEN % 2) + (LEN / 2);
			x =		base[0];
			z =		DEPTH * PACKAGECM;
			y =		base[2];
		}
		else {
			DEPTH =	(LEN % 2) + LEN;
			x =		base[0];
			z =		DEPTH * PACKAGECM;
			y =		base[2];
		};
		return (this.#setPad([x, z, y], STACK));
	};

	#sizeStacking(base, newBase) {
		const extraSizes =	newBase.length > 3 ?
			[
				newBase[0][1],
				newBase[0][2],
				newBase[0][3],
			]:
			newBase;
		const LIMIT =	132;
		let x =			base[0];
		let z =			base[1];
		let y =			base[2] + extraSizes[2];
		let stack =		false;

		if (y > LIMIT && x < LIMIT) {
			[y, x] =	[x, y];
			stack =		true;
		}
		else if (y > base[2])
			stack =		true;
		return ([stack, [x, z, y]]);
	};

	#solveList(list) {
		const LIMITWORKS =	10;
		let comp;
		let baseCrate =	list.splice(0, 1).flat();
		let works =		list.splice(0, 1).flat();

		list.length > 0 ? comp = this.#composeLayer(baseCrate, list): false;
		if(comp) {
			baseCrate =	this.#sizeStacking(baseCrate, list.splice(0, 1));
			list[0].map(val => works[0][0].push(val));
			list.splice(0, list[0].length);
		}
		else {
			if(works[0].length > LIMITWORKS && (works[0].length % 2) === 0)
				baseCrate =	this.#sizeStacking(baseCrate, works[0]);
			else
				baseCrate.unshift(false);
		};
		Array.isArray(works[0][0]) ? works = works.flat() : false;
		return ({ crate: this.#orderSizes(baseCrate.flat(), works), works });
	};

	#compCrate(list) {
		const crate = [];
		let solver;

		while (list.length) {
			solver = this.#solveList(list);
			crate.push(solver.crate);
			crate.push({ works: solver.works });
		};
		return (crate);
	};

	#countWorks () {
		const MAXDEPTH =	10;
		let x =				this.#peces[0][1];
		let z =				this.#peces[0][2];
		let y =				this.#peces[0][3];
		let sizes =			[[x, z, y]];
		let works =			[];

		this.#peces.map(work => {
			if (work[2] <= MAXDEPTH) {
				if(work[1] !== x && work[3] !== y) {
					sizes.push([works]);
					x =	work[1];
					z =	work[2];
					y =	work[3];
					sizes.push([x, z, y]);
					works =	[];
				};
				works.push(work);
			};
		});
		sizes.push(works);
		return (sizes[1][0].length >= 4 ? sizes : null);
	};

	#startCrateTrail () {
		let countDiffSizes =	this.#countWorks();
		if (countDiffSizes === null)
			return(null);
		const crateDone =		this.#compCrate(countDiffSizes);

		countDiffSizes =		null;
		//console.log(crateDone)
		return ({ crates : crateDone, backUp : structuredClone(crateDone) });
	};
};
