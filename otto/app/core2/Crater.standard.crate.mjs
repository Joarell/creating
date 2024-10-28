
/**
 * @class Class to comping the Crater class as a method towards solve canvas with different sizes.
*/
export default class CraterStandard {
	#list;
	#maxLayers;
	#backUp;

	/**
	* @param {Array} canvas - The list to be solved.
	* @param {Array} backUp - The backUp from the first solved tried.
	* @param {Number} maxLayer - The max number of layers to the crate.
	*/
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
		return({ crates : ARTS, backUp : structuredClone(ARTS) });
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
		const LAYERPAD =	2.5;
		const X =			innerSize[0] + DEFAULTPAD;
		const Y =			innerSize[2] + HIGHPAD;
		let z =				works.length * LAYERPAD + DEFAULTPAD;
		let i =				0;
		let tmp =			0;

		for (i in works) {
			Object.entries(works[i]).map(canvas => {
				canvas[1].map(art => {
					art[2] > tmp ? tmp = art[2] : art;
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

	#checkPlacedWorks (code, base, {artX, artY}, {valX, valY}, layer) {
		const { size } =	layer[0];
		const prevWork =	layer[base[1].prev];
		const VALX =		prevWork && prevWork[1].axioX.includes(code) ?
			prevWork[0][1] : 0;
		const VALY =		prevWork && prevWork[1].axioY.includes(code) ?
			prevWork[0][3] : 0;
		const checkX2 =		base[1].x2 < 1 && artY + valY + VALX <= size[2];
		const checkY2 =		base[1].y2 < 1 && artX + valX + VALY <= size[0];

		return({ checkX2, checkY2 });
	};

	#innerCheckerPlace(art, base, baseSize, layer, code) {
		const { size } =	layer[0];
		const GC =			new WeakSet();
		const decX =		+(art.valX / baseSize.artX + base[1].x2).toFixed(2);
		const decY =		+(art.valY / baseSize.artY + base[1].y2).toFixed(2);
		const extraX =		+((size[0] - baseSize.artX) / size[0]).toFixed(2);
		const extraY =		+((size[2] - baseSize.artY) / size[2]).toFixed(2);
		const checkWorks =	this.#checkPlacedWorks(code, base, baseSize, art, layer);
		let x;
		let y;

		if (checkWorks.checkX2)
			base[1].x2 < 1 && decX <= 1 + extraX ?
				x = true :
				x = baseSize.artX * base[1].x2 + art.valX <= size[0];
		else
			x = false;
		if (checkWorks.checkY2)
			base[1].y2 < 1 && decY <= 1 + extraY ?
				y = true :
				y = baseSize.artY * base[1].y2 + art.valY <= size[2];
		else
			y = false;
		GC.add(checkWorks);
		return ({ x, y });
	};

	#updateBaseWork(work, base, layerSpace, ref, layerSize, code) {
		const axioX = !layerSpace.avlX1 && layerSpace.avlY1 && layerSpace.avlY2;
		const axioY = !layerSpace.avlY1 && layerSpace.avlX1 && layerSpace.avlX2;
		const inner = this.#innerCheckerPlace(work, base, ref, layerSize, base[0][0]);

		if(axioY || inner.y) {
			base[1].y2 = +(work.valY / ref.artY + base[1].y2).toFixed(2);
			base[1].axioY.push(code);
		}
		else if (axioX || inner.x) {
			base[1].x2 = +(work.valX / ref.artX + base[1].x2).toFixed(2);
			base[1].axioX.push(code);
		}
		else if (layerSpace.avlX2 && layerSpace.avlY2) {
			base[1].x2 = +(work.valX / ref.artX + base[1].x2).toFixed(2);
			base[1].axioX.push(code);
		};
		return(base);
	};

	#prevLocationWork(lastWork, refWork, size, work) {
		const { x2, y2 } =	work[1];
		const extraX =	x2 > 0 ? x2 * lastWork.closeX : lastWork.closeX;
		const extraY =	y2 > 0 ? y2 * lastWork.closeY : lastWork.closeY;
		const X =			refWork.refY + extraY <= size[0];
		const Y =			refWork.refX + extraX <= size[2];

		return({ X, Y });
	};

	//#adjacentWorkAux(layer, closeArt, ref) {
	//
	//}

	#updateAdjacentWork(work, closeArt, layer, ref, code) {
		const { size } =			layer[0];
		const { length } =			closeArt[0];
		const { axioX, axioY } =	layer[ref][1];
		const refX =		layer[ref][0].length > 5 ?
			layer[ref][0][3] : layer[ref][0][1];
		const refY =		layer[ref][0].length > 5 ?
			layer[ref][0][1] : layer[ref][0][3];
		const closeX =		length > 5 ? closeArt[0][3] : closeArt[0][1];
		const closeY =		length > 5 ? closeArt[0][1] : closeArt[0][3];
		const lastPlace =	this.#prevLocationWork({closeX, closeY}, {refX, refY}, size, closeArt);
		const X1 =			+(refX * layer[ref][1].x2).toFixed(4);
		const Y1 =			+(refY * layer[ref][1].y2).toFixed(4);
		const AXIOX =		lastPlace.X ?
			X1 + work.valX <= size[0]: false;
		const AXIOY =		lastPlace.Y ?
			Y1 + work.valY <= size[2]: false;
		const PROPX =		work.valX / closeX + closeArt[1].x2 <= 1;
		const PROPY =		work.valY / closeY + closeArt[1].y2 <= 1;

		if (AXIOY && PROPX && axioX.includes(closeArt[0][0])) {
			if(work.valX / layer[0].size[0] <= layer[0].x1 && closeArt[1].x2 < 1) {
				closeArt[1].x2 += +(work.valX / closeX).toFixed(2);
				closeArt[1].axioX.push(code);
				closeArt[1].x2 > 1 ? closeArt[1].x2 = 1 : false;
			};
		}
		else if (AXIOX && PROPY && axioY.includes(closeArt[0][0])) {
			if(work.valY / layer[0].size[2] <= layer[0].y1 && closeArt[1].y2 < 1) {
				closeArt[1].y2 += +(work.valY / closeY).toFixed(2);
				closeArt[1].axioY.push(code);
				closeArt[1].y2 > 1 ? closeArt[1].y2 = 1 : false;
			};
		}
		else if (AXIOX && PROPY && axioY.includes(closeArt[0][0])) {
			if(work.valY / layer[0].size[2] <= layer[0].y1 && closeArt[1].y2 < 1) {
				closeArt[1].y2 += +(work.valY / closeY).toFixed(2);
				closeArt[1].axioY.push(code);
				closeArt[1].y2 > 1 ? closeArt[1].y2 = 1 : false;
			};
		};
		return(layer);
	};

