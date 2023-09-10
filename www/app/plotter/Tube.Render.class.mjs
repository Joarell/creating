

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
		const RECT =	document.createElementNS("http://www.w3.org/2000/svg", "rect");
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
		const text =	document.createElementNS("http://www.w3.org/2000/svg", "text");
		const X =		x.at(-1);
		const Y =		y.at(-1) * 0.5;
		const CENTERX =	X * 0.5;
		const POS =		y.length === 1 ? Y : nextPointY(y) + Y;

		text.setAttribute("x", CENTERX);
		text.setAttribute("y", POS);
		text.innerHTML = work[0];
		return (text);
	};

	#tubeRender () {
		const element =	document.createDocumentFragment();
		const X =		[];
		const Y =		[];
		let txt;

		this.#tubes.map(tube => {
			X.push(coord.proportion(tube[1], this.#pixSize.x, this.#inCrate[0]));
			Y.push(coord.proportion(tube[3], this.#pixSize.y, this.#inCrate[2]));
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
