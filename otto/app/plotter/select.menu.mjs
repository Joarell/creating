

import { renderLayer } from "./layer.controller.mjs";

export async function getIDBData (ref) {
	const WORKER = new Worker('../app/panels/worker.IDB.crates.mjs');
	let request;

	WORKER.postMessage(ref);
	request = await new Promise((resolve, reject) => {
		WORKER.onmessage = (res) => {
			const { data } = res;
			data.reference === ref ? resolve(data.crates) : reject(res);
		};
	});
	return(request);
}


export async function populateOptions() {
	const estimate =	localStorage.getItem("refNumb");
	const crates =		await getIDBData(estimate);
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


export async function layersNumber(list) {
	const crate =	document.getElementById('selected-crate').value;
	let selected =	+crate.split(' ')[1];
	let data =		list ?? JSON.parse(localStorage.getItem('doneList'));
	let layers;
	let key;

	for (key in data) {
		if (data[key].hasOwnProperty('crates') && selected > 0) {
			if (data[key].crates.length > 0 ) {
				if (key === 'sameSizeCrate')
					layers = data[key].crates[1].works[0].length - 1;
				else
					data[key].crates.map((box, i) => {
						if (selected === 0 && i % 2 === 1)
							key === 'tubeCrate' || key === 'noCanvasCrate' ?
								layers = 1 : layers = box.works.length;
						else if (i % 2 === 0)
							selected--;
					}, 0);
			};
		};
	};
	sessionStorage.setItem('layers', layers);
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
}
