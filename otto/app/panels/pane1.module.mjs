// ╭────────────────────────────────────────────────────╮
// │ This is the trigger activated by the create button. │
// ╰────────────────────────────────────────────────────╯
globalThis.addEventListener("storage", async () => {
	const press =	sessionStorage.getItem("pane1");
	const getter =	localStorage.getItem("refNumb");
	const copy =	sessionStorage.getItem("copy1");
	const mode =	localStorage.getItem("mode");
	const works =	sessionStorage.getItem("codes");
	const fetched =	sessionStorage.getItem("FETCHED");

	changeMode(mode);
	if (press) {
		sessionStorage.removeItem("pane1");
		press === "populate" && fetched ?
			await Promise.resolve(globalThis.location.reload())
			.then(showCrates1(getter))
			.then(sessionStorage.setItem("pane2", "populate"))
			.finally(sessionStorage.removeItem('pane1')):
			await Promise.resolve(sessionStorage.setItem("pane2", "clear"))
			.finally(globalThis.location.reload());
	}
	else if (copy && works) {
		sessionStorage.removeItem("copy1");
		globalThis.location.reload();
	};
}, true);

globalThis.document.onreadystatechange = () => {
	const pane =	document.getElementById("crates-only");
	const len =		pane.childNodes.length;
	const getter =	localStorage.getItem("refNumb");
	const mode =	localStorage.getItem("mode");
	const grants =	sessionStorage.getItem("tier");

	if (len && getter)
		len > 1 ? true : setTimeout(() => showCrates1(getter), 50);
	setTimeout(loadingPage, 2300);
	changeMode(mode);
	grants === "OFF" || grants === "FULL" ?
		globalThis.navigator.serviceWorker.register("./sw.pane1.mjs"): false;
};

function loadingPage() {
	const animation =	document.querySelector(".loading-panels");
	const pageApp =		document.querySelector(".panel-content");

	animation.style.display = "none";
	animation.setAttribute("aria-hidden", true);
	pageApp.setAttribute("aria-hidden", false);
}

function changeMode(color) {
	const body = document.body.classList;

	body.remove("light-mode");
	body.remove("dark-mode");
	return color === "dark" ? body.add("dark-mode") : body.add("light-mode");
}

// ╭───────────────────────────────────────────────────────────────────────╮
// │ This is the header creator when the page or localStorage are updated. │
// ╰───────────────────────────────────────────────────────────────────────╯
export function createHeader(table) {
	const head = document.createElement("tr");

	while (table.firstChild) table.removeChild(table.firstChild);
	head.innerHTML = `
		<tbody><tr>
			<th>STATUS</th>
		<th>TYPE</th>
			<th>LENGTH</th>
		<th>DEPTH</th>
			<th>HEIGHT</th>
		<th>CUB</th>
			<th>UNIT</th>
		</tr></tbody>
	`;
	return table.append(head);
}

async function getIDBINFO(ref) {
	const WORKER = new Worker(
		new URL("./worker.IDB.crates.mjs", import.meta.url),
		{ type: "module" },
	);
	let request;

	WORKER.postMessage(ref);
	request = await new Promise((resolve, reject) => {
		WORKER.onmessage = (res) => {
			const { data } = res;
			data?.reference === ref ? resolve(data) : reject(res);
		};
	});
	return request;
}

function airPortStatus(create, sizeUnit) {
	const MAXX = sizeUnit === "cm" ? 300 : 118.11; // INFO: cm and in max size
	const MAXZ = sizeUnit === "cm" ? 200 : 78.74; // INFO: cm and in max size
	const MAXY = sizeUnit === "cm" ? 165 : 64.96; // INFO: cm and in max size
	const X = create[0];
	const Z = create[1];
	const Y = create[2];

	return X <= MAXX && Z <= MAXZ && Y <= MAXY ? "PAX" : "CARGO";
}

function addHTMLTableLine(data, unit, table) {
	const { crates } = data;

	crates.map((create, i) => {
		if (i % 2 === 0) {
			const port = airPortStatus(create, unit);
			table.innerHTML += create
				.map((info, i) => {
					switch (i) {
						case 0:
							return `<tbody><tr><td>${port}</td><td>CREATE</td><td>${info}</td>`;
						case 1:
							return `<td>${info}</td>`;
						case 2:
							return `<td>${info}</td>`;
						case 3:
							return `<td>${info}</td><td>${unit}</td></tr></tbody>`;
					}
				}, 0)
				.join("");
		}
	}, 0);
}

// ╭───────────────────────────────────────────────────────────╮
// │ Returns all crates from the indexedDB or gets from cloud. │
// ╰───────────────────────────────────────────────────────────╯
export async function showCrates1(estimate) {
	const { crates } =	await getIDBINFO(estimate);
	const element =		document.createElement("table");
	const pane =		document.getElementById("crates-only");
	let key =			0;
	let metric;

	if (!crates) return;
	localStorage.getItem("metrica") === "in - inches"
		? (metric = "in")
		: (metric = "cm");
	createHeader(element);
	for (key in crates) {
		if (crates[key].hasOwnProperty("crates")) {
			crates[key].crates.length > 0
				? addHTMLTableLine(crates[key], metric, element)
				: false;
		}
	}
	sessionStorage.removeItem("pane1");
	pane.appendChild(finishedRender(element, crates));
	return "done";
}

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
		<td>${info.whichAirPort[0].PAX}</td>
		</tr>`;
	table.innerHTML += `<tr>
		<td>AIRPORT</td>
		<td>CARGO</td>
		<td>${info.whichAirPort[1].CARGO}</td>
		</tr>`;
	table.innerHTML += `<tr>
		<td>Total Cub:</td>
		<td>${info.airCubTotal}</td>
		</tr>`;
	return table;
}
