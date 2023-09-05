
import * as coord from './layer.coordinate.mjs';

export default class TubeRender {
	#pixSize;
	#tubes;
	#innerCrate;

	constructor ({ works }, layerSize, dim) {
		this.#tubes =		works;
		this.#pixSize =		layerSize;
		this.#innerCrate =	[dim[0] - 13.5, dim[1], dim[2] + 40];

		return (this.#tubeRender());
	};

	#worksPositionLayer(pixPoints) {
		const rect =	document.createElementNS("http://www.w3.org/2000/svg", "rect");
		const PAD =		10;

		rect.setAttribute("x", pixPoints.pixelX + PAD);
		rect.setAttribute("y", pixPoints.pixelY + PAD);
		rect.setAttribute("width", this.sizeX);
		rect.setAttribute("height", this.sizeY);
		return(rect);
	}

	#reduceSpace(art, layer) {
		layer[2] = layer[2]  - art[3];
		return(layer);
	};

	#drawPoint (layer, crateSize, axios) {
		const X =			layer[0] / crateSize[0];
		const Y =			layer[2] / crateSize[2];
		const DRAWPIXEL =	0;
		const POSX =		X === 1 ? DRAWPIXEL : X * axios.x;
		const POSY =		Y === 1 ? DRAWPIXEL : Y * axios.y;

		return ({ pixelX: POSX, pixelY: POSY });
	};

	#textOnCenter(work, layer, crate) {
		console.log(layer, 'and', crate);
		const text =	document.createElementNS("http://www.w3.org/2000/svg", "text");
		const PADX =	14;
		const MIDDLEX = this.sizeX * 1.5;
		const CENTERX = this.sizeX * 0.5;

		if (layer[0] !== crate[0])
			text.setAttribute("x", MIDDLEX - PADX);
		else
			text.setAttribute("x", CENTERX - PADX);
		text.setAttribute("y", this.sizeY / 2);
		text.innerHTML = work[0];
		return (text);
	}

	#tubeRender () {
		const node =	document.createDocumentFragment();
		let size =		[...this.#innerCrate];
		let sizeY;
		let sizeX;
		let pixWork;
		let points;

		this.#tubes.map(tube => {
			sizeX =	coord.proportion(tube[1], this.#pixSize.x, size[0]);
			sizeY =	coord.proportion(tube[3], this.#pixSize.y, size[1]);
			pixWork = { sizeX, sizeY };
			points = this.#drawPoint(size, this.#innerCrate, this.#pixSize);
			node.appendChild(this.#worksPositionLayer.call(pixWork, points));
			node.appendChild(this.#textOnCenter.call(pixWork, tube, size, this.#innerCrate));
			this.#pixSize.y = this.#pixSize.y - sizeY;
			this.#reduceSpace(tube, size);
		});
		return (node);
	};
}
