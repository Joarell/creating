
import * as coord from './layer.coordinate.mjs';

export default class StandardRender {
	#canvas;
	#pixelSize;
	#inCrate;
	#filled;

	constructor({ works }, layerSize, dim, layer) {
		this.#pixelSize = layerSize;
		this.#filled = JSON.parse(JSON.stringify(layerSize));
		this.#inCrate = dim;
		this.#canvas = Object.values(works[layer])[0];
		this.#filled.x2 = this.#filled.x;
		this.#filled.y2 = this.#filled.y;
		
		return (this.#standardRender());
	};

	#worksPositionLayer({ next, pos, values }) {
		const RECT = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		const INSET = 1;
		const PAD = 20;
		const X = this.#pixelSize.x;
		const Y = this.#pixelSize.y;
		const EXTPADY = 0;
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
		const TEXT = document.createElementNS("http://www.w3.org/2000/svg", "text");
		const MID = 0.5;
		// const Y =			this.#pixelSize.y;
		const EXTPADY = 0;
		// const EXTPADY =	next[1] ? Y - next[1] : 0; // BUG: rendering wrong in some cases.
		const LETTERPIX = 7;
		let posX;
		let posY;

		posX = pos[0] + (values[0] * MID);
		posY = pos[1] + EXTPADY + (values[1] * MID);
		TEXT.setAttribute("x", posX - ((code.length * LETTERPIX) * MID));
		TEXT.setAttribute("y", posY);
		TEXT.innerHTML = code;
		return (TEXT);
	};

	#updateInnerCrate(x, y) {
		const test1 = this.#filled.y > 0 && y <= this.#filled.y;
		const test2 = this.#filled.x > 0 && x <= this.#filled.x;
		let test3;
		let test4;

		test1 ? this.#filled.y -= y : 0;
		test2 ? this.#filled.x -= x : 0;
		test3 = this.#filled.y === 0;
		test4 = this.#filled.x === 0;
		test3 ? this.#filled.x2 -= x : 0;
		test4 ? this.#filled.y2 -= y : 0;
	};

	#lastWorkUpdateNextValues(place, data, x, y) {
		Object.entries(data).map((info) => {
			const { fillX, fillY, next } = info[1];
			const propX = +(x / info[1].values[0]).toFixed(2);
			const propY = +(y / info[1].values[1]).toFixed(2);
			const updateX = place.y === next[1] && fillX + propX <= 1;
			const updateY = place.x === next[0] && fillY + propY <= 1;

			updateX ? info[1].fillX = +(fillX + propX).toFixed(2) : 0;
			updateY ? info[1].fillY = +(fillY + propY).toFixed(2) : 0;
			info[1].fillX >= 1 ? info[1].next[1] = null : 0;
			info[1].fillY >= 1 ? info[1].next[0] = null : 0;
		});
		this.#updateInnerCrate(x, y);
		return (data);
	};

	#setNewWork(code, data, prev, coord, x, y) {
		let nextX;
		let nextY;
		let fillX;
		let fillY;
		const PIXELX = this.#pixelSize.x;
		const PIXELY = this.#pixelSize.y;
		const testX = coord.x + prev.next[0] === PIXELX || this.#filled.x === coord.x;
		const testY = coord.y + prev.next[1] === PIXELY || this.#filled.y === coord.y;

		this.#lastWorkUpdateNextValues(coord, data, x, y);
		nextX = testY && coord.y === prev.next[1] ? null : coord.x + x;
		nextY = testX && coord.x === prev.next[0] ? null : coord.y + y;
		fillX = nextX === null || nextY >= PIXELY ? 1 : 0;
		fillY = nextY === null || nextX >= PIXELX ? 1 : 0;
		data[code] = {
			values: [x, y],
			pos: [coord.x, coord.y],
			next: [nextX, nextY],
			fillX,
			fillY,
		};
		return (data);
	};

	#verifyPlaceWork(data, valX, valY) {
		let x;
		let y;
		const { next, pos, values, fillX, fillY } = data;
		const lastX = pos[0] === 0 ? next[0] : pos[0];
		const lastY = pos[1] === 0 ? next[1] : pos[1];
		const testX = fillX + valX / values[0] <= 1;
		const testY = fillY + valY / values[1] <= 1;

		if (lastX + valX <= this.#pixelSize.x) {
			x = next[0] + valX <= this.#pixelSize.x ? next[0] : undefined;
			y = pos[1] + valY <= this.#pixelSize.y ? pos[1] : undefined;
		}
		else if (lastY + valY <= this.#pixelSize.y) {
			x = pos[0] + valX <= this.#pixelSize.x ? pos[0] : undefined;
			y = next[1] + valY <= this.#pixelSize.y ? next[1] : undefined;
		};
		x === 0 && fillX > 0 || x === null ? x = undefined : 0;
		!x && this.#filled.y >= valY ? x = pos[0] : 0;
		!x && !testX && testY ? x = fillX * values[0] + pos[0] : 0;

		y === 0 && !testY ? y = undefined : 0;
		y === 0 && testY ? y = fillY * values[1] + pos[1] : 0;
		y === 0 && this.#filled.x === 0 ? y = next[1] : 0;
		return (x !== undefined && y !== undefined ? { x, y } : false);
	};

	#layoutMapWorks(info, weight, height, code) {
		const ART = code.at(-1);
		let len = code.length;
		let result;
		let ref;

		//TODO: check if the 'pos' has 2 equals to the already works set
		for (ref of code) {
			if (len-- > 1) {
				result = this.#verifyPlaceWork(info[ref], weight, height);
				if (result) {
					this.#setNewWork(ART, info, info[ref], result, weight, height);
					console.log(info);
					break;
				};
			};
		};
		return (info);
	};

	#layoutArranger(map, weight, height, code) {
		let x;
		let y;
		let fillX;
		let fillY;

		if (Object.entries(map).length === 0) {
			x = this.#pixelSize.x - weight === 0 ? null : weight;
			y = this.#pixelSize.y - height === 0 ? null : height;
			fillX = this.#filled.x + weight === this.#pixelSize.x ? 1 : 0;
			fillY = this.#filled.y + height === this.#pixelSize.y ? 1 : 0;
			map[code] = {
				values: [weight, height],
				pos: [0, 0],
				next: [x, y],
				fillX,
				fillY
			};
			this.#updateInnerCrate(weight, height);
		}
		else
			this.#layoutMapWorks(map, weight, height, code);
		return (map)
	};

	#drawAndWrite(table) {
		const element = document.createDocumentFragment();
		let work;

		for (work in table) {
			element.appendChild(this.#worksPositionLayer(table[work]));
			element.appendChild(this.#textOnCenter(table[work], work));
		};
		return (element);
	};

	#standardRender() {
		let x;
		let y;
		const MAPWORK = {};
		const ICON = `<i class="nf nf-oct-sync"></i>`;
		const CODES = [];

		this.#canvas.map(async art => {
			if (art.at(-1) === ICON) {
				x = coord.proportion(art[3], this.#pixelSize.x, this.#inCrate[0]);
				y = coord.proportion(art[1], this.#pixelSize.y, this.#inCrate[2]);
			}
			else {
				x = coord.proportion(art[1], this.#pixelSize.x, this.#inCrate[0]);
				y = coord.proportion(art[3], this.#pixelSize.y, this.#inCrate[2]);
			};
			CODES.push(art[0]);
			await this.#layoutArranger(MAPWORK, x, y, CODES);
		}, 0);
		return (this.#drawAndWrite(MAPWORK));
	};
};
