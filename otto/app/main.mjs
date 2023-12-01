import * as main from './front-modules/start.front.mjs';
import * as accordion from './side-menu/menu.currency.conversion.mjs';
import * as unit from './side-menu/menu.units.mjs';
import { crate, clearAll, setUnit } from './front-modules/checkout.mjs';
import { copyButton1, copyButton2 } from './panels/clip.board.caller.mjs';
import { createDB } from './front-modules/link.storage.mjs';
import { switchMode } from './front-modules/mode.color.mjs';
import { accordionController } from './side-menu/interactive.menu.mjs';
import { searchEstimate } from './side-menu/search.menu.mjs';
import { changeCrateDisplay, openDisplay } from './plotter/layer.controller.mjs';
import { layersNumber, skipLayer } from './plotter/select.menu.mjs';
import { logout } from './front-modules/logout.mjs';
import { installer } from './installation.handler.mjs';



globalThis.onkeydown = (push) => {
	const task1 = ((push.key === "Enter") && (push.ctrlKey === true));
	task1 ? crate() : false;
	const task2 = ((push.ctrlKey === true) && (push.key === "V"));
	task2 ? openDisplay() : false;
};


globalThis.document.getElementById('main-app')
	.addEventListener("click", (element => {
	
	// console.log(element.target.id);
	switch (element.target.id) {
		case "body-app" :
			accordionController(element);
			break;
		case "buttonInstall":
			installer();
			break;
		case "add-btn":
			main.catchWork();
			break;
		case "remove-btn":
			main.catchRemove();
			break;
		case "clear-btn":
			clearAll();
			break;
		case "crate-btn":
			crate();
			break;
		case "crate_btn":
			crate();
			break;
		case "copy-pane1":
			copyButton1();
			break;
		case "copy-pane2":
			copyButton2();
			break;
		case "logout":
			logout();
			break;
		case "logout-btn":
			logout();
			break;
		case "seek-btn":
			accordionController(element);
			break;
		case "search-header":
			accordionController(element);
			break;
		case "exchange-header":
			accordion.coins();
			accordion.exchangeHeader();
			accordionController(element);
			break;
		case "units-header":
			accordionController(element);
			break;
		case "button-seek":
			accordionController(element);
			break;
		case "search-btn":
			accordionController(element);
			break;
		case "ex-btn":
			accordion.coins();
			accordionController(element);
			break;
		case "exchange-btn":
			accordion.coins();
			accordionController(element);
			break;
		case "unit-btn":
			accordionController(element);
			break;
		case "units-btn":
			accordionController(element);
			break;
		case "fetch-btn":
			searchEstimate();
			break;
		case "crate-layers":
			openDisplay();
			break;
		case "layer-crate":
			openDisplay();
			break;
		case "previous":
			skipLayer(element);
			break;
		case "layer-prev":
			skipLayer(element);
			break;
		case "next":
			skipLayer(element);
			break;
		case "layer-next":
			skipLayer(element);
			break;
	}
}), true);


globalThis.document.getElementById('main-app')
	.addEventListener("change", (element => {

	// console.log(element.target.id);
	element.preventDefault();
	switch (element.target.id) {
		case "input_estimate":
			createDB();
			break;
		case "in":
			setUnit();
			break;
		case "cm":
			setUnit();
			break;
		case "dark-mode":
			switchMode('dark');
			break;
		case "light-mode":
			switchMode('light');
			break;
		case "coin1":
			accordion.coinInputOne();
			break;
		case "coin2":
			accordion.coinInputTwo();
			break;
		case "units1":
			unit.setUnitOne();
			break;
		case "units2":
			unit.setUnitTwo();
			break;
		case "selected-crate":
			layersNumber();
			changeCrateDisplay();
			break;
		default:
	};
}), true);


globalThis.document.getElementById('main-app')
	.addEventListener("input", (element => {

	// console.log('Inputs', element);
	switch (element.target.id) {
		case "coin1-input":
			accordion.getInputOne();
			break;
		case "coin2-input":
			accordion.getInputTwo();
			break;
		case "input-unit1":
			unit.getUnitOne();
			break;
		case "input-unit2":
			unit.getUnitTwo();
			break;
		default:
	};
}), true);


globalThis.onsubmit = (event) => {
	event.preventDefault();
};


globalThis.document.getElementById('estimate_getter')
	.addEventListener('keypress', (event) => {

	const BUTTON = globalThis.document.getElementById('fetch-btn');
	event.key === 'Enter' ? BUTTON.click() : false;
});


globalThis.navigator.serviceWorker.register('./sw.mjs');


globalThis.addEventListener('beforeinstallprompt', (event) => {
	event.preventDefault();
	console.log('👍', 'beforeinstallprompt', event);
	globalThis.deferredPrompt = event;
});
