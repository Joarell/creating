

import {
	spaceAvailable, proportion, getCrates, screenSize, getScreenProportion 
} from './layer.coordinate.mjs';


globalThis.document.getElementById("crate-layers")
	.addEventListener("click", () => {
	const estimate = document.getElementById("input_estimate").value;
	
	if(!estimate)
		return (
			alert(
			"Please, start an 'Doc', add works and press the 'Crate' button."
		));
	document.querySelector(".plotter").setAttribute("aria-hidden", false);
	document.querySelector(".plotter").setAttribute("aria-expanded", true);
	setTimeout(() => globalThis.scroll({top: 1000, behavior: "smooth"}), 1200);
	processStart(estimate);
	setTimeout(() => globalThis.scroll({top: 1000, behavior: "smooth"}), 2000);
});


async function processStart(doc) {
	const { crates } =	await getCrates(doc);
	const display =		document.getElementById('plotter__layers');

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


function arranger(arts , pixLayer, crateSize) {
	const element =	document.createDocumentFragment();
	let layer =		[...crateSize];
	let sizeX;
	let sizeY;
	let dimension;
	let i;

	for (i in arts) {
		if (!spaceAvailable(arts[i], layer))
			layer = [...crateSize];
		sizeX =	proportion(arts[i][1], pixLayer.x, crateSize[0]);
		sizeY =	proportion(arts[i][3], pixLayer.y, crateSize[1]);
		dimension = {sizeX, sizeY};
		element.appendChild(worksPosition(dimension, layer,crateSize));
		element.appendChild(textOnCenter(sizeX, sizeY, arts[i], layer, crateSize));
		reduceSpace(arts[i], layer);
	}
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
	else if(turnX) {
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


function worksPosition({ sizeX, sizeY }, space, crate) {
	const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	const { pixelX, pixelY } =	drawPoint(space, crate);
	const PAD =				6;
	const MAXSIZEX =			0.991;
	const MAXSIZEY =			0.991;

	if (space[0] === crate[0])
		rect.setAttribute("x", PAD);
	else
		rect.setAttribute("x", pixelX + PAD);
	rect.setAttribute("y", pixelY + PAD);
	rect.setAttribute("width", sizeX * MAXSIZEX);
	rect.setAttribute("height", sizeY * MAXSIZEY);
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


function textOnCenter(x, y, work, layer, crate) {
	const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
	const PADX =	14;
	const MIDDLEX = x * 1.5;
	const CENTERX = x * 0.5;

	if (layer[0] !== crate[0]){
		text.setAttribute("x", MIDDLEX - PADX);
	}
	else
		text.setAttribute("x", CENTERX - PADX);
	text.setAttribute("y", y / 2);
	text.innerHTML = work[0];
	return (text);
}
