

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

	//						x1
	//		   ╭──────────────────────────╮
	//		   │                          │
	//		   │                          │
	//		   │                          │
	//		y1 │                          │ y2
	//		   │                          │
	//		   │                          │
	//		   │                          │
	//		   ╰──────────────────────────╯
	//						x2

	#selectAxioToAddworks(work, layer, size) {
		let sizeX = work.length > 5 ? work[3] / size[0] : work[1] / size[0];
		let sizeY = work.length > 5 ? work[1] / size[2] : work[3] / size[2];
		const avlX = layer[0].x1 < 1 ? sizeX + layer[0].x1 <= 1 : 0;
		const avlY = layer[0].y1 < 1 ? sizeY + layer[0].y1 <= 1 : 0;

		return({ avlX, avlY });
	};

	#updateWorkCoordinates(art, sizeX, sizeY, layer) {
		const check1 = layer[0].x1 + sizeX <= 1;
		const check2 = layer[0].y1 + sizeY <= 1;

		if(art[1].x2 === 0) {
			check2 || !check1 && check2 ? 
				art[1].x2 += +sizeX.toFixed(2) : 0;
			art[1].y2 < 1 && check1 || !check2 ?
				art[1].y2 += +sizeY.toFixed(2) : 0;
		}
		else {
			art[1].x2 < 1 && !check1 && !check2 ?
				art[1].x2 = +(art[1].x2 + sizeX).toFixed(2) :
				check1 ? art[1].y2 = +(art[1].y2 + sizeY).toFixed(2) : 0;
			art[1].x2 > 1 ? art[1] = 1 : 0;
		};
		return(art);
	};

	#updateAllWorksCoordinates(work, layer, size) {
		const filled =		[...layer];
		const place =	this.#selectAxioToAddworks(work, layer, size);
		const LEN =			layer.length - 1;

		filled.reverse().map((art, i) => {
			if (i >= LEN)
				return ;
			let sizeX;
			let sizeY;
			const artX = art[0].length > 5 ? art[0][3] : art[0][1];
			const artY = art[0].length > 5 ? art[0][1] : art[0][3];
			
			if (place.avlX && place.avlY)
				sizeX = work.length > 5 ? work[3] / size[0] : work[1] / size[0];
			else
				sizeX = work.length > 5 ? work[3] / artX : work[1] / artX;
			if (place.avlY)
				sizeY = work.length > 5 ? work[1] / size[2] : work[3] / size[2];
			else
				sizeY = work.length > 5 ? work[1] / artY : work[3] / artY;
			this.#updateWorkCoordinates(art, sizeX, sizeY, layer);
		}, 0);
		return(layer);
	};

	#updateLayerSpace(layer, work, valX, valY) {
		const { size } =	layer[0];

		if (layer.length > 1) {
			layer[0].x1 + valX <= 1 ? layer[0].x1 = layer[0].x1 + valX : 0;
			layer[0].y1 + valY <= 1 ? layer[0].y1 = layer[0].y1 + valY : 0;
			layer[0].y1 === 1 ? layer[0].x2 = layer[0].x2 + valX : 0;
			layer[0].x1 === 1 ? layer[0].y2 = layer[0].y2 + valY : 0;
		}
		else {
			layer[0].x1 = layer[0].x1 > 0 ? layer[0].x1 + valX : valX;
			layer[0].y1 = layer[0].y1 > 0 ? layer[0].y1 + valY : valY;
			layer[0].x2 = work[3] === size[2] ? 1 : 0;
			layer[0].y2 = work[1] === size[0] ? 1 : 0;
		};
		return(layer);
	};

	#setLayerCoordinates(work, layer, { size }, pos) {
		const sizeX = work.length > 5 ? work[3] / size[0] : work[1] / size[0];
		const sizeY = work.length > 5 ? work[1] / size[2] : work[3] / size[2];
		const x1 = 1;
		const y1 = 1;
		let x2;
		let y2;

		if (layer.length > 1) {
			this.#updateAllWorksCoordinates(work, layer, size);
			x2 = sizeY + layer[pos][1].x2 === 1 ? 1 : 0;
			y2 = sizeX + layer[pos][1].y2 === 1 ? 1 : 0;
		}
		else {
			x2 = sizeY + layer[0].x2 === 1 ? 1 : 0;
			y2 = sizeX + layer[0].y2 === 1 ? 1 : 0;
		};
		this.#updateLayerSpace(layer, work, sizeX, sizeY);
		layer.push([work, { x1, y1, x2, y2 }]);
		return(layer);
	};

	#findWorksToMatchInLayer(work, layer, { size }) {
		const ICON =	`<i class="nf nf-oct-sync"></i>`;
		let workX =		work[1];
		let workY =		work[3];
		let len =		layer.length;
		let spin =		0;
		let check1;
		let check2;

		while(len-- >= 0) {
			check1 =	workX / size[0] <= 1 && workY / size[2] <= 1;
			check2 =	workX / size[0] <= 1 && workY / size[2] <= 1;
			if (check1 || check2) {
				spin === 1 ? work.push(ICON) : 0;
				return(this.#setLayerCoordinates(work, layer, layer[0]));
			};
			[workX, workY] = [workY, workX];
			spin = 1;
		};
		return(layer);
	};

	#fitSizesCheckIn(work, layer, flip) {
		const { size, x1, y1, x2 } =	layer[0];
		let workX =						work[1];
		let workY =						work[3];
		let check1 =					false;
		let check2 =					false;
		let check3 =					false;
		let check4 =					false;
		let i =							layer.length;
		let height;

		flip === 1 ? [workX, workY] = [workY, workX] : 0;
		workX /= size[0];
		workY /= size[2];
		while (i-- > 1) {
			height = layer[i][0].length > 5 ? layer[i][0][1] : layer[i][0][3];
			check1 = layer[i][1].y2 >= workY && x1 + workX <= 1;
			!check1 ?  check2 = y1 + workY <= 1 && x2 + workX <= 1 : i = 0;
			!check2 ? check3 = y1 + workY <= 1 && x1 + workX <= 1 : i = 0;
			!check3 ? check4 = height >= work[3] && layer.length > 2 : i = 0;
			check4 ? i = 0 : 0;
		};
		return(check1 || check2 || check3 || check4 ? true : false);
	};

	#metchCloseWorkOnLayer(work, layer) {
		const ICON =	`<i class="nf nf-oct-sync"></i>`;
		let len =		layer.length;
		let spin =		0;

		if (layer.length === 1)
			return(this.#findWorksToMatchInLayer(work, layer, layer[0]));
		while(len-- > 1) {
			if (this.#fitSizesCheckIn(work, layer, spin)) {
				work.length === 6 ? work.pop() : 0;
				spin === 1 ? work.push(ICON) : 0;
				return(this.#setLayerCoordinates(work, layer, layer[0], len));
			};
			spin === 0 ? spin = 1 : spin = 0;
			spin === 1 ? len++ : 0;
		};
		return(layer);
	};

	#matchCanvasInLayer(matched, layer, len) {
		const { x1, y1, x2, y2 } = layer[0];
		const emptyLayer = (x1 === 1 && y1 === 1 && x2 === 1 && y2 === 1);

		if(emptyLayer || len < 0) {
			layer.map((work, i) => i > 0 ? matched.push(work[0]) : 0 , 0);
			return ;
		}
		this.#metchCloseWorkOnLayer(this.#list[len], layer, layer[0]);
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
		let innerCrate;

		while (i++ < this.#maxLayers || checkLen && this.#list.length) {
			innerCrate = { size : measure, x1 : 0, y1 : 0, x2 : 0, y2 : 0 };
			len = this.#list.length - 1;
			this.#matchCanvasInLayer(greb, [innerCrate], len);
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

	// HACK: improvement necessary to define the best crate size 'backtrack'.
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
