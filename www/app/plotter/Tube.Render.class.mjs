

import * as coord from './layer.coordinate.mjs';

export default class TubeRender {
	#pixSize;
	#tubes;
	#inCrate;

	constructor ({ works }, layerSize, dim) {
		this.#pixSize =	layerSize;
		this.#inCrate =	[dim[0] + 5, dim[1], dim[2] + 3];
		this.#tubes =	Array.isArray(works[0]) ? works : [works];

		return (this.#tubeRender());
	};

	#worksPositionLayer(pixPoints) {
		const RECT =	document.createElementNS("http://www.w3.org/2000/svg", "rect");
		const PAD =		7;

		RECT.setAttribute("y", pixPoints.pixelY + PAD);
		RECT.setAttribute("x", pixPoints.pixelX + PAD);
		RECT.setAttribute("width", this.sizeX);
		RECT.setAttribute("height", this.sizeY);
		return(RECT);
	}

	#drawPoint (layer, crateSize, axios) {
		const X =			layer[0] / crateSize[0];
		const Y =			layer[2] / crateSize[2];
		const DRAWPIXEL =	0;
		const POSX =		X === 1 ? DRAWPIXEL : +(X * axios.x).toFixed(3);
		const POSY =		Y === 1 ? DRAWPIXEL : +(Y * axios.y).toFixed(3);

		return ({ pixelX: POSX, pixelY: POSY });
	};

	#textOnCenter(work, layer, crate, localY) {
		const text =	document.createElementNS("http://www.w3.org/2000/svg", "text");
		const PADX =	14;
		const MIDDLEX = this.sizeX * 1.5;
		const CENTERX = this.sizeX * 0.5;

		if (layer[0] !== crate[0])
			text.setAttribute("x", MIDDLEX - PADX);
		else
			text.setAttribute("x", CENTERX - PADX);
		text.setAttribute("y", this.sizeY / 2 + localY.pixelY + PADX);
		text.innerHTML = work[0];
		return (text);
	}

	#tubeRender () {
		const element =	document.createDocumentFragment();
		let size =		[...this.#inCrate];
		let sizeY;
		let sizeX;
		let pixWork;
		let points;

		this.#tubes.map(tube => {
			sizeX =	coord.proportion(tube[1], this.#pixSize.x, this.#inCrate[0]);
			sizeY =	coord.proportion(tube[3], this.#pixSize.y, this.#inCrate[2]);
			pixWork = { sizeX, sizeY };
			size[2] = size[2] - tube[3];
			points = this.#drawPoint(size, this.#inCrate, this.#pixSize);
			element.appendChild(this.#worksPositionLayer.call(pixWork, points));
			element.appendChild(
				this.#textOnCenter.call(pixWork, tube, size, this.#inCrate, points)
			);
		});
		return (element);
	};
}
