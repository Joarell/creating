

import { plotter } from "./layers.mjs";


export async function getDataIDB (ref) {
	const WORKER = new Worker(
		new URL('./panels/worker.IDB.crates.mjs', import.meta.url), { type: "module" }
	);
	let request;

	WORKER.postMessage(ref);
	request = await new Promise((resolve, reject) => {
		WORKER.onmessage = (res) => {
			const { data } = res;
			data.reference === ref ? resolve(data.crates) : reject(res);
		};
	});
	return(request);
};


export async function populateOptions() {
	const estimate =	localStorage.getItem("refNumb");
	const crates =		await getDataIDB(estimate);
	const select =		document.getElementById('selected-crate');
	const unit =		localStorage
		.getItem("metrica") === 'cm - centimeters' ? 'cm' : 'in';

	if(select.hasChildNodes())
		while(select.firstChild)
			select.removeChild(select.firstChild);
	select.innerHTML = crates.allCrates.map((crate, i) => {
		i++;
		return (`
			<option>
				Crate ${i} - ${crate[0]} x ${crate[1]} x ${crate[2]} - ${unit}
			</option>
		`);
	}, 0);
	localStorage.setItem('doneList', JSON.stringify({...crates}));
	await layersNumber(crates);
};


function getCurrentCrate() {
	const crates =	JSON.parse(localStorage.getItem('doneList'));
	let crateNum =	document.getElementById('selected-crate').value.split(' ')[1];
	let key
	let works;
	let data;

	for (key in crates) {
		if (crates[key]?.hasOwnProperty('crates')) {
			crates[key].crates.map((crate, i) => {
				if (Array.isArray(crate) && --crateNum === 0) {
					works = crates[key].crates[i + 1];
					data = { type : key, crate : crate, works : works };
				}
			}, 0);
		};
	};
	return (data);
};


// ╭─────────────────────────────────────────╮
// │ Functions to preparete rendering works. │
// ╰─────────────────────────────────────────╯
export function renderLayer() {
	const display =	document.getElementById('layers');
	const crate =	getCurrentCrate();
	const layer =	+sessionStorage.getItem('numLayer');

	display.appendChild(plotter(crate, layer - 1));
};


function findLayersNumber(data, counter, key) {
	let layers;

	if (key === 'sameSizeCrate') {
		data[key].crates.map((info, i) => {
			if (counter === 0 && layers === undefined)
				layers = info.works.length;
			i % 2 === 0 || i === 0 ? counter-- : false;
		}, 0);
	}
	else
		data[key].crates.map((box, i) => {
			if (counter === 0 && i % 2 === 1)
				key === 'tubeCrate' || key === 'noCanvasCrate' ?
					layers = 1 : layers = box.works.length;
			i % 2 === 0 || i === 0 ? counter-- : false;
		}, 0);
	return({ layers , counter });
};


export async function layersNumber(list) {
	const crate =	document.getElementById('selected-crate').value;
	let selected =	+crate.split(' ')[1];
	let data =		list ?? JSON.parse(localStorage.getItem('doneList'));
	let number;
	let key;

	for (key in data) {
		if (data[key].hasOwnProperty('crates') && selected > 0) {
			if (data[key].crates.length > 0 ) {
				number = findLayersNumber(data, selected, key)
				selected = number.counter;
			};
		};
	};
	sessionStorage.setItem('layers', number.layers);
	sessionStorage.setItem('numLayer', 1);
	setLayerDisplay();
};


function setLayerDisplay (value) {
	const layersNum =	sessionStorage.getItem('layers');
	const display =		document.getElementById('layer-count');

	value === undefined ?
		display.innerText = `Current layer: 1 / ${layersNum}`:
		display.innerText = `Current layer: ${value} / ${layersNum}`;
};


export function skipLayer(button) {
	const storage =		sessionStorage;
	const layersVal =	Number.parseInt(storage.getItem('layers'));
	const currentVal =	Number.parseInt(storage.getItem('numLayer'));
	let sum;
	
	if (button.target.id === "next" || button.target.id === "layer-next") {
		sum = currentVal + 1;
		if (sum <= layersVal) {
			setLayerDisplay(sum);
			storage.setItem('numLayer', sum);
			sum--;
		}
		else {
			sum = layersVal - 1;
			storage.setItem('numLayer', layersVal);
		}
	}
	else {
		sum = currentVal - 1;
		if (sum >= 1 ) { 
			setLayerDisplay(sum);
			storage.setItem('numLayer', sum);
		}
		else {
			sum = 1;
			storage.setItem('numLayer', sum);
		}
	}
	displayClean();
	renderLayer(sum);
};


export function displayClean() {
	const display = document.querySelector(".crate-layer");

	if (display.hasChildNodes())
		while(display.firstChild)
			display.removeChild(display.firstChild)
	return ;
};
