

import Converter from '../core2/Converter.class.mjs';
import * as coord from './layer.coordinate.mjs';

export default class TubeRender {
	#pixSize;
	#tubes;
	#inCrate;

	constructor ({ works }, layerSize, dim) {
		this.#pixSize =	layerSize;
		this.#inCrate =	[dim[0] + 5, dim[1], dim[2] + 3];
		this.#tubes =	Array.isArray(works[0]) ? works : [works];

		return(this.#tubeRender());
	};

	#worksPositionLayer({ x, y }) {
		const URL =		"http://www.w3.org/2000/svg";
		const RECT =	document.createElementNS(URL, "rect");
		const INSET =	1;
		const PAD =		20;
		const Y =		y.length > 1 ? nextPointY(y) : 0;

		RECT.setAttribute("x", 0 + INSET);
		RECT.setAttribute("y", Y + INSET);
		RECT.setAttribute("width", x.at(-1) - PAD);
		RECT.setAttribute("height", y.at(-1) - PAD);
		return(RECT);
	};

	#textOnCenter({ x, y }, work) {
		const URL =			"http://www.w3.org/2000/svg";
		const text =		document.createElementNS(URL, "text");
		const MID =			0.5;
		const X =			x.at(-1);
		const Y =			y.at(-1) * MID;
		const LETTERPIX =	10;
		const CENTERX =		X * MID - ((work.length * LETTERPIX) * MID);
		const POS =			y.length === 1 ? Y : nextPointY(y) + Y;

		text.setAttribute("x", CENTERX);
		text.setAttribute("y", POS);
		text.innerHTML = work[0];
		return (text);
	};

	#tubeRender () {
		let txt;
		let x;
		let y;
		const element =	document.createDocumentFragment();
		const X =		[];
		const Y =		[];
		const unit =	localStorage
			.getItem("metrica") === 'cm - centimeters' ? 'cm' : 'in';

		this.#tubes.map(tube => {
			if (unit === 'in') {
				const code = tube[0];

				tube = new Converter(tube[1], tube[2], tube[3]).cmConvert;
				tube.unshift(code);
			}
			x = coord.proportion(tube[1], this.#pixSize.x, this.#inCrate[0]);
			y = coord.proportion(tube[3], this.#pixSize.y, this.#inCrate[2]);
			x > this.#pixSize.x ? x = this.#pixSize.x : x;
			y > this.#pixSize.y ? y = this.#pixSize.y : y;
			X.push(x);
			Y.push(y);
			element.appendChild(this.#worksPositionLayer({ x: X, y: Y }));
			txt = [ { x: X , y: Y }, tube, this.#inCrate, ];
			element.appendChild(this.#textOnCenter.apply(null, txt));
		});
		return (element);
	};
};

function nextPointY(info) {
	let result;

	if (info.length === 2)
		return (info.at(-2));
	result = info.reduce((sum, val) => (sum + val), 0);
	return (result - info.at(-1));
};
