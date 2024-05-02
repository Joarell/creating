// ╭────────────────────────────────────────────────────╮
// │ This is the trigger activated by the crate button. │
// ╰────────────────────────────────────────────────────╯
globalThis.addEventListener("storage", async () => {
	const press =		sessionStorage.getItem("pane2");
	const getter =		localStorage.getItem("refNumb");
	const copy =		sessionStorage.getItem("copy2");
	const mode =		localStorage.getItem("mode");
	const works =		sessionStorage.getItem('codes')
	const closeDialog =	document.querySelector('.side-menu');

	changeMode(mode);
	await Promise.resolve(() => {
		if (press === 'clear') {
			globalThis.location.reload();
			sessionStorage.removeItem("pane2");
			closeDialog?.getElementsByTagName('padding-dialog')?.length > 0 ?
				sessionStorage.setItem('CLOSED', 'NOW') : false;
		};
	}).then(async () => {
		if (copy && works) {
			sessionStorage.removeItem("copy2");
			await Promise.resolve(globalThis.location.reload())
				.then(showCrates2(getter))
		};
	});
	return(press && press === "populate" ? await Promise.resolve(
		globalThis.location.reload()).then(showCrates2(getter)) : false
	);
}, true);


globalThis.document.onreadystatechange = () => {
	const pane =	document.getElementById("opened-crates");
	const len =		pane.childNodes.length;
	const getter =	localStorage.getItem("refNumb");
	const mode =	localStorage.getItem("mode");

	if (len && getter)
		len > 1 ? true: setTimeout(() => showCrates2(getter), 50);
	setTimeout(loadingPage, 2300);
	changeMode(mode);
};


function loadingPage() {
	const animation =	document.querySelector(".loading-panels");
	const pageApp =		document.querySelector(".panel-content");

	animation.style.display = "none";
	animation.setAttribute("aria-hidden", true)
	pageApp.setAttribute("aria-hidden", false)
	pageApp.setAttribute("aria-hidden", true)
}


function changeMode (color) {
	const body = document.body.classList;

	body.remove("light-mode");
	body.remove("dark-mode");
	return ( color === "dark" ? body.add("dark-mode"): body.add("light-mode"));
};


// ╭───────────────────────────────────────────────────────────────────────╮
// │ This is the header creator when the page or localStorage are updated. │
// ╰───────────────────────────────────────────────────────────────────────╯
export function createHeader(table){
	const head = document.createElement("tr");

	while(table.firstChild)
		table.removeChild(table.firstChild)
	head.innerHTML =`
		<tbody><tr>
			<th>INFO</th>
			<th>DATA</th>
			<th>LENGTH</th>
			<th>DEPTH</th>
			<th>HEIGHT</th>
			<th>UNIT</th>
			<th>STATE</th>
		</tr></tbody>
	`
	return(table.appendChild(head));
};


async function getIDBDataBrowser (ref) {
	const WORKER = new Worker(
		new URL('./worker.IDB.crates.mjs', import.meta.url), { type: "module" }
	);
	let request;

	WORKER.postMessage(ref);
	request = await new Promise((resolve, reject) => {
		WORKER.onmessage = (res) => {
			const { data } = res;
			data?.reference === ref ? resolve(data) : reject(res);
		};
	});

	return(request);
};


function layerInterface(layer, num, unit) {
	const content = layer.map((info, i) => {
		switch(i) {
			case 0 :
				return(`<tbody><tr><td>LAYER-${num}</td><td>${info}</td>`);
			case 1 :
				return(`<td>${info}</td>`)
			case 2 :
				return(`<td>${info}</td>`)
			case 3 :
				return(`<td>${info}</td>`)
			case 4 :
				return(layer[i + 1] !== undefined ? `<td>${unit}</td>`:
					`<td>${unit}</td><td>N/A</td></tr></tbody>`);
			case 5 :
				return(`<td>${info}</td></tr></tbody>`);
		};
	}, 0).join("");
	return (content);
};


