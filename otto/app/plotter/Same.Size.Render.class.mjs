

import * as coord from './layer.coordinate.mjs';

export default class sameSizeRender {
	#pixSize;
	#canvas;
	#inCrate;

	constructor ({ works }, layerSize, dim, layer) {
		this.#pixSize =	layerSize;
		this.#inCrate =	dim;
		this.#canvas =	Array.isArray(works[0]) ? [works[layer]] : works[0];

		return (this.#canvasRender());
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
		const text =		document.createElementNS("http://www.w3.org/2000/svg", "text");
		const MID =			0.5;
		const LETTERPIX =	10;
		const X =			x.at(-1);
		const Y =			y.at(-1) * MID;
		const CENTERX =		X * MID;
		const POS =			y.length === 1 ? Y : nextPointY(y) + Y;

		text.setAttribute("x", CENTERX - ((work.length * LETTERPIX) * MID));
		text.setAttribute("y", POS);
		text.innerHTML = work[0];
		return (text);
	};

	#canvasRender () {
		const element =	document.createDocumentFragment();
		const X =		[];
		const Y =		[];
		let txt;


		this.#canvas.map(art => {
			X.push(coord.proportion(art[1], this.#pixSize.x, this.#inCrate[0]));
			Y.push(coord.proportion(art[3], this.#pixSize.y, this.#inCrate[2]));
			element.appendChild(this.#worksPositionLayer({ x: X, y: Y }));
			txt = [ { x: X , y: Y }, art, this.#inCrate, ];
			element.appendChild(this.#textOnCenter.apply(null, txt))
		});
		return (element);
	};
}

function nextPointY(info) {
	let result;

	if (info.length === 2)
		return (info.at(-2));
	result = info.reduce((sum, val) => (sum + val), 0);
	return (result - info.at(-1));
};
