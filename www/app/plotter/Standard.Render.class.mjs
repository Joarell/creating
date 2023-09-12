
import * as coord from './layer.coordinate.mjs';

export default class StandarRender {
	#canvas;
	#layer;
	#inCrate;

	constructor ({ works }, layerSize, dim, layer) {
		this.#layer =	layerSize;
		this.#inCrate =	dim;
		this.#canvas =	Object.values(works[layer])[0];

		return (this.#standardRender());
	};

	#worksPositionLayer({ x, y }) {
		const RECT =	document.createElementNS("http://www.w3.org/2000/svg", "rect");
		const INSET =	1;
		const PAD =		20;
		let length =	nextPoint(x);
		let heigth;

		if (this.#layer.x > length )
			heigth = 0;
		else {
			length = 0;
			heigth = (this.#layer.y - y.at(1));
		}
		RECT.setAttribute("x", length + INSET);
		RECT.setAttribute("y", heigth + INSET);
		x.at(-1) === this.#layer.x || nextPoint(x) + x.at(-1) === this.#layer.x ? 
			RECT.setAttribute("width", x.at(-1) - PAD):
			RECT.setAttribute("width", x.at(-1));
		y.at(-1) >= this.#layer.y || length === 0 && heigth > 0 ?
			RECT.setAttribute("height", y.at(-1) - PAD):
			RECT.setAttribute("height", y.at(-1));
		return(RECT);
	};

	#textOnCenter({ x, y }, work, layer) {
		const TEXT =	document.createElementNS("http://www.w3.org/2000/svg", "text");
		const MID =		0.5;
		const POSTX =	nextPoint(x);
		const POSTY =	nextPoint(y);
		let posx;
		let posy;

		if (layer.x >= POSTX + x.at(-1)) {
			posx = POSTX + MID * x.at(-1);
			posy = y.at(-1) * MID;
		}
		else {
			posx = (layer.x - POSTX) + x.at(-1) * MID;
			posy = y.at(1) + y.at(-1) * MID;
			// posy = (layer.y - POSTY) + y.at(-1) * MID;
		}
		TEXT.setAttribute("x", posx);
		TEXT.setAttribute("y", posy);
		TEXT.innerHTML = work[0];
		return (TEXT);
	};

	#standardRender () {
		const element =	document.createDocumentFragment();
		let x =		[];
		let y =		[];
		let txt;

		this.#canvas.map(art => {
			x.push(coord.proportion(art[1], this.#layer.x, this.#inCrate[0]));
			y.push(coord.proportion(art[3], this.#layer.y, this.#inCrate[2]));
			element.appendChild(this.#worksPositionLayer({ x : x, y : y }));
			txt = [ { x: x , y: y }, art, this.#layer ];
			element.appendChild(this.#textOnCenter.apply(null, txt));
			// nextPoint(x) + x.at(-1) === this.#layer.x ? x = [] : false;
			// nextPoint(y) + y.at(-1) === this.#layer.y ? y = [] : false;
		});
		return (element);
	};
};

function nextPoint(info) {
	let result;

	if (info.length === 2)
		return (info.at(-2));
	result = info.reduce((sum, val) => (sum + val), 0);
	return (+(result - info.at(-1)));
};
