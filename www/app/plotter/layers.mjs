

import { getCrates } from './layer.coordinate.mjs';


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
	processStart(estimate);
});



async function processStart(doc) {
	const { crates } =	await getCrates(doc);
	const view =		document.getElementById('layers');

	view.appendChild(plotter(crates));
};


function plotter(crates) {
	const draw =		document.querySelector(".crate-layer");
	const screen =		globalThis.screen.availWidth;
	const layerSize =	crates.filter(size => size.length === 2);
	let works;
	let layerView;
	let crate;

	for (crate in layerSize) {
		works = crates.filter(arts => arts.length === 5 && arts[0] !== 'Crate');
		layerView = getScreenProportion(screen, layerSize[crate]);
		draw.setAttribute("width", layerView.x);
		draw.setAttribute("height", layerView.y);
		draw.appendChild(arranger(works, layerView, layerSize[crate]));
	}
	return (draw);
}


function getScreenProportion(screenSize, layerSize) {
	const DESKTOP =	1920;

	return(
		screenSize >= DESKTOP ? deskTopView(layerSize): mobileView(layerSize)
	);
};


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
		sizeX =	proportion(arts[i][1], pixLayer.x, layer[0]);
		sizeY =	proportion(arts[i][3], pixLayer.y, layer[1]);
		dimension = {sizeX, sizeY};
		element.appendChild(worksPosition(dimension, layer, arts[i], crateSize));
		element.appendChild(textOnCenter(sizeX, sizeY, arts[i][0]));
		reduceSpace(arts[i], layer);
	}
	return(element);
}


function proportion (val, pixArea, layer) {
	const area = (val / layer) * pixArea;
	return (area);
};


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


function spaceAvailable (art, space) {
	const spaceX =	art[1] <= space[0];
	const spaceY =	art[3] <= space[1];
	const turnX =	art[1] <= space [1];
	const turnY =	art[3] <= space [0];

	if (spaceX && spaceY) {
		return (true);
	}
	else if(turnX || turnY) {
		return (true);
	};
	return (false);
};


function worksPosition({ sizeX, sizeY }, space, layer, crate) {
	const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	const { pixelX, pixelY } =	drawPoint(space, layer);
	const PAD =					4;
	const MAXSIZEX =			0.985;
	const MAXSIZEY =			0.975;

	rect.setAttribute("rx", 5);
	rect.setAttribute("ry", 5);
	rect.setAttribute("fill", "transparent");
	rect.setAttribute("stroke", "#03e9f4");
	rect.setAttribute("width", sizeX * MAXSIZEX);
	rect.setAttribute("height", sizeY * MAXSIZEY);
	rect.setAttribute("y", pixelY + PAD);
	if (space[0] === crate[0])
		rect.setAttribute("x", PAD + 2);
	else
		rect.setAttribute("x", pixelX + PAD + 2);
	return(rect);
}


function drawPoint (crate, layer) {
	const DESKTOP = 900;
	const MOBILE =	198;
	const view =	globalThis.screen.availWidth >= 1920 ? DESKTOP: MOBILE;
	const POSX = (layer[1] / crate[0]) === 1 ? 0: (layer[1] / crate[0]) * view;
	const POSY = (layer[3] / crate[1]) === 1 ? 0: (layer[3] / crate[1]) * view;

	console.log('LOCAL', layer[1], crate[0])
	return ({ pixelX: POSX, pixelY: POSY });
};


function textOnCenter(x, y, id) {
	const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
	const COL = localStorage.getItem("mode") === "light" ? "#333": "#FFF";

	console.log(id);
	text.setAttribute("x", x / 2);
	text.setAttribute("y", y / 2);
	text.setAttribute("fill", COL);
	text.innerHTML = id;
	return (text);
}


function deskTopView(sizes) {
	const MAXSIZE =	900;
	const PADUP =	4;
	const PADDOWN =	10;
	let layerLength;
	let layerHeight;

	if (sizes[0] > sizes[1]) {
		layerLength = MAXSIZE;
		layerHeight = (sizes[1] / sizes[0]) * MAXSIZE;
	}
	else {
		layerHeight = MAXSIZE;
		layerLength = (sizes[0] / sizes[1]) * MAXSIZE;
	}
	return ({x: layerLength + PADUP, y: layerHeight + PADDOWN});
};


function mobileView(sizes) {
	const MOBILEWIDTH =		395;
	const MOBILEHEIGHT =	198;
	const PADUP =			4;
	const PADDOWN =			10;
	let layerLength;
	let layerHeight;

	if (x > y) {
		layerLength = MOBILEWIDTH;
		layerHeight = (sizes[1] / sizes[0]) * MOBILEHEIGHT;
	}
	else {
		layerHeight = MOBILEHEIGHT;
		layerLength = (sizes[0] / sizes[1]) * MOBILEWIDTH;
	}
	return ({x: layerLength + PADUP, y: layerHeight + PADDOWN});
};
