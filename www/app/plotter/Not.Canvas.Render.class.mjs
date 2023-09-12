

import * as coord from './layer.coordinate.mjs';

export default class noCanvasRender {
	#pixSize;
	#items;
	#inCrate;

	constructor ({ works }, layerSize, dim) {
		this.#pixSize =	layerSize;
		this.#inCrate =	dim;
		this.#items =	works;

		return (this.#canvasRender());
	};

	#worksPositionLayer({ x, y }) {
		const RECT =	document.createElementNS("http://www.w3.org/2000/svg", "rect");
		const INSET =	1;
		const PAD =		20;
		const X =		x.length > 1 ? nextPointX(x) : 0;

		RECT.setAttribute("x", X + INSET);
		RECT.setAttribute("y", 0 + INSET);
		RECT.setAttribute("width", x.at(-1) - PAD);
		RECT.setAttribute("height", y.at(-1) - PAD);
		return(RECT);
	};

	#textOnCenter({ x, y }, work) {
		const text =	document.createElementNS("http://www.w3.org/2000/svg", "text");
		const MID =		0.5;
		const X =		x.at(-1) * MID;
		const Y =		y.at(-1) * MID;
		const CENTERX =	x.length === 1 ? X : nextPointX(x) + X;

		text.setAttribute("x", CENTERX);
		text.setAttribute("y", Y);
		text.innerHTML = work[0];
		return (text);
	};

	#canvasRender () {
		const element =	document.createDocumentFragment();
		const X =		[];
		const Y =		[];
		let txt;

		this.#items.map(item => {
			X.push(coord.proportion(item[1], this.#pixSize.x, this.#inCrate[0]));
			Y.push(coord.proportion(item[2], this.#pixSize.y, this.#inCrate[1]));
			element.appendChild(this.#worksPositionLayer({ x : X, y : Y }));
			txt = [ { x: X, y: Y }, item, this.#inCrate ];
			element.appendChild(this.#textOnCenter.apply(null, txt));
		});
		console.log(X, Y);
		return (element);
	};
};

function nextPointX(info) {
	let result;

	if (info.length === 2)
		return (info.at(-2));
	result = info.reduce((sum, val) => (sum + val), 0);
	return (result - info.at(-1));
};
