
import * as coord from './layer.coordinate.mjs';

export default class StandarRender {
	#canvas;
	#pixelSize;
	#inCrate;

	constructor({ works }, layerSize, dim, layer) {
		this.#pixelSize = layerSize;
		this.#inCrate = dim;
		this.#canvas = Object.values(works[layer])[0];

		return (this.#standardRender());
	};

	#worksPositionLayer({next, pos, values }) {
		const RECT =		document.createElementNS("http://www.w3.org/2000/svg", "rect");
		const INSET =		1;
		const PAD =			20;
		const X =			this.#pixelSize.x;
		const Y =			this.#pixelSize.y;
		const EXTPADY =		0;
		// const EXTPADY =		next[1] ? Y - next[1] : 0; // BUG: rendering wrong in some cases.
	
		RECT.setAttribute("x", pos[0] + INSET);
		RECT.setAttribute("y", pos[1] + EXTPADY + INSET);

		values[0] >= X || pos[0] + values[0] + INSET >= X ?
		RECT.setAttribute("width", values[0] - PAD) :
			RECT.setAttribute("width", values[0]);
		values[1] + EXTPADY >= Y || pos[1] + values[1] >= Y ?
		RECT.setAttribute("height", values[1] - PAD) :
			RECT.setAttribute("height", values[1]);
		return (RECT);
	};
	
	#textOnCenter({ next, pos, values }, code) {
		const TEXT =		document.createElementNS("http://www.w3.org/2000/svg", "text");
		const MID =			0.5;
		// const Y =			this.#pixelSize.y;
		const EXTPADY =		0;
		// const EXTPADY =	next[1] ? Y - next[1] : 0; // BUG: rendering wrong in some cases.
		const LETTERPIX =	10;
		let posX;
		let posY;

		posX = pos[0] + (values[0] * MID);
		posY = pos[1] + EXTPADY + (values[1] * MID);
		TEXT.setAttribute("x", posX - ((code.length * LETTERPIX) * MID));
		TEXT.setAttribute("y", posY);
		TEXT.innerHTML = code;
		return (TEXT);
	};

	#verifyPlaceWork(data, valX, valY) {
		let x;
		let y;
		const SIZEX =		this.#pixelSize.x;
		const SIZEY =		this.#pixelSize.y;
		const { next, values, pos } = data;
		const postPos1 =	next[0] === null ? values[0] + valX : next[0] + valX;
		const postPos2 =	next[1] === null ? values[1] + valY : next[1] + valY;

		if (next[0] === null && next[1] === null)
			return (false);
		if (next[0] === null) {
			if (postPos2 < SIZEY) {
				x = pos[0]
				y = next[1];
			}
			else {
				x = next[1] + valY <= SIZEY && pos[0] === 0 ? 0 : values[0];
				y = next[1] + valY <= SIZEY ? next[1] : undefined;
			};
		}
		else {
			postPos1 <= SIZEX ? x = next[0] : x = values[0];
			pos[1] === 0 && next[0] ? y = 0 : y = values[1];
		};
		return (x !== undefined && y !== undefined ? { x, y } : false);
	};

	#lastWorkUpdateNextValues(coord, data, x, y) {
		const PIXELX =	this.#pixelSize.x;
		const PIXELY =	this.#pixelSize.y;
		const checkX1 =	coord.x === PIXELX || data.next[0] === null;
		const checkX2 = data.values[0] + x === PIXELX;
		const checkY1 = coord.y === PIXELY || data.values[1] + y === PIXELY;
		const checkY2 = data.pos[0] === x && data.pos[1] + y < PIXELY;

		checkX1 || checkX2 ? data.next[0] = null : data.next[0] = x + data.next[0];
		checkY1 ? data.next[1] = null : checkY2 ? data.next[1] = null : false;
	};

	#setNewWork(code, data, previous, coord, x, y) {
		let nextX;
		let nextY;
		const PIXELX = this.#pixelSize.x;
		const PIXELY = this.#pixelSize.y;

		nextX = coord.x + x === PIXELX ? null :
			coord.x === null && x === previous.pos[0] ?
				null : PIXELX - (PIXELX - (coord.x + x));
		nextY = coord.y + y === PIXELY && coord.y !== 0 ? null :
			coord.y === 0 ? PIXELY - (PIXELY - y) :
				PIXELY - (PIXELY - (coord.y + y));
		data[code] = {
			values: [x, y],
			pos: [coord.x, coord.y],
			next: [nextX, nextY],
		};
		this.#lastWorkUpdateNextValues(coord, previous, x , y);
		return (data);
	}

	#layoutMapWorks(info, weight, height, code) {
		let work;
		let result;
		const ART =		code;
		const SIZEX =	weight.at(-1);
		const SIZEY =	height.at(-1);

		for (work in info) {
			result = this.#verifyPlaceWork(info[work], SIZEX, SIZEY);
			if (result) {
				this.#setNewWork(ART, info, info[work], result, SIZEX, SIZEY);
				return (info);
			};
		};
	};

	#layoutArranger(map, weigth, height, code) {
		let x;
		let y;

		if (weigth.length === 1) {
			x = this.#pixelSize.x - weigth.at(-1) === 0 ? null : weigth.at(-1);
			y = this.#pixelSize.y - height.at(-1) === 0 ? null : height.at(-1);
			map[code] = {
				values: [weigth.at(-1), height.at(-1)],
				pos: [0, 0],
				next: [x, y],
			};
		}
		else
			this.#layoutMapWorks(map, weigth, height, code);
		return (map)
	};

	#drawAndWrite(table) {
		const element = document.createDocumentFragment();
		let work;

		for(work in table) {
			element.appendChild(this.#worksPositionLayer(table[work]));
			element.appendChild(this.#textOnCenter(table[work], work));
		};
		return(element);
	};

	#standardRender() {
		const X = [];
		const Y = [];
		const MAPWORK = {};

		this.#canvas.map(art => {
			if (art.at(-1) === ' ') {
				X.push(coord.proportion(art[3], this.#pixelSize.x, this.#inCrate[0]));
				Y.push(coord.proportion(art[1], this.#pixelSize.y, this.#inCrate[2]));
			}
			else {
				X.push(coord.proportion(art[1], this.#pixelSize.x, this.#inCrate[0]));
				Y.push(coord.proportion(art[3], this.#pixelSize.y, this.#inCrate[2]));
			};
			this.#layoutArranger(MAPWORK, X, Y, art[0]);
		}, 0);
		return(this.#drawAndWrite(MAPWORK));
	};
};
