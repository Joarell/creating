
import * as coord from './layer.coordinate.mjs';

export default class StandarRender {
	#canvas;
	#layer;
	#innerCrate;

	constructor ({ works }, layerSize, dim ) {
		this.#canvas =		works;
		this.#layer =		layerSize;
		this.#innerCrate =	dim;

		return (this.#standardRender());
	};

	// BUG: Not working yet.
	#standardRender () {
		const element =	document.createDocumentFragment();
		let size =		[...this.#innerCrate];
		let sizeY;
		let sizeX;
		let dimension;

		this.#canvas.map(tube => {
			sizeX =	coord.proportion(tube[1], this.#layer.x, this.#innerCrate[0]);
			sizeY =	coord.proportion(tube[3], this.#layer.y, this.#innerCrate[2]);
			dimension = { sizeX, sizeY };
			element.appendChild(this.#worksPositionLayer.call(dimension, size, this.#innerCrate));
			element.appendChild(this.#textOnCenter.call(dimension, tube, size, this.#innerCrate));
			this.#reduceSpace(tube, this.#innerCrate);
		});
		return (element);
	};

	#worksPositionLayer(layer, crate) {
		const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		const { pixelX, pixelY } =	this.#drawPoint(layer, crate);
		const PAD =					10;

		if (layer[0] === crate[0])
			rect.setAttribute("x", PAD);
		else
			rect.setAttribute("x", pixelX + PAD);
		rect.setAttribute("y", pixelY + PAD);
		rect.setAttribute("width", this.sizeX);
		rect.setAttribute("height", this.sizeY);
		return(rect);
	}

	#reduceSpace(art, layer) {
		const checkX =	art[1] === layer[0];
		const checkY =	art[3] === layer[1];
		const turnX =	art[1] < layer[0];

		if (checkX && checkY) {
			layer[0] = 0;
			layer[1] = 0;
			return (layer);
		}
		else if (turnX) {
			layer[0] = layer[0] - art[1];
			layer[1] !== art[3] ? layer[1] = layer[1] - art[3]: true;
		}
		else {
			layer[1] = layer[1] - art[3];
			layer[0] !== art[1] ? layer[0] = layer[0] - art[1]: true;
		[art[1], art[3]] = [art[3], art[1]];
		}
		return (layer);
	};

	#drawPoint (layer, crateSize) {
		const X =			layer[0] / crateSize[0];
		const Y =			layer[1] / crateSize[1];
		const viewSize =	coord.screenSize();
		const DRAWPIXEL =	0;
		const POSX =		X === 1 ? DRAWPIXEL: X * viewSize;
		const POSY =		Y === 1 ? DRAWPIXEL: Y * viewSize;

		return ({ pixelX: POSX, pixelY: POSY });
	};

	#textOnCenter(work, layer, crate) {
			const text =	document.createelementns("http://www.w3.org/2000/svg", "text");
			const padx =	14;
			const middlex = this.sizex * 1.5;
			const centerx = this.sizex * 0.5;

			if (layer[0] !== crate[0])
				text.setattribute("x", middlex - padx);
			else
				text.setattribute("x", centerx - padx);
			text.setattribute("y", this.sizey / 2);
			text.innerhtml = work[0];
			return (text);
	};
};
