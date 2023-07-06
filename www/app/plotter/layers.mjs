

import * as coord from './layer.coordinate.mjs';

export function plotter({ crate, size }, layer) {
	const draw =		document.querySelector(".crate-layer");
	const screen =		globalThis.screen.availWidth;
	const displayView =	coord.getScreenProportion(screen, size);
	const PAD =			25;
	const works =		worksOnLayer(crate, layer);

	draw.setAttribute("width", displayView.x + PAD);
	draw.setAttribute("height", displayView.y + PAD);
	draw.appendChild(arranger(works, displayView, size)); //Add map loop to each work
	return (draw);
}


function worksOnLayer (list, layerNum) {
	let counter =		0;
	const works =		list.filter(arts => {
		arts.length === 1 ? counter++: false;
		if (arts.length === 5 && counter === layerNum)
			return(arts);
	});
	return(works);
};


function arranger(arts , pixLayer, base) {
	const element =		document.createDocumentFragment();
	let layer =			[...base];
	let sizeX;
	let sizeY;
	let dimension;
	let i;

	for (i in arts) {
		if (!coord.spaceAvailable(arts[i], layer))
			layer = [...base];
		sizeX =	coord.proportion(arts[i][1], pixLayer.x, base[0]);
		sizeY =	coord.proportion(arts[i][3], pixLayer.y, base[1]);
		dimension = {sizeX, sizeY};
		element.appendChild(worksPositionLayer.call(dimension, layer, base));
		element.appendChild(textOnCenter.call(dimension, arts[i], layer, base));
		reduceSpace(arts[i], layer);
	}
	return(element);
}


function reduceSpace(art, layer) {
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


function worksPositionLayer(layer, crate) {
	const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	const { pixelX, pixelY } =	drawPoint(layer, crate);
	const PAD =					5;

	if (layer[0] === crate[0])
		rect.setAttribute("x", PAD);
	else
		rect.setAttribute("x", pixelX + PAD);
	rect.setAttribute("y", pixelY + PAD);
	rect.setAttribute("width", this.sizeX);
	rect.setAttribute("height", this.sizeY);
	return(rect);
}


function drawPoint (layer, crateSize) {
	const X =			layer[0] / crateSize[0];
	const Y =			layer[1] / crateSize[1];
	const viewSize =	coord.screenSize();
	const DRAWPIXEL =	0;
	const POSX =		X === 1 ? DRAWPIXEL: X * viewSize;
	const POSY =		Y === 1 ? DRAWPIXEL: Y * viewSize;

	return ({ pixelX: POSX, pixelY: POSY });
};


function textOnCenter(work, layer, crate) {
	const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
	const PADX =	14;
	const MIDDLEX = this.sizeX * 1.5;
	const CENTERX = this.sizeX * 0.5;

	if (layer[0] !== crate[0]){
		text.setAttribute("x", MIDDLEX - PADX);
	}
	else
		text.setAttribute("x", CENTERX - PADX);
	text.setAttribute("y", this.sizeY / 2);
	text.innerHTML = work[0];
	return (text);
}
