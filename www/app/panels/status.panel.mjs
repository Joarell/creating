// ╭───────────────────────────────────────────────────────────────────╮
// │ Calls to each change on the localStorage to update the list pane. │
// ╰───────────────────────────────────────────────────────────────────╯
globalThis.onstorage = () => {
	const check =	localStorage.getItem("storage");
	const newList =	sessionStorage.getItem("FETCHED");
	const clear =	sessionStorage.getItem("clean");

	if (clear) {
		globalThis.location.reload();
		sessionStorage.removeItem("clean");
		sessionStorage.setItem("pane-1", "clear");
	};
	if (check) {
		globalThis.location.reload();
		localStorage.removeItem("storage");
	};
	newList !== null ? statusTablePopulate(newList) : false;
}

globalThis.addEventListener("load", () => {
	const stPanel =	document.getElementById("status");

	stPanel.hasChildNodes() ? true : setTimeout(() => {statusTable()}, 200);
});

globalThis.onload = () => {
	const mode =	localStorage.getItem("mode");

	changeMode(mode);
	setTimeout(statusTable, 200);
}


function changeMode (color) {
	const body = document.body.classList;

	console.log(color);
	body.remove("light-mode");
	body.remove("dark-mode");
	return (
		color === "dark" ?
			body.add("dark-mode"):
			body.add("light-mode")
	);
};


export function statusTablePopulate(data) {
	let metric;
	let codes;
	const doc =					JSON.parse(data);
	const { reference, list } =	doc;

	localStorage.getItem("metrica") === "in - inches" ?
		metric = "in - inches":
		metric = "cm - centimeters";
	localStorage.clear();
	codes = list.map((art, index) => {
		const { code } = art;
		localStorage.setItem(code, JSON.stringify(art));
		return ([index, code]);
	}, 0);
	sessionStorage.setItem("codes", JSON.stringify(codes));
	localStorage.setItem("refNumb", reference);
	localStorage.setItem("metrica", metric);
	sessionStorage.removeItem("FETCHED");
	globalThis.location.reload();
};


// ╭────────────────────────────────────────────────────╮
// │ Returns the HTML table with all works in the list. │
// ╰────────────────────────────────────────────────────╯
export function statusTable() {
	const element =	document.createElement("table");
	const plot =	document.getElementById("status");
	const list =	localStorage;
	const codes =	getOrder();
	let metric;
	
	list.getItem("metrica") === "in - inches" ? metric = "in": metric = "cm";
	createHeader(element);
	if (codes)
		codes.map(code => {
			let work;

			work = JSON.parse(list.getItem(code));
			work = Object.values(work);
			element.innerHTML += work.map((item, index) => {
				return (
					index === 0 ? `<tr><td>${item}</td>` :
					index === 3 ? `<td>${item}</td><td>${metric}</td></tr>` :
					`<td>${item}</td>`
				);
			}, 0).join("");
		});
	plot.appendChild(element);
};


function getOrder () {
	const session =		JSON.parse(sessionStorage.getItem("codes"));
	const allCodes =	session ? session.map(code => code[1]): false;
	const result =		allCodes? allCodes.reverse(): false;
	return (result ? [...new Set(result)]: false);
};


// ╭───────────────────────────────────────────────────────────────────────╮
// │ This is the header creator when the page or localStorage are updated. │
// ╰───────────────────────────────────────────────────────────────────────╯
export function createHeader(table) {
	const head = document.createElement("tr");

	head.innerHTML = `
		<tr>
			<th>CODE</th>
			<th>LENGTH</th>
			<th>DEPTH</th>
			<th>HEIGHT</th>
			<th>UNIT</th>
		</tr>
	`
	return (table.appendChild(head));
}
