

globalThis.document.querySelector('.layer-button')
.addEventListener('click', (element => skip(element)));

globalThis.document.querySelector('.crates-done')
.addEventListener('change', layersNumber);

export function populateOptions(crates) {
	const list =	crates.filter(crates => crates[0] === 'Crate');
	const select =	document.getElementById('selected-crate');
	const unit =	localStorage
		.getItem("metrica") === 'cm - centimeters' ? 'cm' : 'in';

	select.innerHTML += list.map((crate, i) => {
		i++;
		return (`
			<option>
				Crate ${i} - ${crate[1]} x ${crate[2]} x ${crate[3]} - ${unit}
			</option>
		`);
	}, 0);
	layersNumber(crates);
};


function layersNumber(list) {
	if (Array.isArray(list)) {
		const layers =	changeCrateLayers(1);
		sessionStorage.setItem('layers', layers.length);
	}
	else {
		const crate =	document.getElementById('selected-crate').value;
		const layers =	changeCrateLayers(Number.parseInt(crate.split(' ')[1]));
		console.log(layers);
		sessionStorage.setItem('layers', layers.length);
	}
	sessionStorage.setItem('currentLayer', 1);
	setLayerDisplay();
};


function changeCrateLayers(num) {
	const doc =			document.getElementById('input_estimate').value;
	const list =		JSON.parse(sessionStorage.getItem(doc));
	const { crates } =	list;
	let i =				0;
	const layer =		crates.filter(element => {
		if (element[0] === 'Crate')
			i++;
		if ((i === num) && (element.length === 1)) {
			return (element);
		}
	});
	return(layer);
};


function setLayerDisplay (value) {
	const layersNum = sessionStorage.getItem('layers');
	const display = document.getElementById('layer-count');

	value === undefined ?
		display.innerText = `Current layer: 1 / ${layersNum}`:
		display.innerText = `Current layer: ${value} / ${layersNum}`;
};


function skip(button) {
	const storage =		sessionStorage;
	const layersVal =	Number.parseInt(storage.getItem('layers'));
	const currentVal =	Number.parseInt(storage.getItem('currentLayer'));
	let sum;
	
	if (button.target.id === "next") {
		sum = currentVal + 1;
		if (sum <= layersVal) {
			setLayerDisplay(sum);
			storage.setItem('currentLayer', sum);
		}
		else
			storage.setItem('currentLayer', layersVal);
	}
	else {
		sum = currentVal - 1;
		if (sum >= 1 ) { 
			setLayerDisplay(sum);
			storage.setItem('currentLayer', sum);
		}
		else
			storage.setItem('currentLayer', 1);
	}
};