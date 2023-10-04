

export default class CraterStandard {
	#list;
	#maxLayers;
	#backUp;

	constructor(canvas, backUp, maxLayer) {
		if(!canvas || canvas.length === 0)
			return({ standard: false});

		this.#list =		canvas;
		this.#maxLayers =	4 ?? maxLayer;
		this.#backUp =		backUp;
		return(this.#startCrate());
	}

	#startCrate() {
		const ARTS = [];

		this.#provideCrate(ARTS);
		if (!this.#backUp)
			return ({ crates :  ARTS });
		return({ crates : ARTS, backUp : JSON.parse(JSON.stringify(ARTS)) });
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

	#redefineLayerSize(axis, art, procLayer) {
		(axis[3] === 0) && (axis[2] > 0) ? axis[3] = procLayer.X1 - art[0] : 0;
		axis[5] < 0 ? axis[5] = procLayer.Y2 : 0;
	};

	#analysisReduceSpace(axis, art) {
		const X1 = axis[0];
		const Y1 = axis[2];
		const X2 = axis[3];
		const Y2 = axis[5];

		art[0] <= X2 ? axis[3] = X2 - art[0] : axis[0] = X1 - art[0];
		(art[2] <= Y2) && (axis[3] !== X2) ? axis[5] = Y2 - art[1] : 0;

		(axis[0] !== X1) && (X1 === art[0]) ? axis[2] = Y2 - art[1] : 0;
		(axis[3] === 0) && (Y1 > Y2) ? axis[2] = Y1 - art[1] : 0;

		(Y2 === 0) && (Y1 > 0) ? axis[0] = X1 - art[0] : 0;

		(axis[3] === X2) && (Y2 <= X1) ? axis[0] = X1 - art[0] : 0;
		(axis[3] === 0) && (axis[2] === Y1) ? axis[5] = Y2 - art[1] : 0;

		(axis[0] === 0) && (axis[5] > 0) ? axis[5] = Y2 - art[1] : 0;
		(axis[2] === Y1) && (axis[5] === Y2) ? axis[5] = Y2 - art[1] : 0;
		(axis[5] <= 0) && (axis[3] !== X2) ? axis[0] = X1 - art[0] : 0;

		(art[0] === X2) && (axis[2] > art[1]) ? axis[2] = Y1 - art[1] : 0;
		(art[1] === Y2) && (axis[3] === X2) ? axis[0] = X1 - art[0] : 0;
		(axis[0] === X1) && (axis[5] === 0) ? axis[0] = X1 - art[0] : 0;

		this.#redefineLayerSize(axis, art, { X1, Y1, X2, Y2 });
	};

	#shiftAxios(work, layer) {
		const CHECK1 = layer[0] >= work[1];
		const CHECK2 = layer[2] >= work[0];
		const CHECK3 = layer[3] >= work[1];
		const CHECK4 = layer[5] >= work[0];
		const CHECK5 = work[1] === layer[0] || work[0] === layer[1];

		if (CHECK5)
			return (true);
		else if (work[0] <= layer[3] / 2 && work[1] <= layer[5])
			return (false);
		return(CHECK1 && CHECK2 || CHECK3 && CHECK4 ? true : false);
	};

	#matchWorkOnLayer(x, y, layer) {
		const check1 = x <= layer[0] && y <= layer[5];
		const check2 = x <= layer[3] && y <= layer[2];
		const check3 = x <= layer[0] && y <= layer[2] && layer[3] === 0;
		const check4 = x <= layer[0] && y <= layer[2] && layer[5] === 0;

		return(check1 || check2 || check3 || check4 ? true : false);
	};

	#matchCanvasInLayer(matched, layer, len) {
		if(layer[0] === 0 && layer[2] === 0 || len < 0)
			return ;
		const SPIN =	6
		const FLIP =	2;
		let i =			0;
		let x =			this.#list[len][1];
		let y =			this.#list[len][3];

		while (i++ < FLIP) {
			if (this.#matchWorkOnLayer(x, y, layer)) {
				if (this.#shiftAxios([x, y], layer)) {
					x !== y ? i++ : false;
					[x, y] = [y, x];
				};
				this.#analysisReduceSpace(layer, [x, y]);
				if (i === 2 && this.#list[len].length < SPIN)
					this.#list[len].push(" ");
				else if (this.#list[len].lenght === SPIN)
					this.#list[len].pop();
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
		const HUGE =		this.#list.at(-1);

		if (HUGE[1] === layer[0] && HUGE[3] === layer[2]) {
			countLayer++;
			this.#setLayer.call(countLayer, crate, [HUGE]);
			this.#list.pop();
		}
		else {
			this.#list.reverse().map(art => {
				art[1] === layer[0] ? GETCANVAS.push(art) : false
			});
			GETCANVAS.map(canvas => {
				countLayer++;
				this.#setLayer.call(countLayer, crate, [canvas]);
				this.#list.splice(this.#list.indexOf(canvas), 1);
			});
		};
		return(countLayer);
	};

	#fillCrate(measure) {
		let crate =		[];
		let greb =		[];
		let checkLen =	true;
		let i =			this.#hugeCanvasFirst(crate, measure);
		let len;

		while (i++ < this.#maxLayers || checkLen && this.#list.length) {
			len = this.#list.length - 1;
			this.#matchCanvasInLayer(greb, [...measure, ...measure], len);
			if (greb.length > 0) {
				greb.map(art => this.#list.splice(this.#list.indexOf(art), 1));
				this.#setLayer.call(i, crate, greb);
				greb =		null;
				greb =		[];
			};
			checkLen =	this.#list.length === 1 && i === this.#maxLayers;
		};
		return(crate);
	};

	#checkOneCrate(list) {
		const BIGGEST =	list.at(-1);
		const CHECKER =	list.filter(art => {
			if(BIGGEST[4] >= art[4])
				return (art);
		});
		return (this.#list.length === CHECKER.length ? true : false);
	};

	// HACK: improves needed to define the best crate size 'backtrack'.
	#defineSizeBaseCrate(list) {
		const CRATE1 =	this.#checkOneCrate(list);
		const MAXX =	250;
		const MAXY =	132;
		let len =		list.length;
		let x =			0;
		let z =			0;
		let y =			0;

		if (CRATE1) {
			x = list.at(-1)[1];
			z = list.at(-1)[2];
			y = list.at(-1)[3];
		}
		else
			while(len--) {
				(x + x + list[len][1]) <= MAXX ? x += list[len][1] :
					x < list[len][1] && list[len][1] <= MAXX ? x = list[len][1]:
						list[len][1] > MAXX ? x = list[len][1] : false;

				z = list[len][2] ?? z;

				(y + y + list[len][3]) <= MAXY ? y += list[len][3]:
					y < list[len][3] && list[len][3] <= MAXY ? y = list[len][3]:
						list[len][3] > MAXY ? y = list[len][3] : false;
			};
		return([x, z, y]);
	};

	#addXandYtimes(canvas) {
		let procList = canvas.map(art => {
			art.push(art[1] * art[3])
			return(art);
		});

		procList = this.#quickSort(procList, 5);
		procList = procList.map(art => { art.pop(); return(art) });
		return(this.#list = procList);
	};

	#provideCrate(crate) {
		if (!this.#list.length)
			return ;
		this.#addXandYtimes(this.#list);
		const size =		this.#defineSizeBaseCrate(this.#list);
		const crateFilled =	this.#fillCrate(size);
		const crateDone =	this.#defineFinalSize(size, crateFilled);

		crate.push(crateDone);
		crate.push({ works: crateFilled });
		return(this.#provideCrate(crate));
	};
};
