
import Converter from '../core2/Converter.class.mjs';
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

	#worksPositionLayer({ pos, values }) {
		const url =		"http://www.w3.org/2000/svg";
		const RECT =	document.createElementNS(url, "rect");
		const INSET =	1;
		const PAD =		20;
		const X =		this.#pixelSize.x;
		const Y =		this.#pixelSize.y;
		const EDGE =	0.95;

		RECT.setAttribute("x", pos[0] + INSET);
		RECT.setAttribute("y", pos[1] + INSET);

		values[0] >= X * EDGE || pos[0] + values[0] + INSET >= X * EDGE ?
			RECT.setAttribute("width", values[0] - PAD):
			RECT.setAttribute("width", values[0]);
		values[1] >= Y * EDGE || pos[1] + values[1] >= Y * EDGE ?
			RECT.setAttribute("height", values[1] - PAD):
			RECT.setAttribute("height", values[1]);
		return (RECT);
	};

	#textOnCenter({ pos, values }, code) {
		const url =			"http://www.w3.org/2000/svg";
		const X =			this.#pixelSize.x;
		const Y =			this.#pixelSize.y;
		const TEXT =		document.createElementNS(url, "text");
		const PAD =			20;
		const MID =			0.5;
		const LETTERPIX =	7;
		const EDGE =		0.95;
		let posX;
		let posY;

		posX = values[0] >= X * EDGE ?
			pos[0] + (values[0] * MID) - PAD : pos[0] + (values[0] * MID);
		posY = values[0] >= Y * EDGE ?
			pos[1] + (values[1] * MID) - PAD : pos[1] + (values[1] * MID);
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
			const propX = +(x / info[1].values[0]).toFixed(4);
			const propY = +(y / info[1].values[1]).toFixed(4);
			const updateX = place.y === next[1] && fillX + propX <= 1;
			const updateY = place.x === next[0] && fillY + propY <= 1;

			updateX ? info[1].fillX = +(fillX + propX).toFixed(4) : 0;
			updateY ? info[1].fillY = +(fillY + propY).toFixed(4) : 0;
			info[1].fillX >= 1 ? info[1].next[1] = null : 0;
			info[1].fillY >= 1 ? info[1].next[0] = null : 0;
		});
		this.#updateInnerCrate(x, y);
		return (data);
	};

	#alignCoordinates(data, code) {
		const { next, pos, values } = data[code];
		let testPos1;
		let testPos2;
		let ref;

		for (ref in data) {
			if (ref !== code) {
				testPos1 = pos[0] === data[ref].pos[0] && pos[0] !== 0;
				testPos2 = pos[1] === data[ref].pos[1] && pos[1] !== 0;

				if (testPos1 && testPos2) {
					if (testPos1 && pos[1] < data[ref].next[1]) {
						pos[1] = data[ref].next[1];
						next[1] = pos[1] + values[1];
					}
					else if (testPos2 && pos[0] < data[ref].next[0]) {
						pos[0] = data[ref].next[0];
						next[0] = pos[0] + values[0];
					};
				}
				else if (testPos1 && pos[1] < data[ref].next[1]) {
					pos[1] = data[ref].next[1];
					next[1] = pos[1] + values[1];
				}
				else if (testPos2 && pos[0] < data[ref].next[0]) {
					pos[0] = data[ref].next[0];
					next[0] = pos[0] + values[0];
				};
			};
		};
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
		nextX = testY && coord.y * prev.fillY === prev.next[1] ? null : coord.x + x;
		nextY = testX && coord.x * prev.fillX === prev.next[0] ? null : coord.y + y;
		fillX = nextX === null || nextY >= PIXELY ? 1 : 0;
		fillY = nextY === null || nextX >= PIXELX ? 1 : 0;
		data[code] = {
			values: [x, y],
			pos: [coord.x, coord.y],
			next: [nextX, nextY],
			fillX,
			fillY,
		};
		this.#alignCoordinates(data, code);
		return (data);
	};

	#verifyPlaceWork(data, valX, valY) {
		let x;
		let y;
		const { next, pos, values, fillX, fillY } = data;
		const PX =		this.#pixelSize.x;
		const PY =		this.#pixelSize.y;
		const lastX =	pos[0] === 0 ? next[0] : pos[0];
		const lastY =	pos[1] === 0 ? next[1] : pos[1];
		const testX =	fillX + valX / values[0] <= 1;
		const testY =	fillY + valY / values[1] <= 1;
		const check1 =	lastX === null && values[0] + valX <= PX && pos[0] === 0;
		const check2 =	lastY === null && values[1] + valY <= PY && pos[1] === 0;

		if (check1 || check2) {
			x = check1 ? pos[0] : lastY === null ? next[0] : pos[0];
			y = check2 ? pos[1] : lastX === null ? next[1] : pos[1];
			x === 0 && y === 0 ? x = undefined : 0;
			y === 0 && y === 0 ? y = undefined : 0;
			x === 0 && fillX > 0 ? x = fillX * values[0] : 0;
			y === 0 && fillY > 0 ? x = fillY * values[1] : 0;
		}
		else if (lastX + valX <= this.#pixelSize.x) {
			x = next[0] + valX <= this.#pixelSize.x ? next[0]: undefined;
			y = pos[1] + valY <= this.#pixelSize.y ?  pos[1]: undefined;
		}
		else if (lastY + valY <= this.#pixelSize.y) {
			x = pos[0] + valX <= this.#pixelSize.x ? pos[0]: undefined;
			y = next[1] + valY <= this.#pixelSize.y ? next[1]: undefined;
		}
		x === 0 && fillX > 0 || x === null ? x = undefined : 0;
		!x && this.#filled.y >= valY ? x = ~~(pos[0]): 0;
		!x && !testX && testY ? x = ~~(fillX * values[0] + pos[0]): 0;

		y === 0 && !testY ? y = undefined : 0;
		y === 0 && testY ? ~~(y = fillY * values[1] + pos[1]): 0;
		y === 0 && this.#filled.x === 0 ? y = ~~(next[1]): 0;
		return (x !== undefined && y !== undefined ? { x, y } : false);
	};

	#layoutMapWorks(info, weight, height, code) {
		const ART = code.at(-1);
		let len = code.length;
		let result;
		let ref;

		for (ref of code) {
			if (len-- > 1) {
				if (info[ref])
					result = this.#verifyPlaceWork(info[ref], weight, height);
				if (result) {
					this.#setNewWork(ART, info, info[ref], result, weight, height);
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
		const unit =	localStorage
			.getItem("metrica") === 'cm - centimeters' ? 'cm' : 'in';

		this.#canvas.map(async art => {
			if (unit === 'in') {
				const code = art[0];

				art = Array.from(new Converter(art[1], art[2], art[3]).cmConvert);
				art.unshift(code);
			}
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
