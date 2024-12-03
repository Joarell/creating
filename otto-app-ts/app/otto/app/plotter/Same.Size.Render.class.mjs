import Converter from '../core2/Converter.class.mjs';
import * as coord from './layer.coordinate.mjs';

export default class sameSizeRender {
	#pixSize;
	#canvas;
	#inCrate;

	constructor ({ works }, layerSize, dim, layer) {
		this.#pixSize =			layerSize;
		this.#inCrate =			dim;
		this.#canvas =			this.#defineLayers(works, layer);

		return(this.#canvasRender());
	};

	#defineLayers(list, layer) {
		const STACK =	this.#inCrate[2] / list[0][3];
		let works =		[];
		let aux =		[];

		list.map(art => {
			aux.push(art);
			if (aux.length === STACK) {
				works.push([...aux]);
				aux = [];
			}
		});
		return(works[layer]);
	};

	#worksPositionLayer({ X, Y }) {
		const RECT =	document.createElementNS("http://www.w3.org/2000/svg", "rect");
		const INSET =	1;
		const PAD =		20;
		const y =		Y.length > 1 ? nextPointY(Y) : 0;

		RECT.setAttribute("x", 0 + INSET);
		RECT.setAttribute("y", y + INSET);
		RECT.setAttribute("width", X.at(-1) - PAD);
		RECT.setAttribute("height", Y.at(-1) - PAD);
		return(RECT);
	};

	#textOnCenter({ X, Y }, work) {
		const text =		document.createElementNS("http://www.w3.org/2000/svg", "text");
		const MID =			0.5;
		const LETTERPIX =	10;
		const x =			X.at(-1);
		const y =			Y.at(-1) * MID;
		const CENTERX =		x * MID;
		const POS =			Y.length === 1 ? y : nextPointY(Y) + y;

		text.setAttribute("x", CENTERX - ((work.length * LETTERPIX) * MID));
		text.setAttribute("y", POS);
		text.innerHTML = work[0];
		return (text);
	};

	#canvasRender () {
		let txt;
		let x;
		let y;
		const element =	document.createDocumentFragment();
		const X =		[];
		const Y =		[];
		const unit =	localStorage
			.getItem("metrica") === 'cm - centimeters' ? 'cm' : 'in';

		this.#canvas.map(art => {
			if (unit === 'in') {
				const code = art[0];

				art = new Converter(art[1], art[2], art[3]).cmConvert;
				art.unshift(code);
			};
			x = coord.proportion(art[1], this.#pixSize.x, this.#inCrate[0]);
			y = coord.proportion(art[3], this.#pixSize.y, this.#inCrate[2]);
			x > this.#pixSize.x ? x = this.#pixSize.x : x;
			y > this.#pixSize.y ? y = this.#pixSize.y : y;
			X.push(x);
			Y.push(y);
			element.appendChild(this.#worksPositionLayer({ X, Y }));
			txt = [ { X , Y }, art, this.#inCrate, ];
			element.appendChild(this.#textOnCenter.apply(null, txt))
		});
		return (element);
	};
}

function nextPointY(info) {
	const RESULT = info.reduce((sum, val) => (sum + val), 0);
	return (info.length === 2 ? info.at(-2): RESULT - info.at(-1));
};
