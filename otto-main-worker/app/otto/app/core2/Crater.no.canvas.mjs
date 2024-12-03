

export default class CraterNotCanvas {
	#peces;

	constructor (list) {
		if(!list || list.length === 0)
			return({ noCanvas: false});
		this.#peces = list;
		return (this.#noCanvasTrail());
	};

	#quickSort(arts, pos) {
		if (arts.length <= 1)
			return(arts);

		const left =	[];
		const pivot =	arts.splice(0, 1);
		const right =	[];

		arts.map(work => {
			work[pos] <= pivot[0][pos] ? left.push(work) : right.push(work);
		});
		return(this.#quickSort(left, pos).concat(pivot, this.#quickSort(right, pos)));
	};

	#setPadding(innerCrate) {
		const PAD =		20;
		const HIGHPAD =	28;
		const X =		innerCrate[0] + PAD;
		const Z =		innerCrate[1] + PAD;
		const Y =		innerCrate[2] + HIGHPAD;

		return ([X, Z, Y]);
	};

	#splitCrate(works) {
		let x =		0;
		let z =		0;
		let newX =	0;
		let newZ =	0;
		let aux;

		aux = works.length / 2;
		works.map(item => {
			if (aux-- > 0) {
				x += item[1];
				z < item[2] ? z = item[2] : false;
			}
			newX = item[1];
			newZ < item[2] ? newZ = item[2] : false;
		});
		newX > x ? true : newX = x;
		newZ += z;
		return ({ newX, newZ });
	}

	#defCrate(peces) {
		const LENLIMIT =	277;
		const SPLIT =		peces.length > 4 && peces.length % 2 === 0;
		let x =				0;
		let z =				0;
		let y =				0;
		let split;

		peces.map(item => {
			x +=	item[1];
			z =		item[2] > z ? item[2] : z;
			y =		item[3] > y ? item[3] : y;
		});
		if (x > LENLIMIT || SPLIT) {
			split = this.#splitCrate(peces);
			x = split.newX;
			z = split.newZ;
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

		if(items.length % 2 === 0)
			if(x > MAXLEN && (z * 2) + PAD < MAXDEPTH)
				return (items.length);
		return (equals === 0 || items[0][1] > MAXLEN ? 1 : equals);
	};

	//returns how many works to put in side the crate.
	#defineMaxPeces(items) {
		const PAD =		10;
		let x =			PAD * items.length;
		let z =			0;
		let equals =	0;
		const workRef =	items[0];

		items.map(art => {
			const compare =	this.#validationComp(art, workRef);
			const bool1 =	art[2] - workRef[2];
			const bool2 =	workRef[2] - art[2];
			const check =	bool1 > 0 && bool1 <= PAD || bool2 > 0 && bool2 <= PAD;

			if (compare === true || check) {
				equals++;
				x += art[1];
				z += art[3];
			};
		});
		return (this.#validationSizes(x, z, equals, items));
	};

	#addXandZtimes(canvas) {
		if (!Array.isArray(canvas))
			return (canvas);
		let procList = canvas.map(art => {
			art.push(art[1] * art[2])
			return(art);
		});

		procList = this.#quickSort(procList, 5);
		procList = procList.map(art => { art.pop(); return(art) });
		return(this.#peces = procList);
	};

	#noCanvasTrail(){
		const crate =	[];
		let peces;

		this.#addXandZtimes(this.#peces);
		while(this.#peces.length > 0) {
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
		return ({ crates: crate });
	};
};
