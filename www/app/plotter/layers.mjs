

import TubeRender from './Tube.Render.class.mjs';
import StandarRender from './Standard.Render.class.mjs';
import * as coord from './layer.coordinate.mjs';
import LargestRender from './Largest.Canvas.Render.class.mjs';
import sameSizeRender from './Same.Size.Render.class.mjs';
import noCanvasRender from './Not.Canvas.Render.class.mjs';

export function plotter({ type, crate, works }, layerNum) {
	const draw =	cleanRender();
	const screen =	globalThis.screen.availWidth;
	const inCrate = [crate[0] - 23, crate[1] - 23, crate[2] - 28]
	let layerV;

	layerV = coord.getScreenProportion(screen, [inCrate[0], inCrate[2]]);
	draw.setAttribute("width", layerV.x);
	draw.setAttribute("height", layerV.y);
	switch (type) {
		case 'tubeCrate' : //Renders only the X and Y, from tubes on layer.
			draw.appendChild(new TubeRender(works, layerV, inCrate));
			break ;
		case 'largestCrate' : //Renders only X, and Y, from largest canvas on layer.
			draw.appendChild(new LargestRender(works, layerV, inCrate, layerNum));
			break ;
		case 'sameSizeCrate' : //Renders only Z, and Y, on the layer.
			layerV = coord.getScreenProportion(screen, [inCrate[1], inCrate[2]]);
			draw.appendChild(new sameSizeRender(works, layerV, inCrate, layerNum));
			break ;
		case 'noCanvasCrate' : //Renders only the X and Y, of each object.
			layerV = coord.getScreenProportion(screen, [inCrate[0], inCrate[1]]);
			draw.appendChild(new noCanvasRender(works, layerV, inCrate));
			break ;
		case 'standardCrate' : //Renders all cnvas on each layer.
			draw.appendChild(new StandarRender(works, layerV, inCrate, layerNum));
			break ;
	};
	return (draw);
}


function cleanRender() {
	const eLayer = document.querySelector(".crate-layer");

	if (eLayer.parentNode)
		while(eLayer.firstChild)
			eLayer.removeChild(eLayer.firstChild);
	return (eLayer);
};
