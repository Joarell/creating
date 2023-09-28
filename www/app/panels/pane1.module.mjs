// ╭────────────────────────────────────────────────────╮
// │ This is the trigger activated by the crate button. │
// ╰────────────────────────────────────────────────────╯
globalThis.onstorage = () => {
	const press =	sessionStorage.getItem("pane1");
	const getter =	localStorage.getItem("refNumb");
	const copy =	sessionStorage.getItem("copy1");
	const clear =	sessionStorage.getItem("pane-1");
	const mode =	localStorage.getItem("mode");

	changeMode(mode);
	if (clear) {
		globalThis.location.reload();
		sessionStorage.removeItem("pane-1");
		sessionStorage.setItem("pane-2", "clear");
	};
	if (copy) {
		sessionStorage.removeItem("copy1");
		sessionStorage.setItem("pane1", "populate");
		return(globalThis.location.reload() && showCrates1(getter));
	};
	return(press === "populate" ?
		globalThis.location.reload() && showCrates1(getter) : false
	);
};


document.onreadystatechange = () => {
	const pane =	document.getElementById("crates-only");
	const len =		pane.childNodes.length;
	const getter =	localStorage.getItem("refNumb");
	const mode =	localStorage.getItem("mode");

	if (len && getter)
		len > 1 ? true: setTimeout(showCrates1(getter), 50);
	setTimeout(loadingPage, 2300);
	changeMode(mode);
};


function loadingPage() {
	const animation =	document.querySelector(".loading-panels");
	const pageApp =		document.querySelector(".panel-content");

	animation.style.display = "none";
	animation.setAttribute("aria-hidden", true)
	pageApp.setAttribute("aria-hidden", false)
}


function changeMode (color) {
	const body = document.body.classList;

	body.remove("light-mode");
	body.remove("dark-mode");
	return (color === "dark" ? body.add("dark-mode"): body.add("light-mode"));
};


// ╭───────────────────────────────────────────────────────────────────────╮
// │ This is the header creator when the page or localStorage are updated. │
// ╰───────────────────────────────────────────────────────────────────────╯
export function createHeader(table) {
	const head = document.createElement("tr");
	
	if(table.parentNode)
		while(table.firstChild)
			table.removeChild(table.firstChild)
	head.innerHTML =`
		<tr>
			<th>STATUS</th>
			<th>TYPE</th>
			<th>LENGTH</th>
			<th>DEPTH</th>
			<th>HEIGHT</th>
			<th>CUB</th>
			<th>UNIT</th>
		</tr>
	`
	return(table.append(head));
};


async function getIDBData (ref) {
	const WORKER = new Worker('./worker.IDB.crates.mjs');
	let request;

	WORKER.postMessage(ref);
	request = await new Promise((resolve, reject) => {
		WORKER.onmessage = (res) => {
			const { data } = res;
			data.reference === ref ? resolve(data) : reject(res);
		};
	});

	return(request);
};


function airPortStatus(crate, sizeUnit) {
	const MAXX =	sizeUnit === 'cm' ? 300 : 118.110;
	const MAXZ =	sizeUnit === 'cm' ? 200 : 78.740;
	const MAXY =	sizeUnit === 'cm' ? 165 : 64.960 ;
	const X =		crate[0][0];
	const Z =		crate[0][1];
	const Y =		crate[0][2];

	return(X <= MAXX && Z <= MAXZ && Y <= MAXY ? 'PAX' : 'CARGO');
};


function addHTMLTableLine (data, unit, table) {
	const { crates } =	data;
	const port =		airPortStatus(crates, unit);
	crates.map(crate => {
		if (crate.length === 4)
			table.innerHTML += crate.map((info, i) => {
				switch(i) {
					case 0 :
						return(`<tr><td>${port}</td><td>CRATE</td><td>${info}</td>`);
					case 1 :
						return(`<td>${info}</td>`)
					case 2 :
						return(`<td>${info}</td>`)
					case 3 :
						return(`<td>${info}</td><td>${unit}</td></tr>`);
				};
			}, 0).join("");
	}, 0);
};


// ╭───────────────────────────────────────────────────────────╮
// │ Returns all crates from the indexedDB or gets from cloud. │
// ╰───────────────────────────────────────────────────────────╯
export async function showCrates1(estimate) {
	const { crates } =	await getIDBData(estimate);
	const element =		document.createElement("table");
	const pane =		document.getElementById("crates-only");
	let key =			0;
	let metric;

	localStorage.getItem("metrica") === "in - inches" ?
		metric = "in": metric = "cm";
	createHeader(element);
	for (key in crates) {
		if (crates[key].hasOwnProperty('crates')) {
			crates[key].crates.length > 0 ?
			addHTMLTableLine(crates[key], metric, element) : false;
		};
	};
	sessionStorage.removeItem("pane1");
	pane.appendChild(finishedRender(element, crates));
};


function finishedRender(table, info) {
	table.innerHTML += `<tr>
		<td>-</td>
		<td>-</td>
		<td>-</td>
		<td>-</td>
		<td>-</td>
		<td>-</td>
		<td>-</td>
		</tr>`;
	table.innerHTML += `<tr>
		<td>AIRPORT</td>
		<td>PAX</td>
		<td>${info.wichAirPort[0].PAX}</td>
		</tr>`;
	table.innerHTML += `<tr>
		<td>AIRPORT</td>
		<td>CARGO</td>
		<td>${info.wichAirPort[1].CARGO}</td>
		</tr>`;
	table.innerHTML += `<tr>
		<td>Total Cub:</td>
		<td>${info.airCubTotal}</td>
		</tr>`;
	return(table);
};
