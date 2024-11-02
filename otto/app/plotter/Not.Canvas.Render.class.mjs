
import Converter from '../core2/Converter.class.mjs';
import * as coord from './layer.coordinate.mjs';

export default class noCanvasRender {
	#pixelSize;
	#items;
	#inCrate;

	constructor ({ works }, layerSize, dim) {
		this.#pixelSize =	layerSize;
		this.#inCrate =		dim;
		this.#items =		works;

		return (this.#canvasRender());
	};

	#layerPositioningWork(x, y) {
		let posX;
		let posY;
		const RESET = findSpot(x, y, this.#pixelSize);

		if (x.includes(0) || y.includes(0)) {
			posX = RESET.x;
			posY = RESET.y;
		}
		else {
			!x.includes(0) && x.length === 1 ? posX = 0 : posX = RESET.x;
			!y.includes(0) && !x.includes(0) ? posY = 0 : posY = RESET.y;
		}
		return({ posX, posY });
	};

	#worksPositionLayer({ X, Y }) {
		const RECT =		document.createElementNS("http://www.w3.org/2000/svg", "rect");
		const INSET =		1;
		const PAD =			20;
		const POS =			this.#layerPositioningWork(X, Y);
		const { x, y } =	this.#pixelSize;

		RECT.setAttribute("x", POS.posX + INSET);
		RECT.setAttribute("y", POS.posY + INSET);
		X.at(-1) >= x || POS.posX + X.at(-1) + INSET >= x ?
			RECT.setAttribute("width", X.at(-1) - (PAD + 15.7)):
			RECT.setAttribute("width", X.at(-1));
		Y.at(-1) >= y || POS.posY + Y.at(-1) >= y ?
			RECT.setAttribute("height", Y.at(-1) - PAD):
			RECT.setAttribute("height", Y.at(-1));
		return(RECT);
	};

	#textOnCenter({ X, Y }, work, layer) {
		const TEXT =		document.createElementNS("http://www.w3.org/2000/svg", "text");
		const MID =			0.5;
		const SUMMX =		+nextPoint(X).toFixed(0);
		const LETTERPIX =	10;
		let posX;
		let posY;
		const RESET =	findSpot(X, Y, layer);

		if (X.includes(0) || Y.includes(0)) {
			posX = RESET.x + (X.at(-1) * MID - ((work.length * LETTERPIX) * MID));
			posY = RESET.y + (Y.at(-1) * MID);
		}
		else {
			!X.includes(0) ? posX = SUMMX + (X.at(-1) * MID) :
				posX = RESET.x (X.at(-1) * MID - ((work.length * LETTERPIX) * MID));
			!Y.includes(0) && !X.includes(0) ? posY = Y.at(-1) * MID :
				posY = RESET.y + (Y.at(-1) * MID);
		}
		TEXT.setAttribute("x", posX);
		TEXT.setAttribute("y", posY);
		TEXT.innerHTML = work[0];
		return (TEXT);
	};

	#addZero(x, y, count, layer) {
		let i =			count;
		let resultX =	[];
		let resultY =	[];

		while(i >= 0 && x[i] !== 0) {
			resultX.push(x[i]);
			i--;
		};
		i = count;
		while(i >= 0 && y[i] !== 0) {
			resultY.push(y[i]);
			i--;
		};
		resultX = resultX.reduce((sum, val) => (sum + val), 0);
		resultY = resultY.reduce((sum, val) => (sum + val), 0);
		resultX >= layer.x ? x.push(0) : false;
		resultY >= layer.y ? y.push(0) : false;
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

		this.#items.map((item, i) => {
			if (unit === 'in') {
				const code = item[0];

				item = new Converter(item[1], item[2], item[3]).cmConvert;
				item.unshift(code);
			}
			x = coord.proportion(item[1], this.#pixelSize.x, this.#inCrate[0]);
			y = coord.proportion(item[2], this.#pixelSize.y, this.#inCrate[1]);
			x > this.#pixelSize.x ? x = this.#pixelSize.x : x;
			y > this.#pixelSize.y ? y = this.#pixelSize.y : y;
			X.push(x);
			Y.push(y);
			element.appendChild(this.#worksPositionLayer({ X, Y }));
			txt = [ { X, Y }, item, this.#pixelSize ];
			element.appendChild(this.#textOnCenter.apply(null, txt));
			this.#addZero( X, Y , i, this.#pixelSize);
		});
		return (element);
	};
};


function nextPoint(info) {
	let result;

	if (info.length === 2)
		return (info.at(-2));
	result = info.reduce((sum, val) => (sum + val), 0);
	return (result - info.at(-1));
};


// ╭──────────────────────────────────────────────────────────────╮
// │ INFO: finds the last work location to define the next point. │
// ╰──────────────────────────────────────────────────────────────╯
function findSpot(axioX, axioY, layer) {
	let x;
	let y;
	let tmp;
	let zeroX =		0;
	let zeroY =		0;
	const SUMMX =	nextPoint(axioX);
	const SUMMY =	nextPoint(axioY);

	axioX.map(val => val === 0 ? zeroX++ : false);
	axioY.map(val => val === 0 ? zeroY++ : false);
	x = SUMMX - (zeroX * layer.x);
	y = SUMMX < layer.x || SUMMY < layer.y ? 0 : SUMMY - (zeroY * layer.y);
	if (x === 0 && axioY.includes(0)) {
		tmp = axioY.indexOf(layer.y);
		tmp >= 0 ? x = axioX[tmp] : x = axioX[axioY.indexOf(0) - 1];
	};
	y >= layer.y ? y = SUMMY - (zeroY * layer.y) - axioY.at(-1) : false;
	return ({ x, y });
};
