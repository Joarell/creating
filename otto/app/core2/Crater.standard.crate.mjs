

export default class CraterStandard {
	#list;
	#maxLayers;
	#backUp;

	constructor(canvas, backUp, maxLayer) {
		if(!canvas || canvas.length === 0)
			return({ standard: false});

		this.#list =		canvas;
		this.#maxLayers =	maxLayer ?? 4;
		this.#backUp =		backUp;
		return(this.#startCrate());
	}

	#startCrate() {
		const ARTS = [];

		this.#provideCrate(ARTS);
		if (!this.#backUp)
			return ({ crates : ARTS });
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

	#selectAxioToAddWorks(work, layer, size) {
		let sizeX =		work.length > 5 ? work[3] / size[0] : work[1] / size[0];
		let sizeY =		work.length > 5 ? work[1] / size[2] : work[3] / size[2];
		const avlX1 =	layer[0].x1 < 1 ? sizeX + layer[0].x1 <= 1 : false;
		const avlY1 =	layer[0].y1 < 1 ? sizeY + layer[0].y1 <= 1 : false;
		const avlX2 =	layer[0].x2 < 1 ? sizeX + layer[0].x2 <= 1 : false;
		const avlY2 =	layer[0].y2 < 1 ? sizeY + layer[0].y2 <= 1 : false;

		return({ avlX1, avlY1, avlX2, avlY2 });
	};

	#innerCheckerPlace(art, base, baseSize, layer) {
		const { size } =	layer[0];
		const decX =		+(art.valX / baseSize.artX + base.x2).toFixed(2);
		const decY =		+(art.valY / baseSize.artY + base.y2).toFixed(2);
		const checkX2 =		base.x2 < 1 && baseSize.artY + art.valY <= size[2];
		const checkY2 =		base.y2 < 1 && baseSize.artX + art.valX <= size[0];
		let x;
		let y;

		if (checkX2) {
			decX <= 1 ?
				x = true :
				x = baseSize.artX * base.x2 + art.valX <= size[0];
		}
		else
			x = false;
		if (checkY2) {
			decY <= 1 ?
				y = true :
				y = baseSize.artX * base.y2 + art.valY <= size[2];
		}
		else
			y = false;
		return ({ x, y });
	};

	#updateBaseWork(work, base, layerSpace, ref, layerSize) {
		const axioX = !layerSpace.avlX1 && layerSpace.avlY1 && layerSpace.avlY2;
		const axioY = !layerSpace.avlY1 && layerSpace.avlX1 && layerSpace.avlX2;
		const inner = this.#innerCheckerPlace(work, base, ref, layerSize);

