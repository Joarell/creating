



element.appendChild(rect);
element.appendChild(text);



console.log(screen);


plotter([200, 100]);


function plotter(crate) {
	const view =	document.getElementById('layers');
	const draw =	document.querySelector(".crate-layer");
	const screen =	globalThis.screen.availWidth;
	const DESKTOP = 1920;
	let appView;

	screen >= DESKTOP ?
		appView = deskTopView(crate):
		appView = mobileView(crate);
	draw.setAttribute("width", appView.x);
	draw.setAttribute("height", appView.y);
	draw.appendChild(arranger(appView, appView));
	view.appendChild(draw);
}


function arranger({ x }, { y }) {
	const element =	document.createDocumentFragment();

	element.appendChild(positionWork(x, y, code));
	retun(element);
}


function positionWork(x, y, space) {
	const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	let code = "TEST";

	rect.setAttribute("x", 4);
	rect.setAttribute("y", 4);
	rect.setAttribute("rx", 5);
	rect.setAttribute("ry", 5);
	rect.setAttribute("fill", "#03e9f4");
	rect.setAttribute("width", 300);
	rect.setAttribute("height", 100);
	rect.appendChild(textOnCenter(x, y, code));
}


function textOnCenter(x, y, code) {
	const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
	const COL = "#96979C"

	text.setAttribute("x", x / 2);
	text.setAttribute("y", y / 2);
	text.setAttribute("fill", COL);
	text.innerHTML = code;
	return (text);
}


function deskTopView(sizes) {
	const MAXSIZE =	900;
	const UPLEFT =	4;
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
	return ({x: layerLength, y: layerHeight});
};


function mobileView(sizes) {
	const MOBILEWIDTH =		395;
	const MOBILEHEIGHT =	198;
	const UPLEFT =			4;
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
	return ({x: layerLength, y: layerHeight});
};
