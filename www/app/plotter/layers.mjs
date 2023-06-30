

import {
	spaceAvailable, proportion, getCrates, screenSize, getScreenProportion 
} from './layer.coordinate.mjs';


export async function processStart(doc) {
	const { crates } =	await getCrates(doc);
	const display =		document.getElementById('layers');

	display.appendChild(plotter(crates));
};


function plotter(crates) {
	const draw =		document.querySelector(".crate-layer");
	const screen =		globalThis.screen.availWidth;
	const layerSize =	crates.filter(size => size.length === 2);
	const PAD = 25;
	let works;
	let displayView;
	let crate;

	for (crate in layerSize) {
		works = crates.filter(arts => arts.length === 5 && arts[0] !== 'Crate');
		displayView = getScreenProportion(screen, layerSize[crate]);
		draw.setAttribute("width", displayView.x + PAD);
		draw.setAttribute("height", displayView.y + PAD);
		draw.appendChild(arranger(works, displayView, layerSize[crate]));
	}
	return (draw);
}


function arranger(arts , pixLayer, crate) {
	const element =		document.createDocumentFragment();
	const collector =	new WeakSet();
	let layer =		[...crate];
	let sizeX;
	let sizeY;
	let dimension;
	let i;

	for (i in arts) {
		if (!spaceAvailable(arts[i], layer))
			layer = [...crate];
		sizeX =	proportion(arts[i][1], pixLayer.x, crate[0]);
		sizeY =	proportion(arts[i][3], pixLayer.y, crate[1]);
		dimension = {sizeX, sizeY};
		collector.add(dimension);
		element.appendChild(worksPosition.call(dimension, layer, crate));
		element.appendChild(textOnCenter.call(dimension, arts[i], layer, crate));
		reduceSpace(arts[i], layer);
	}
	dimension = null;
	layer = null;
	return(element);
}


function reduceSpace(art, layer) {
	const checkX = art[1] === layer[0];
	const checkY = art[3] === layer[1];
	const turnX = art[1] < layer[0];

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


function worksPosition(space, crate) {
	const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	const { pixelX, pixelY } =	drawPoint(space, crate);
	const PAD =					5;
	const MAXSIZEX =			1;
	const MAXSIZEY =			1;

	if (space[0] === crate[0])
		rect.setAttribute("x", PAD);
	else
		rect.setAttribute("x", pixelX + PAD);
	rect.setAttribute("y", pixelY + PAD);
	rect.setAttribute("width", this.sizeX * MAXSIZEX);
	rect.setAttribute("height", this.sizeY * MAXSIZEY);
	return(rect);
}


function drawPoint (layer, crateSize) {
	const X =			layer[0] / crateSize[0];
	const Y =			layer[1] / crateSize[1];
	const viewSize =	screenSize();
	const DRAWPIXEL =	0
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