		if(axioX || inner.x)
			base.x2 = +(work.valX / ref.artX + base.x2).toFixed(2);
		else if(axioY || inner.y)
			base.y2 = +(work.valY / ref.artY + base.y2).toFixed(2);
		return(base);
	};

	#prevLocationWork(lastWork, refWork, layer) {
		const X = refWork.refX + lastWork.closeX <= layer[0].size[0];
		const Y = refWork.refY + lastWork.closeY <= layer[0].size[2];

		return({ X, Y });
	};

	#updateAdjacentWork(work, closeArt, layer, ref) {
		if(ref !== closeArt[1].prev)
			return(closeArt);
		const { size } =	layer[0];
		const { length } =	closeArt[0];
		const refX =		layer[ref][0].length > 5 ? layer[ref][0][3] : layer[ref][0][1];
		const refY =		layer[ref][0].length > 5 ? layer[ref][0][1] : layer[ref][0][3];
		const closeX =		length > 5 ? closeArt[0][3] : closeArt[0][1];
		const closeY =		length > 5 ? closeArt[0][1] : closeArt[0][3];
		const axioX =		refX + work.valX <= size[0];
		const axioY =		refY + work.valY <= size[2];
		const lastPlace =	this.#prevLocationWork({closeX, closeY}, {refX, refY}, layer);

		if(axioX) {
			if (lastPlace.X)
				work.valX / layer[0].size[0] <= layer[0].x1 ?
				closeArt[1].x2 += +(work.valX / closeX).toFixed(2) : 0;
		}
		else {
			if (lastPlace.Y && axioY)
				work.valY / layer[0].size[2] <= layer[0].y1 ?
				closeArt[1].y2 += +(work.valY / closeY).toFixed(2) : 0;
		};
		return(layer);
	};

	#updateClosestWorks(work, layer, size, ref) {
		const filled =		[...layer];
		const LEN =			layer.length - 1;
		const checkLayer =	this.#selectAxioToAddWorks(work, layer, size);

		filled.reverse().map((art, i) => {
			if (i >= LEN)
				return ;
			const artX =		art[0].length > 5 ? art[0][3] : art[0][1];
			const artY =		art[0].length > 5 ? art[0][1] : art[0][3];
			const valX =		work.length > 5 ? work[3] : work[1];
			const valY =		work.length > 5 ? work[1] : work[3];
			const { prev } =	art[1];
			
			if (prev !== ref) {
				art[0][0] === layer[ref][0][0] ? this.#updateBaseWork(
					{valX, valY}, layer[ref][1], checkLayer, {artX, artY}, layer) : 0;
				return ;
			};
			this.#updateAdjacentWork({valX, valY}, art, layer, ref);
		}, 0);
		return(layer);
	};

	#updateLayerSpace(layer, work, decX, decY, ref) {
		const { size } =	layer[0];

		if (layer.length > 1) {
			const artX =	layer[ref][0].length > 5 ? layer[ref][0][3] : layer[ref][0][1];
			const artY =	layer[ref][0].length > 5 ? layer[ref][0][1] : layer[ref][0][3];
			const valX =	work.length > 5 ? work[3] : work[1];
			const valY =	work.length > 5 ? work[1] : work[3];
			const innerX =	valX + artX === size[0];
			const innerY =	valY + artY === size[2];

			layer[0].x1 + decX <= 1 ? layer[0].x1 = +(layer[0].x1 + decX).toFixed(2) : 0;
			layer[0].y1 + decY <= 1 ? layer[0].y1 = +(layer[0].y1 + decY).toFixed(2) : 0;
			innerY ? layer[0].x2 = layer[0].x2 + decX : 0;
			innerX ? layer[0].y2 = layer[0].y2 + decY : 0;
		}
		else {
			layer[0].x1 = layer[0].x1 !== 0 ? layer[0].x1 + decX : decX;
			layer[0].y1 = layer[0].y1 !== 0 ? layer[0].y1 + decY : decY;
			layer[0].x2 = work[3] === size[2] ? 1 : 0;
			layer[0].y2 = work[1] === size[0] ? 1 : 0;
		};
		return(layer);
	};

	#addNewWorkSetupAndLayerUpdate(work, layer, { size }, prev) {
		const sizeX = work.length > 5 ?
			+(work[3] / size[0]).toFixed(2) :
			+(work[1] / size[0]).toFixed(2);
		const sizeY = work.length > 5 ?
			+(work[1] / size[2]).toFixed(2) :
			+(work[3] / size[2]).toFixed(2);
		const x1 = 1;
		const y1 = 1;
		let x2;
		let y2;

		if (layer.length > 1) {
			this.#updateClosestWorks(work, layer, size, prev);
			y2 = sizeX + layer[0].x1 === 1 ? 1 : 0;
			x2 = sizeY + layer[0].y1 === 1 ? 1 : 0;
		}
		else {
			y2 = sizeX + layer[0].x2 === 1 ? 1 : 0;
			x2 = sizeY + layer[0].y2 === 1 ? 1 : 0;
		};
		this.#updateLayerSpace(layer, work, sizeX, sizeY, prev);
		layer.push([work, { x1, y1, x2, y2, prev }]);
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
				work.length >= 6 ? work.pop() : 0;
				spin === 1 && work.length === 5 ? work.push(ICON) : 0;
				return(this.#addNewWorkSetupAndLayerUpdate(work, layer, layer[0]));
			};
			[workX, workY] = [workY, workX];
			spin = 1;
		};
		return(layer);
	};

	#checkPrevAvailableSpace(art, layer, i) {
		const { prev } =	layer[i][1];
		if (!prev)
			return(false);
		const { x1, y1 } =	layer[0];
		const { x2, y2 } =	layer[prev][1];
		let place;

		place = art.y + y2 <= 1 && x1 + art.x <= 1;
		!place ? place = art.y + y1 <= 1 && art.x + x2 <= 1 : 0;
		!place ? place = art.x + x1 <= 1 && art.y + y2 <= 1 : 0;
		return(place);
	};

	#searchWorkSpace(layer, workProp, i, result) {
		let check;
		const { x1, y1 } =	layer[0];

		check = layer[i][0][3] >= workProp.sizeY && x1 + workProp.x <= 1;
		!check && layer[i][1].x2 <= workProp.x && y1 + workProp.y <= 1 ? check = 2 : 0;
		!check && this.#checkPrevAvailableSpace(workProp, layer, i) ? check = 3 : 0;
		switch(check) {
			case true:
				result.loop = false;
				return(result.value = 'check1');
			case 2:
				result.loop = false;
				return(result.value = 'check2');
			case 3:
				result.loop = false;
				return(result.value = 'check3');
			default:
				return(result);
		};
	};

	#defineWorkData(work, flip, layer) {
		let art;
		let workX =	work[1];
		let workY =	work[3];
		const { size } =	layer[0];

		if(flip === 1) {
			[workX, workY] = [workY, workX];
			workX = +(workX / size[0]).toFixed(2);
			workY = +(workY / size[2]).toFixed(2);
			art = { x : workX, y : workY, sizeX : work[3], sizeY : work[1] };
		}
		else {
			workX = +(workX / size[0]).toFixed(2);
			workY = +(workY / size[2]).toFixed(2);
			art = { x : workX, y : workY, sizeX : work[1], sizeY : work[3] };
		};
		return(art);
	}

	#checkFirstWorkOnLayer(layer, i, work, flip) {
		const { x1, y1, size } =	layer[0];
		const { x2, y2 } =			layer[i][1];
		const firstX =	layer[i][0].length > 5 ? layer[i][0][3] : layer[i][0][1];
		const firstY =	layer[i][0].length > 5 ? layer[i][0][1] : layer[i][0][3];
		const artX =	flip === 1 ? work[3] : work[1];
		const artY =	flip === 1 ? work[1] : work[3];
		const extraX =	y2 < 1 ? +((size[0] - firstX) / size[0]).toFixed(2) : 0;
		const extraY =	x2 < 1 ? +((size[2] - firstY) / size[2]).toFixed(2) : 0;
		let x;
		let y;

		if (x1 < 1) {
			firstX + artX <= size[0] ? x = 'ok' : 0;
			x && artY / firstY + y2 <= 1 + extraY? y = 'ok' : 0;
		}
		else if(!x && artY / firstY + y2 <= 1 + extraY && firstX + artX <= size[0]) {
			x = 'ok';
			y = 'ok';
		};
		if (y1 < 1 && !x) {
			firstY + artY <= size[2] ? y = 'ok' : 0;
			y && artX / firstX + x2 <= 1 + extraX ? x = 'ok' : 0;
		}
		else if(!y && artX / firstX + x2 <= 1 + extraX && firstY + artY <= size[2]) {
			y = 'ok';
			x = 'ok';
		};
		return(!x || !y ? false : i);
	};

	#fitSizesCheckIn(work, layer, spin) {
		let seeking =	{ loop : true, value : undefined };
		let i =			layer.length;
		let result;
		const GC =		new WeakSet();
		const info =	this.#defineWorkData(work, spin, layer);

		while (i > 1 && seeking.loop && (info.y <= 1)) {
			i--;
			this.#searchWorkSpace(layer, info, i, seeking);
		};
		switch (seeking.value) {
			case 'check1':
				result = i;
				break;
			case 'check2':
				result = i;
				break;
			case 'check3':
				result = layer[i][1]?.prev;
				break;
			case undefined: 
				result = this.#checkFirstWorkOnLayer(layer, i , work, spin);
				break;
		};
		GC.add(seeking);
		return(result);
	};

	#metchCloseWorkOnLayer(work, layer) {
		const ICON =	`<i class="nf nf-oct-sync"></i>`;
		let flip =		true;
		let spin =		0;
		let baseWork;

		if (layer.length === 1)
			return(this.#findWorksToMatchInLayer(work, layer, layer[0]));
		while(flip) {
			baseWork = this.#fitSizesCheckIn(work, layer, spin);
			if(baseWork) {
				work.length >= 6 ? work.splice(5, 1) : 0;
				spin === 1 && work.length === 5 ? work.push(ICON) : 0;
				return(this.#addNewWorkSetupAndLayerUpdate(work, layer, layer[0], baseWork));
			};
			spin === 1 ? flip = false : 0;
			spin === 0 ? spin = 1 : spin = 0;
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
		const GC =		new WeakSet();
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
				GC.add(innerCrate);
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

		if (CRATE1)
			return([list.at(-1)[1], list.at(-1)[2], list.at(-1)[3]]);
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