	#updateClosestWorks(work, layer, size, ref) {
		const checkLayer =	this.#selectAxioToAddWorks(work, layer, size);
		const CODE =		work[0];

		layer.map(art => {
			if (!Array.isArray(art))
				return ;
			const artX =	art[0].length > 5 ? art[0][3] : art[0][1];
			const artY =	art[0].length > 5 ? art[0][1] : art[0][3];
			const valX =	work.length > 5 ? work[3] : work[1];
			const valY =	work.length > 5 ? work[1] : work[3];

			art[0][0] === layer[ref][0][0] ?
				this.#updateBaseWork(
				{valX, valY}, layer[ref], checkLayer, {artX, artY}, layer, CODE) :
				this.#updateAdjacentWork({valX, valY}, art, layer, ref, CODE);
		});
		return(layer);
	};

	/**
	* @param {Array} work has the canvas information
	* @param {Array} layer has the crate sizes and available gaps
	* @param {Number} decX has the decimal sizes of the works length
	* @param {Number} decY has the decimal sizes of the works height
	* @param {Number} ref hast the works code of the closest work
	*/
	#mapSizeCheckOut(work, layer, decX, decY, ref) {
		const FLIP =				5;
		const valX =				work.length > FLIP ? work[3] : work[1];
		const valY =				work.length > FLIP ? work[1] : work[3];
		const { size } =			layer[0];
		const { axioX, axioY } =	layer[ref][1];
		const artX =				layer[ref][0].length > 5 ? layer[ref][0][3] : layer[ref][0][1];
		const artY =				layer[ref][0].length > 5 ? layer[ref][0][1] : layer[ref][0][3];

		return ({
			innerX: valX + artX === size[0],
			innerY: valY + artY === size[2],
			copyX2: layer[0].x2,
			copyY2: layer[0].y2,
			setX: axioY.includes(work[0]) && layer[0].x1 + decX <= 1,
			setY: axioX.includes(work[0]) && layer[0].y1 + decY <= 1,
		});
	}

	/**
	* @param {Array} work has the canvas information
	* @param {Array} layer has the crate sizes and available gaps
	* @param {Number} decX has the decimal sizes of the works length
	* @param {Number} decY has the decimal sizes of the works height
	* @param {Number} ref hast the works code of the closest work
	*/
	#updateLayerSpace(layer, work, decX, decY, ref) {
		if (ref) {
			const data = this.#mapSizeCheckOut(work, layer, decX, decY, ref);
			const check1 = !data.setY && data.innerX || layer[0].x1 === 1
				&& data.copyX2 < 1 && !data.setY;
			const check2 = !data.setX && data.innerY || layer[0].y1 === 1
				&& data.copyY2 < 1 && data.copyX2 === 1;

			data.setX ? layer[0].x1 = +(layer[0].x1 + decX).toFixed(4) : 0;
			data.setY ? layer[0].y1 = +(layer[0].y1 + decY).toFixed(4) : 0;
			data.innerX && layer[0].x1 < 1 && !data.setY ? layer[0].x1 = 1: 0;
			data.innerY && layer[0].y1 < 1 && !data.setX ? layer[0].y1 = 1: 0;
			check1 ? layer[0].y2 = layer[0].y2 + decY : 0;
			check2 ? layer[0].x2 = layer[0].x2 + decX : 0;
		}
		else {
			layer[0].x1 = decX;
			layer[0].y1 = decY;
			layer[0].x2 = layer[0].y1 < 1 ? 0 : decX;
			layer[0].y2 = layer[0].x1 < 1 ? 0 : decY;
		};
		return(layer);
	};

	/**
	* @param {Array} work has the canvas information
	* @param {Array} layer has the crate sizes and available gaps
	* @param {Number} decX has the decimal sizes of the works length
	* @param {Number} prev indicates the available space to the closest work previously
	*/
	#addNewWorkSetupAndLayerUpdate(work, layer, { size }, prev) {
		const sizeX = work.length > 5 ?
			+(work[3] / size[0]).toFixed(4) : +(work[1] / size[0]).toFixed(4);
		const sizeY = work.length > 5 ?
			+(work[1] / size[2]).toFixed(4) : +(work[3] / size[2]).toFixed(4);
		const newWorkX = work.length > 5 ? work[3] : work[1];
		const newWorkY = work.length > 5 ? work[1] : work[3];
		let x2;
		let y2;

		if (layer.length > 1) {
			this.#updateClosestWorks(work, layer, size, prev);
			if (prev) {
				const { axioX, axioY } = layer[prev][1];
				const artX =	layer[prev][0].length > 5 ?
					layer[prev][0][3] : layer[prev][0][1];
				const artY =	layer[prev][0].length > 5 ?
					layer[prev][0][1] : layer[prev][0][3];
				const placeX =	axioX.includes(work[0]);
				const placeY =	axioY.includes(work[0]);
				x2 = placeX && newWorkX + artX === size[0] ? 1 : 0;
				y2 = placeY && newWorkY + artY === size[2] ? 1 : 0;
			}
			else {
				y2 = sizeX + layer[0].x1 === 1 ? 1 : 0;
				x2 = sizeY + layer[0].y1 === 1 ? 1 : 0;
			}
		}
		else {
			y2 = sizeX + layer[0].x2 === 1 ? 1 : 0;
			x2 = sizeY + layer[0].y2 === 1 ? 1 : 0;
		};
		this.#updateLayerSpace(layer, work, sizeX, sizeY, prev);
		layer.push([work, { axioX: [], axioY: [], x1: 1, y1: 1, x2, y2, prev }]);
		return(layer);
	};

	#findTheFirstWorksToMatchInLayer(work, layer, { size }) {
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

	#seekPreviousBaseWork(layer, code ) {
		let sumX =		0;
		let sumY =		0;
		let newCode =	code;
		const copy =	[...layer];

		copy.reverse().map(work => {
			if(!Array.isArray(work))
				return;
			const { axioX, axioY } = work[1];
			const CHECKER = axioX.includes(newCode) || axioY.includes(newCode);

			if (CHECKER) {
				sumX += axioY.includes(newCode) ? work[0][1] : 0;
				sumY += axioX.includes(newCode) ? work[0][3] : 0;
			};
		});
		return({ sumX, sumY });
	};

	/**
	 * @param {Array} layer list of works and available sizes.
	 * @param {Number} index Index of the compare base work.
	 * @param {Number} prev Index of the based work before the compare one.
	 */
	#getTheCurrentWorkInfo(layer, i, prev) {
		const FLIP =	layer[i][0].length > 5;
		const propX =	FLIP ?
			+(layer[i][0][3] / layer[prev][0][1]).toFixed(3):
			+(layer[i][0][1] / layer[prev][0][1]).toFixed(3);
		const propY=	FLIP ?
			+(layer[i][0][1] / layer[prev][0][3]).toFixed(3):
			+(layer[i][0][3] / layer[prev][0][3]).toFixed(3);
		const spaceX = FLIP ? +(propX * layer[i][0][3]).toFixed(3):
			+(propX * layer[i][0][1]).toFixed(3);
		const spaceY = FLIP ? +(propY * layer[i][0][1]).toFixed(3):
			+(propY * layer[i][0][3]).toFixed(3);

		return ({ propX, propY, spaceX, spaceY });
	};

	/**
	 * @param {Array} work The art work reference to compare.
	 * @param {Number} base The previous art work index.
	 * @param {Object} layer The list with all works added.
	 * @param {Array} axioX Array with all codes added below the previous work.
	 * @param {Array} axioY Array with all codes added aside the previous work.
	 */
	#getAllPreviousAxisValues({ axioX, axioY }, work, layer) {
		const { size } =	layer[0];
		const { x2, y2} =	work[1];
		let valX =			work[0].length > 5 ? work[0][3] : work[0][1];
		let valY =			work[0].length > 5 ? work[0][1] : work[0][3];
		let code;

		if (axioX.includes(work[0][0])) {
			for (code of axioX) {
				if (code === work[0][0])
					break;
				layer.map((data, i) => {
					if (i > 0)
						if (data[0][0] === code)
							valX += data[0].length > 5 ? data[0][3] : data[0][1];
				}, 0);
			};
		}
		else {
			for (code of axioY) {
				if (code === work[0][0])
					break;
				layer.map((data, i) => {
					if (i > 0)
						if (data[0][0] === code)
							valY += data[0].length > 5 ? data[0][1] : data[0][3];
				}, 0);
			};
		};
		valX = axioX.includes(work[0][0]) && y2 < 1 ? size[0] - valX : 0;
		valY = axioY.includes(work[0][0]) && x2 < 1 ? size[2] - valY : 0;
		return ({ valX, valY });
	};

	/**
	 * @param {Array} layer list of works and available sizes.
	 * @param {Number} index Index of the compare base work.
	 * @param {Number} prev Index of the based work before the compare one.
	 */
	#gapsAndExtraSpace(layer, prev, index) {
		const { x1, y1, size } =			layer[0];
		const { axioX, axioY, x2, y2 } =	layer[prev][1];
		const AXIS =	this.#getAllPreviousAxisValues({axioX, axioY}, layer[index], layer);
		const workProp =	this.#getTheCurrentWorkInfo(layer, index, prev);

		const calcX1 =	y2 < workProp.propY ?
			AXIS.valX: +(size[0] - layer[0].x1 * size[0]).toFixed(4);
		const calcY1 =	x2 < workProp.propX ?
			AXIS.valY: +(size[2] - layer[0].y1 * size[2]).toFixed(4);

		const gapX1 =	layer[index][1].y2 === 0 ?
			calcX1 : x1 === 1 && layer[0].y2 < 1 ? size[0] - workProp.spaceX : 0;
		const gapY1 =	layer[index][1].x2 === 0 ?
			calcY1 : y1 === 1 && layer[0].x2 < 1 ? size[2] - workProp.spaceY : 0;
		return({ gapX1, gapY1 });
	};

	/**
	 * @param {Array} layer list of works and available sizes.
	 * @param {Number} ind Index of the compare base work.
	 * @param {Number} prev Index of the based work before the compare one.
	 */
	#setGapsBasedOnPreviousWorkOnLayer(layer, ind, base, prev) {
		const AXIOS =		this.#getAllPreviousAxisValues(layer[prev][1], base, layer, prev);
		const DATA =		this.#getTheCurrentWorkInfo(layer, ind, prev);
		const GC =			new WeakSet();
		const { size } =	layer[0];
		const { x2, y2, axioY } =	layer[prev][1];
		const locations =	this.#seekPreviousBaseWork(layer, base[0]);
		const possible =	this.#gapsAndExtraSpace(layer, prev, ind);
		const allX =		layer[prev][0][1] - +(x2 * layer[prev][0][1]).toFixed(4);
		const allY =		layer[prev][0][3] - +(y2 * layer[prev][0][3]).toFixed(4);
		const checkY2 =		base[1].x2 < 1 && size[2] > DATA.spaceY && axioY.includes(base[0][0]);
		let gapX1 =			possible.gapX1;
		let gapY1 =			possible.gapY1;
		let gapX2;
		let gapY2;

		if (base[1].x2 === 1 && base[1].y2 === 1) {
			gapX2 = 0;
			gapY2 = 0;
		}
		else if (base[1].x2 < 1) {
			gapX2 = base[1].y2 === 0 && y2 <= 1 ? size[0] - (allX + possible.gapX1):
				base[1].y2 < 1 ? AXIOS.valX : 0;
			gapY2 = checkY2 && x2 <= 1 ? possible.gapX1: 0;
				// size[2] - (size[2] * layer[0].y2);
		}
		else {
			if (gapX1 > 0 && base[1].y2 < 1)
				gapY2 = x2 <= 1 ?
					size[2] - (allY + base[0][3]) :
					size[2] - (y2 * layer[prev][0][3] + locations.sumX);
			else
				gapY2 = 0;
				gapX2 = possible.extraX === 0 ? size[0] - (locations.sumX + layer[prev][0][1]):
				possible.gapX1;
		};
		GC.add(locations);
		GC.add(possible);
		GC.add(AXIOS);
		return({ gapX1, gapX2, gapY1, gapY2 });
	};

	/**
	 * @param {Array} primeWork The first work inside the layer.
	 */
	#checkOrientationSizes(primeWork) {
		const X = primeWork.length > 5 ? primeWork[3] : primeWork[1];
		const Y = primeWork.length > 5 ? primeWork[1] : primeWork[3];

		return({ X, Y });
	};

	/**
	 * @param {Array} layer list of works and available sizes.
	 * @param {Number} ind Index of the compare base work.
	 */
	#setGapsOverTheFirstWorkOnLayer(layer) {
		const { x1, y1, size } =	layer[0];
		const { x2, y2 } =			layer[1][1];
		let gapX1;
		let gapY1;
		let gapX2;
		let gapY2;
		const DIM =					this.#checkOrientationSizes(layer[1][0]);

		gapX1 = x2 < 1 && y2 === 1 && y1 === 1 && layer[0].y2 <= 1 ?
			size[0] - (size[0] * layer[0].x2):
			x1 === 1 ? +((1 - x1) * size[0]).toFixed(4) : y2 < 1 ? size[0] - DIM.X : 0;
		gapY1 = x2 < 1 && y2 < 1 ?
			size[2] - DIM.Y : +((1 - y1) * size[2]).toFixed(4);
		if (x2 < 1 || x1 < 1) {
			gapX2 = y2 <= 1 ? +(size[0] - (x2 * DIM.X)).toFixed(4):
				size[0] - (size[0] * layer[0].x2);
			gapY2 = x2 <= 1 && y2 <= 1?
				+((size[2] - DIM.Y) + ((1 - y2) * DIM.Y)).toFixed(4) :
				size[2] * (1 - layer[0].y2);
		}
		else if (y2 < 1 || y1 < 1) {
			if (x2 > 1)
				gapY2 = DIM.Y - y2 * DIM.Y;
			else
				gapY2 = y2 <= 1 ?
				+(size[2] * (1 - layer[0].y2)).toFixed(4) :
				+(size[2] - ((1 - y2) * DIM.Y)).toFixed(4);
			gapX2 = x1 < 1 ? +(size[0] * (1 - x1)).toFixed(4) : size[0] - DIM.Y;
			gapX1 === 0 ? gapX1 = gapX2 : 0;
		};
		return({ gapX1, gapX2, gapY1, gapY2 });
	};

	/**
	 * @param {Array} layer - Array list with sizes and works added.
	 * @param {Number} i - Index of the work inside the layer.
	 */
	#extraAvailableGap(layer, i) {
		const { prev } = layer[i][1];

		switch (Number.isSafeInteger(prev)) {
			case true:
				return (this.#setGapsBasedOnPreviousWorkOnLayer(layer, i, layer[i], prev));
			default:
				return(this.#setGapsOverTheFirstWorkOnLayer(layer));
		};
	};

	/**
	 * @param {Array} layer - All works put in layer and size.
	 * @param {Object} workProp - The work candidate to get inside the layer with proportion values.
	 * @param {Number} i - The index of the work reference to find space.
	 * @param {Object} result - Gets the reference work and stop the while loop by #fitSizesCheckIn method.
	 */
	// NOTE: Filter to the next work feat into the layer.
	#searchWorkSpace(layer, workProp, i, result) {
		const GAPS =	this.#extraAvailableGap(layer, i );
		const testX1 =		GAPS.gapY1 > 0 && GAPS.gapY1 >= workProp.sizeY; // layer
		const testX2 =		GAPS.gapX2 > 0 && GAPS.gapX2 >= workProp.sizeX; // work index
		const testY1 =		GAPS.gapX1 > 0 && GAPS.gapX1 >= workProp.sizeX; // layer
		const testY2 =		GAPS.gapY2 > 0 && GAPS.gapY2 >= workProp.sizeY; // work index

		if (testX1 && testX2 || testY1 && testY2) {
			result.loop = false;
			result.value = i;
		};
		return(result);
	};

	#defineWorkData(work, flip, layer) {
		let art;
		let workX =	work[1];
		let workY =	work[3];
		const { size } =	layer[0];

		if(flip === 1) {
			[workX, workY] = [workY, workX];
			workX = +(workX / size[0]).toFixed(4);
			workY = +(workY / size[2]).toFixed(4);
			art = { x : workX, y : workY, sizeX : work[3], sizeY : work[1] };
		}
		else {
			workX = +(workX / size[0]).toFixed(4);
			workY = +(workY / size[2]).toFixed(4);
			art = { x : workX, y : workY, sizeX : work[1], sizeY : work[3] };
		};
		return(art);
	}

	#fitSizesCheckIn(work, layer, spin) {
		let seeking =	{ loop : true, value : false }
		let i =			0;
		const GC =		new WeakSet();
		const info =	this.#defineWorkData(work, spin, layer);

		while (++i < layer.length && seeking.loop)
			this.#searchWorkSpace(layer, info, i, seeking);
		GC.add(seeking);
		return(seeking.value);
	};

	#metchCloseWorkOnLayer(work, layer) {
		const ICON =	`<i class="nf nf-oct-sync"></i>`;
		let flip =		true;
		let spin =		0;
		let baseWork;

		if (layer.length === 1)
			return(this.#findTheFirstWorksToMatchInLayer(work, layer, layer[0]));
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

	//#setLayer(crate, works, status) {
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
		return(crate);
	};

	#defineCrateSize(size) {
		const COMPMAXSIZE =	230;
		const LEN =			8
		const THRESHOLDX =	180;
		const THRESHOLDY =	132;
		const PASS =		size[0] >= THRESHOLDX || size[2] >= THRESHOLDX;
		const LIST =		structuredClone(this.#list)
		let x = 0;
		let z = 0;
		let y = 0;

		if (this.#list.length > LEN || PASS)
			return (false);
		LIST.reverse().map(art => {
			x + art[1] <= COMPMAXSIZE ? x += art[1] : false;
			z < art[2] ? z = art[2] : false;
			y < art[3] && art[3] <= THRESHOLDY ? y = art[3] : false;
			y + art[3] <= THRESHOLDY ? y += art[3] : false;
		});
		return (x !== size[0] || y !== size[2] ? [x, z, y] : false);
	}

	#hugeCanvasFirst(emptyCrate, layer) {
		let i =				0;
		let sized =			this.#defineCrateSize(layer);
		const GETCANVAS =	[];
		const FLIP =		`<i class="nf nf-oct-sync"></i>`;
		const HUGE =		[...this.#list.at(-1)]
		let check1 =		HUGE[1] === layer[0] && HUGE[3] === layer[2];
		let check2 = 		HUGE[1] === layer[2] && HUGE[3] === layer[0];
		const crate =		[];
		//const status =		{
		//	size: layer,
		//	x1: 1,
		//	x2: 1,
		//	y1: 1,
		//	y2: 1,
		//};

		if (sized) {
			check1 = HUGE[1] === sized[0] && HUGE[3] === sized[2];
			check2 = HUGE[1] === sized[2] && HUGE[3] === sized[0];
		}
		if (!sized && check1 || check2) {
			i++;
			HUGE[1] < HUGE[3] ? HUGE.push(FLIP) : 0;
			this.#setLayer.call(i, emptyCrate, [HUGE]);
			this.#list.splice(this.#list.indexOf(HUGE), 1)
		}
		else {
			structuredClone(this.#list).reverse().map(art => {
				art[1] === sized[0] && art[3] === sized[2] ?
					GETCANVAS.push(art) : false;
			});
			GETCANVAS.length > 0 ? GETCANVAS.map(canvas => {
				i++;
				//this.#setLayer.call(i, crate, [canvas], status);
				this.#setLayer.call(i, crate, [canvas]);
				this.#list.splice(this.#list.indexOf(canvas), 1);
			}): false;
		};
		return({ i, sized, emptyCrate });
	};

	#fillCrate(measure) {
		const GC =			new WeakSet();
		let crate =			[];
		let greb =			[];
		let { i, sized, emptyCrate } =	this.#hugeCanvasFirst(crate, measure);
		let len;
		let innerCrate;
		let checkLen =		this.#list.length > 0;

		emptyCrate.length > 0 ? crate = emptyCrate : 0;
		Array.isArray(sized) ? measure = sized : false;
		if (checkLen) {
			while (i++ < this.#maxLayers || checkLen && this.#list.length) {
				innerCrate = { size : measure, x1 : 0, y1 : 0, x2 : 0, y2 : 0 };
				len = this.#list.length - 1;
				this.#matchCanvasInLayer(greb, [innerCrate], len);
				if (greb.length > 0) {
					greb.map(art => this.#list.splice(this.#list.indexOf(art), 1));
					this.#setLayer.call(i, crate, greb);
					GC.add(innerCrate);
					greb =	null;
					greb =	[];
				};
				checkLen =	this.#list.length === 1 && i === this.#maxLayers;
			};
		}
		return({ crate, measure });
	};

	#checkOneCrate(list) {
		let AVG =		0;
		const BIGGEST =	list.at(-1);
		list.filter(art => {
			AVG += art[4];
			if(BIGGEST[4] >= art[4])
				return (art);
		});
		return (!(+(AVG).toFixed(4) / list.length > BIGGEST));
	};

	// HACK: improvement necessary to define the best crate size 'backtrack'.
	#defineSizeBaseCrate(list) {
		const CRATE1 =		this.#checkOneCrate(structuredClone(list));
		const MAXx =		250;
		const MAXy =		132;
		const SELECTED =	list.at(-1);
		let len =			list.length;
		let x =				0;
		let z =				0;
		let y =				0;

		if (CRATE1) {
			return(SELECTED[1] < SELECTED[3] ?
				[SELECTED[3], SELECTED[2], SELECTED[1]]:
				[SELECTED[1], SELECTED[2], SELECTED[3]]
			);
		}
		while(len--) {
			(x + list[len][1]) <= MAXx ? x += list[len][1] :
				x < list[len][1] && list[len][1] <= MAXx ? x = list[len][1]:
					list[len][1] > MAXx ? x = list[len][1] : false;

			z = list[len][2] ?? z;

			(y + list[len][3]) <= MAXy ? y += list[len][3]:
				y < list[len][3] && list[len][3] <= MAXy ? y = list[len][3]:
					list[len][3] > MAXy ? y = list[len][3] : false;
		};
		return([x, z, y]);
	};

	#addXandYtimes() {
		let procList = this.#list.map(art => {
			art.push(art[1] * art[3])
			return(art);
		});

		procList = this.#quickSort(procList, 5);
		procList = procList.map(art => { art.pop(); return(art) });
		return(this.#list = procList);
	};

	#provideCrate(crate) {
		if (!this.#list.length)
			return;
		this.#addXandYtimes();
		let size =		this.#defineSizeBaseCrate(this.#list);
		const crateFilled =	this.#fillCrate(size);

		crate.push(this.#defineFinalSize(crateFilled.measure, crateFilled.crate));
		crate.push({ works: crateFilled.crate })
		return(this.#provideCrate(crate));
	};
};
