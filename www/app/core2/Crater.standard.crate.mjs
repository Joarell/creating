

export default class CraterStandard {
	#list;
	#maxLayers;

	constructor(canvas, maxLayer) {
		if(!canvas)
			return({ standard: false});

		this.#list =		canvas;
		this.#maxLayers =	maxLayer;
		return(this.#startCrate());
	}

	#startCrate() {
		const INNERCRATE =	[];
		let crate;

		this.#provideCrate(INNERCRATE);
		crate =			{ crates : INNERCRATE };
		return(crate);
	};

	#defineFinalSize(innerSize, works) {
		const DEFAULTPAD =	23;
		const HIGHPAD =		28;
		const LAYERPAD =	10;
		const X =			innerSize[0] + DEFAULTPAD;
		const Y =			innerSize[2] + HIGHPAD;
		let z =				works.length * LAYERPAD + DEFAULTPAD;
		let i =				0;
		let tmp =			0;

		for (i in works) {
			Object.entries(works[i]).map(canvas => {
				canvas[1].map(art => {
					art[2] > tmp ? tmp = art[2] : false;
				});
				z +=	tmp;
				tmp =	0;
			});
		};
		return([X, z, Y]);
	};

	//					 axis[0]
	//		   ╭──────────────────────────╮
	//		   │                          │
	//		   │                          │
	//		   │                          │
	// axis[5] │                          │ axis[2]
	//		   │                          │
	//		   │                          │
	//		   │                          │
	//		   ╰──────────────────────────╯
	//					 axis[3]

	#analysisReduceSpace(axis, art) {
		const X1 = axis[0];
		const Y1 = axis[2];
		const X2 = axis[3];
		const Y2 = axis[5];

		art[0] <= X2 ? axis[3] = X2 - art[0] : false;
		(art[2] <= Y2) && (axis[3] !== X2) ? axis[5] = Y2 - art[1] : false;

		(axis[0] !== X1) && (X1 === art[0]) ? axis[2] = Y2 - art[1] : false;
		(axis[3] === 0) && (Y1 > Y2) ? axis[2] = Y1 - art[1] : false;

		(Y2 === 0) && (Y1 > 0) ? axis[0] = X1 - art[0] : false;

		(axis[3] === X2) && (Y2 <= X1) ?
			axis[0] = X1 - art[0] :
			axis[5] = Y2 - art[1];

		(axis[0] !== X1) && (axis[0] <= axis[3]) ? axis[5] = Y2 - art[1] : false;

		art[0] === X2 ? axis[2] = Y1 - art[1] : false;
		art[1] === Y2 ? axis[0] = X1 - art[0] : false;
	};

	#matchCanvasInLayer(matched, layer, len) {
		if(layer[0] === 0 && layer[2] === 0 || len < 0)
			return ;
		let i =		0;
		let x =		this.#list[len][1];
		let y =		this.#list[len][3];
		let check1;
		let check2;
		let check3;

		while (i++ < 2) {
			check1 = x <= layer[0] && y <= layer[5];
			check2 = x <= layer[3] && y <= layer[2];
			check3 = x <= layer[0] && y <= layer[2] && layer[3] === 0;

			if (check1 || check2 || check3) {
				this.#analysisReduceSpace(layer, [x, y]);
				i === 2 ? this.#list[len].push("") : false;
				matched.push(this.#list[len]);
				return (this.#matchCanvasInLayer(matched, layer, len - 1));
			};
			[x, y] = [y, x];
		};
		return (this.#matchCanvasInLayer(matched, layer, len - 1));
	};

	#setLayer(crate, works) {
		switch(this) {
			case 1:
				crate.unshift({ layer1 : works });
				break ;
			case 2:
				crate.push({ layer2 : works });
				break ;
			case 3:
				crate.push({ layer3 : works });
				break ;
			case 4:
				crate.push({ layer4 : works });
				break ;
			case 5:
				crate.push({ layer5 : works });
				break ;
			default:
				return ;
		};
	};

	#hugeCanvasFirst(crate, layer) {
		let countLayer =	0;
		const GETCANVAS =	[];

		this.#list.map(art => art[1] === layer[0] ? GETCANVAS.push(art) : false);
		GETCANVAS.map(canvas => {
			countLayer++;
			this.#setLayer.call(countLayer, crate, [canvas]);
			this.#list.splice(this.#list.indexOf(canvas), 1);
		});
		return(countLayer);
	};

	#fillCrate(measure) {
		const MAXLAYER =	this.#maxLayers ?? 4;
		let crate =			[];
		let greb =			[];
		let checkLen =		true;
		let i =				this.#hugeCanvasFirst(crate, measure);
		let len;

		while (i++ < MAXLAYER || checkLen && this.#list.length){
			len = this.#list.length - 1;
			this.#matchCanvasInLayer(greb, [...measure, ...measure], len);
			greb.map(art => this.#list.splice(this.#list.indexOf(art), 1));
			this.#setLayer.call(i, crate, greb);
			greb =		null;
			greb =		[];
			checkLen =	this.#list.length === 1 && i === MAXLAYER;
		};
		return(crate);
	};

	#defineSizeBaseCrate() {
		const MAXX =	250;
		const MAXY =	132;
		let len =		this.length;
		let x =			0;
		let z =			0;
		let y =			0;

		while(len--) {
			(x + x + this[len][1]) <= MAXX ? x += this[len][1]: 
				x < this[len][1] && this[len][1] <= MAXX ? x = this[len][1]:
					this[len][1] > MAXX ? x = this[len][1] : false;
			
			z = this[len][2] ?? z;

			(y + y + this[len][3]) <= MAXY ? y += this[len][3]: 
				y < this[len][3] && this[len][3] <= MAXY ? y = this[len][3]:
					this[len][3] > MAXY ? y = this[len][3] : false;
		};
		return([x, z, y]);
	};

	#provideCrate(crate) {
		if (!this.#list.length)
			return ;
		const size =		this.#defineSizeBaseCrate.call(this.#list);
		const crateFilled =	this.#fillCrate(size);
		const crateDone =	this.#defineFinalSize(size, crateFilled);

		crate.push(crateDone);
		crate.push({ works: crateFilled });
		return(this.#provideCrate(crate));
	};
};