function addSameSizeLayerWorksLine ({ works }, table, unit, crate) {
	const AUX =		Array.isArray(works[0][0]) ? works[0] : works;
	const PAD =		28;
	const STACKED =	~~((+AUX[0][3] + +AUX[1][3]) + PAD) === crate[2];
	let tmp =		[];
	let count =		1;

	if (STACKED) {
		AUX.map((art, counter) => {
			tmp.push(art)
			if (counter % 2 === 1) {
				table.innerHTML += tmp.map(work => {
					return (layerInterface(work, count, unit));
				}).join("");
				tmp = [];
				count++;
			};
		}, 0);
	}
	else {
		AUX.map((art, count) => {
			table.innerHTML += layerInterface(art, count + 1, unit);
		});
	};
	return(table);
};


function addHTMLLayerWorksLine ({ works }, table, unit, kind, crate) {
	let layer;
	let i =	0;

	while (i < works.length) {
		if (!Array.isArray(works[i])) {
			for (layer in works[i]) {
				table.innerHTML += works[i][layer].map(info => {
					const data = Array.isArray(info) ? info : works[i][layer];
					return(layerInterface(data, i + 1, unit));
				}).join("");
			};
		}
		else if (kind === 'sameSizeCrate') {
			return(addSameSizeLayerWorksLine({ works }, table, unit, crate));
		}
		else if (Array.isArray(works[i])) {
			works.map((art, count) => {
				table.innerHTML += layerInterface(art, count + 1, unit);
			});
			return(table);
		};
		i++;
	};
	return(table);
};


function airPortStatus(crate, sizeUnit) {
	const MAXX =	sizeUnit === 'cm' ? 300 : 118.110;	// INFO: cm and in max size
	const MAXZ =	sizeUnit === 'cm' ? 200 : 78.740;	// INFO: cm and in max size
	const MAXY =	sizeUnit === 'cm' ? 165 : 64.960 ;	// INFO: cm and in max size
	const X =		crate[0];
	const Z =		crate[1];
	const Y =		crate[2];

	return(X <= MAXX && Z <= MAXZ && Y <= MAXY ? 'PAX' : 'CARGO');
};


function setStatusCrateType(kind, unit) {
	switch(kind) {
		case 'tubeCrate' :
			return(`<td>${unit}</td><td><i class="nf nf-md-cylinder"></i></td></tr></tbody>`);
		case 'largestCrate' :
			return(`<td>${unit}</td><td><i class="nf nf-fae-triangle_ruler"></i></td></tr></tbody>`);
		case 'sameSizeCrate' :
			return(`<td>${unit}</td><td><i class="nf nf-fae-equal"></i></td></tr></tbody>`);
		case 'noCanvasCrate' :
			return(`<td>${unit}</td><td><i class="nf nf-md-sync_off"></i></td></tr></tbody>`);
		case 'standardCrate' :
			return(`<td>${unit}</td><td><i class="nf nf-fa-picture_o"></i></td></tr></tbody>`);
	};
};


function addHTMLTableLine({ crates }, table, kind) {
	const UNIT = localStorage.getItem('metrica') === 'cm - centimeters' ? 'cm' : 'in';

	crates.map((done, i) => {
		if (i % 2 === 0) {
			const port = airPortStatus(done, UNIT);
			table.innerHTML += done.map((info, i) => {
				switch(i) {
					case 0 :
						return(`<tbody><tr><td>${port}</td><td>CRATE</td><td>${info}</td>`);
					case 1 :
						return(`<td>${info}</td>`)
					case 2 :
						return(`<td>${info}</td>`)
					case 3 :
						return(setStatusCrateType(kind, UNIT));
				};
			}, 0).join("");
		}
		else
			addHTMLLayerWorksLine(crates[i], table, UNIT, kind, crates[i - 1]);
	}, 0);
};


// ╭───────────────────────────────────────────────────────────╮
// │ Returns all crates from the indexedDB or gets from cloud. │
// ╰───────────────────────────────────────────────────────────╯
export async function showCrates2(estimate) {
	const { crates } =	await getIDBDataBrowser(estimate);
	const element =		document.createElement("table");
	const pane =		document.getElementById("opened-crates");
	let key;

	if(!crates)
		return ;
	createHeader(element);
	for (key in crates) {
		if (crates[key].hasOwnProperty('crates')) {
			crates[key].crates.length > 0 ?
				addHTMLTableLine(crates[key], element, key) : false;
		};
	};
	sessionStorage.removeItem("pane2");
	pane.appendChild(element);
	return('done');
};


globalThis.navigator.serviceWorker.register('./sw.pane2.mjs');
