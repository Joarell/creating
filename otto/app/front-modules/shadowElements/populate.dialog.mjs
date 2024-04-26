
import CubCalc from '../../core2/CubCalc.class.mjs';
import { addNewWorksToIndexedDB } from '../link.storage.mjs';

globalThis.onload = () => populateCrates();
globalThis.onstorage = () => {
	const apply =	globalThis.sessionStorage.getItem('PopulateCrates');
	const change =		globalThis.sessionStorage.getItem('SetCrates');

	change ? alterCrateSizes() : false;
	apply ? populateCrates() : false;
};


/**
 * @function Gets all crates solved
*/
async function catchAllCrates() {
	const ref = globalThis.localStorage.getItem('refNumb');
	const WORKER = new Worker(
		new URL('../../panels/worker.IDB.crates.mjs', import.meta.url), { type: "module" }
	);
	let request;

	globalThis.sessionStorage.removeItem('ChangeCrate');
	WORKER.postMessage(ref);
	request = await new Promise((resolve, reject) => {
		WORKER.onmessage = (res) => {
			const { data } = res;
			data?.reference === ref ? resolve(data) : reject(res);
		};
	});
	return(request);
};


/**
 * @param {String} kind - One of 5 types of crate
 * @param {Array} crate - it has the crate size
 * @param {Number} num - The crate order number
*/
function setNewCrateLine(kind, crate, num) {
	const unit =	localStorage.getItem('metrica') === 'in - inches' ? 'in' : 'cm';
	const li =		document.createElement('li');
	const size =	`${crate[0]} x ${crate[1]} x ${crate[2]} - ${unit}`;
	const kindMap =	new Map();

	kindMap.set('tubeCrate', ' <i class="nf nf-md-cylinder"></i>');
	kindMap.set('largestCrate', ' <i class="nf nf-fae-triangle_ruler"></i>');
	kindMap.set('sameSizeCrate', ' <i class="nf nf-fae-equal"></i>');
	kindMap.set('noCanvasCrate', ' <i class="nf nf-md-sync_off"></i>');
	kindMap.set('standardCrate', ' <i class="nf nf-fa-picture_o"></i>');
	li.innerHTML = `<label><input type="checkbox" name="crate-${num}"> CRATE - ${num}: ${size} ${kindMap.get(kind)}</label>`;
	return(li);
};


/**
 * @function Adds all crates to the dialog menu
*/
async function populateCrates() {
	const { crates } =	await catchAllCrates();
	const frame =		document.getElementById('crate-list');
	const list =		new DocumentFragment();
	const change =		globalThis.sessionStorage.getItem('SetCrates');
	let count =			0;
	let option;

	while(frame.firstChild)
		frame.removeChild(frame.firstChild);
	for (option in crates) {
		if (crates[option].hasOwnProperty('crates')) {
			crates[option].crates.map((data, i) => {
				if (i % 2 === 0) {
					count++;
					data.pop();
					list.appendChild(setNewCrateLine(option, data, count));
				};
			}, 0);
		};
	};
	frame.appendChild(list);
	change ? globalThis.sessionStorage.setItem('pane-1', 'populate') : false;
	globalThis.sessionStorage.removeItem('PopulateCrates');
};


/**
 * @function Gets the selected crate towards be altered.
*/
async function alterCrateSizes() {
	const selectedCrates =	[];
	const list =			document.getElementById('crate-list');
	let crate =				0;
	let item;

	for (item of list.childNodes) {
		item.childNodes[0].childNodes[0].checked ? selectedCrates.push(crate) : false;
		crate++;
	};
	globalThis.sessionStorage.removeItem('PopulateCrates');
	updateCrateSizes(selectedCrates);
};


/**
 * @param {Array} sizes Array with the crates coordinates: [X, Z, Y].
 * @param {Array} list Array with the crate number to update.
*/
async function updateCrateSizes(list) {
	const SOLVED =		await catchAllCrates();
	const { crates } =	SOLVED;
	const memoCrate =	[];
	let count =			0;

	Object.entries(crates).map(data => {
		if (data[1].hasOwnProperty('crates')) {
			const { crates } = data[1];

			crates.map((info, num) => {
				if (num % 2 === 0 && +count === +list[0]) {
					addNewSize(info);
					memoCrate.push(+list[0]);
					memoCrate.push(info);
					list.shift();
				};
				num % 2 === 0 ? count++ : false;
				return(info);
			}, 0);
		};
		return(data);
	});
	updateCratesData(SOLVED, memoCrate);
	globalThis.sessionStorage.removeItem('SetCrates');
	globalThis.location.reload();
};


/**
 * @param {Array} crate The current crate size
*/
function addNewSize(crate) {
	const DEFAULTPAD =	[23, 23, 28];
	const sizes =		JSON.parse(sessionStorage.getItem('SetCrates'));
	const checkX =		DEFAULTPAD[0] >= +sizes[0];
	const checkZ =		DEFAULTPAD[1] >= +sizes[1];
	const checkY =		DEFAULTPAD[2] >= +sizes[2];

	if (!checkX || !checkZ || !checkY)
		alert('Please, recheck the input new sizes. Some value is too high');
	crate[0] = crate[0] - (DEFAULTPAD[0] - +sizes[0]);
	crate[1] = crate[1] - (DEFAULTPAD[1] - +sizes[1]);
	crate[2] = crate[2] - (DEFAULTPAD[2] - +sizes[2]);
	crate[3] = new CubCalc(crate[0], crate[1], crate[2]).cubCalcAir;
	return(crate);
};


/**
 * @param {Array} crate all crate sizes to define which airport
*/
function airPortOptions (crate) {
	const MAXX =	300;
	const MAXZ =	200;
	const MAXY =	160;

	if (Array.isArray(crate)) {
		const X = crate[0];
		const Z = crate[1];
		const Y = crate[2];

		return (!(X > MAXX || Z > MAXZ || Y > MAXY) ? 'PAX' : 'CARGO');
	};
};


/**
 * @param {Array} data all crates from solved list
 * @param {Array} newSizes new sizes to subtract from the solved crates
*/
function updateCratesData(data, newSizes) {
	let airCubTotal = 0;
	let PAX			= 0;
	let CARGO		= 0;

	data.crates.allCrates.map((crate, index) => {
		if (index === newSizes[0]) {
			crate = newSizes[1];
			newSizes.splice(0, 2);
		};
		airPortOptions(crate) === 'PAX' ? PAX++ : CARGO++;
		airCubTotal += crate[3];
		return(crate);
	}, 0);
	data.crates.airCubTotal = +(airCubTotal).toFixed(3);
	data.whichAirPort = [{ PAX, CARGO}];
	addNewWorksToIndexedDB(data);
	return(globalThis.sessionStorage.setItem('pane-1', 'populate'));
};
