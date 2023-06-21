



plotter([200, 100]);


function plotter(crate) {
	const view =	document.getElementById('layers');
	const draw =	document.querySelector(".crate-layer");
	const screen =	globalThis.screen.availWidth;
	const DESKTOP = 1920;
	let appView;
	let work1 = {x: 100, y: 100}
	let work2 = {x: 100, y: 100}

	screen >= DESKTOP ?
		appView = deskTopView(crate):
		appView = mobileView(crate);
	draw.setAttribute("width", appView.x);
	draw.setAttribute("height", appView.y);
	draw.appendChild(arranger(work1, work1, appView, crate));
	view.appendChild(draw);
}


function arranger({ x }, { y }, pixLayer, crateLayer) {
	const element =	document.createDocumentFragment();
	const sizeX =	proportion(x, pixLayer.x, crateLayer[0]);
	const sizeY =	proportion(y, pixLayer.y, crateLayer[1]);
	let code = "TEST";

	element.appendChild(workPosition(x, y, pixLayer, crateLayer));
	element.appendChild(textOnCenter(sizeX, sizeY, code));
	return(element);
}


function workPosition(x, y, size, space) {
	const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	const sizeX =	proportion(x, size.x, space[0]);
	const sizeY =	proportion(y, size.y, space[1]);
	const PAD =		4;

	rect.setAttribute("x", PAD);
	rect.setAttribute("y", PAD);
	rect.setAttribute("rx", 5);
	rect.setAttribute("ry", 5);
	rect.setAttribute("fill", "#03e9f4");
	rect.setAttribute("width", sizeX);
	rect.setAttribute("height", sizeY - 10);
	return(rect);
}


function proportion(val, pixArea, layer) {
	return (
		(val / layer) * pixArea
	);
}


function textOnCenter(x, y, id) {
	const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
	const COL = "#96979C"

	text.setAttribute("x", x / 2);
	text.setAttribute("y", y / 2);
	text.setAttribute("fill", "white");
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
		layerHeight = (sizes[0] / sizes[1]) * MAXSIZE;
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
		layerHeight = (sizes[0] / sizes[1]) * MOBILEWIDTH;
	}
	return ({x: layerLength + PADUP, y: layerHeight + PADDOWN});
};
