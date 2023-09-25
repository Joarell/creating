
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

	#worksPositionLayer({ pos, values }) {
		const RECT =		document.createElementNS("http://www.w3.org/2000/svg", "rect");
		const INSET =		1;
		const PAD =			20;
		const X =			this.#pixelSize.x;
		const Y =			this.#pixelSize.y;
	
		RECT.setAttribute("x", pos[0] + INSET);
		RECT.setAttribute("y", pos[1] + INSET);

		values[0] >= X || pos[0] + values[0] + INSET >= X ?
		RECT.setAttribute("width", values[0] - PAD) :
			RECT.setAttribute("width", values[0]);
		values[1] >= Y || pos[1] + values[1] >= Y ?
		RECT.setAttribute("height", values[1] - PAD) :
			RECT.setAttribute("height", values[1]);
		return (RECT);
	};
	
	#textOnCenter({ pos, values }, code) {
		const TEXT =	document.createElementNS("http://www.w3.org/2000/svg", "text");
		const MID =		0.5;
		let posX;
		let posY;

		posX = pos[0] + (values[0] * MID);
		posY = pos[1] + (values[1] * MID);
		TEXT.setAttribute("x", posX);
		TEXT.setAttribute("y", posY);
		TEXT.innerHTML = code;
		return (TEXT);
	};


	#verifyPlaceWork(data, valX, valY) {
		let x;
		let y;
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
			return (x === undefined || y === undefined ? false : { x, y });
		}
		else {
			postPos1 && pos[0] === 0 ? x = next[0] : x = values[0];
			pos[1] === 0 && next[0] ? y = 0 : y = values[1];
		};
		return (x !== undefined && y !== undefined ? { x, y } : false);
	};

	#setNewWork(code, data, previous, coord, x, y) {
		let nextX;
		let nextY;
		const PIXELX = this.#pixelSize.x;
		const PIXELY = this.#pixelSize.y;

		nextX = previous.next[0] + x === PIXELX ? null :
			previous.next[0] === null && x === previous.pos[0] ?
				null : PIXELX - (PIXELX - (previous.next[0] + x));
		nextY = previous.next[1] + y === PIXELY ? null :
			coord.y === 0 ? PIXELY - (PIXELY - y) :
				PIXELY - (PIXELY - (previous.next[1] + y));

		data[code] = {
			values: [x, y],
			pos: [coord.x, coord.y],
			next: [nextX, nextY],
		};
		x !== 0 && previous.values[0] + x === PIXELX ? previous.next[0] = null :
			previous.next[0] = PIXELX - previous.next[0];
		y !== 0 && previous.values[1] + y === PIXELY ? previous.next[1] = null :
			previous.pos[0] === x && previous.pos[1] + y < PIXELY ?
			previous.next[1] = null : false;
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
