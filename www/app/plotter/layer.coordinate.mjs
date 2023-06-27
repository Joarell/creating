

import { quickSort } from "../core/sort.system.mjs";


export async function getCrates(doc) {
	const dataIDB =	new Worker('./panels/worker.IDB.crates.mjs');
	return(new Promise((resolve, reject) => {
			dataIDB.postMessage(doc);
			dataIDB.onmessage = (solvedList => {
				solvedList.data !== undefined ?
					resolve(solvedList.data):
					reject(alert(`
"${doc}" NOT found. Please, try again or press 'Crate' button!`
				));
			});
		})
	);
};


export function spaceAvailable (art, space) {
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


export function proportion (val, pixArea, layer) {
	const layerArea = (val / layer) * pixArea;

	return (layerArea);
};


export function getScreenProportion(screenSize, layerSize) {
	const DESKTOP =	1024;

	return(
		screenSize >= DESKTOP ? deskTopView(layerSize): mobileView(layerSize)
	);
};


export function screenSize() {
	const DESKTOP =			900;
	const displaySetup =	0.880;
	const screen =			1024;
	const DISPLAY =			globalThis.screen.availWidth;
	const MOBILEWIDTH =		DISPLAY * displaySetup
	const view =			DISPLAY >= screen ? DESKTOP: MOBILEWIDTH;

	return (view);
};


export function deskTopView(sizes) {
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


export function mobileView(sizes) {
	const displaySetup =		0.880;
	const MOBILEWIDTH =		globalThis.screen.availWidth * displaySetup
	const MOBILEHEIGHT =	globalThis.screen.availHeight * displaySetup;
	let layerLength;
	let layerHeight;

	console.log(MOBILEWIDTH, MOBILEHEIGHT);
	if (sizes[0] > sizes[1]) {
		layerLength = MOBILEWIDTH;
		layerHeight = (sizes[1] / sizes[0]) * MOBILEHEIGHT;
	}
	else {
		layerHeight = MOBILEHEIGHT;
		layerLength = (sizes[0] / sizes[1]) * MOBILEWIDTH;
	}
	return ({x: layerLength, y: layerHeight});
};