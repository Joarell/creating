

globalThis.onstorage = () => {
	const apply =	globalThis.sessionStorage.getItem('ChangeCrate');
	const change =	globalThis.sessionStorage.getItem('SetCrates');

	apply ? populateCrates() : false;
	change ? alterCrateSizes.call(change) : false;
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
	li.innerHTML = `<input type="checkbox" name="crate-${num}">CRATE - ${num}: ${size} ${kindMap.get(kind)}`;
	return(li);
};


/**
 * @function Adds all crates to the dialog menu
*/
async function populateCrates() {
	const { crates } =	await catchAllCrates();
	const frame =		document.getElementById('crate-list');
	const list =		new DocumentFragment();
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
	globalThis.sessionStorage.setItem('pane-1', 'populate');
};


function alterCrateSizes() {
	const list =	document.getElementById('crate-list');
	const crates =	[];
	const LEN =		list.childNodes.length;
	let item =		0;

	console.log(LEN);
	while(LEN > item) {
		list.childNodes[item].childNodes[item].checked ? crates.push(item + 1) : false;
		item++;
	};
	console.log(crates);
	globalThis.sessionStorage.removeItem('SetCrates');
};
