


// ╭───────────────────────────────────────────────────────────────────╮
// │ Calls to each change on the localStorage to update the list pane. │
// ╰───────────────────────────────────────────────────────────────────╯
globalThis.onstorage = () => {
	const check = localStorage.getItem("added");

	console.log(check);
	check !== null ? globalThis.location.reload() : false;
	check !== null ? localStorage.removeItem("added"): false;
}

globalThis.onload = () => {
	setTimeout(() => {
		elementTable();
	}, 200);
}


function testAvoidWords (store) {
	return(
		[
			"added",
			"currency",
			"coin1",
			"coin2",
			"currency",
			"metrica",
			"pane1",
			"pane2",
			"refNumb"
		].includes(store) ?
		false: true
	);
};


// ╭────────────────────────────────────────────────────╮
// │ Returns the HTML table with all works in the list. │
// ╰────────────────────────────────────────────────────╯
export function elementTable () {
	let work;
	let metric;
	let i =			0;
	const element =	document.createElement("table");
	const plot =	document.getElementById("status");

	localStorage.getItem("metrica") === "in - inches" ?
		metric = "in": metric = "cm";
	createHeader(element);
	while (localStorage.key(i)) {
		if (testAvoidWords(localStorage.key(i))){
			work = JSON.parse(localStorage.getItem(localStorage.key(i)));
			work = Object.values(work);
			element.innerHTML += work.map((item, index) => {
				return (
					index === 0 ? `<tr><td>${item}</td>`:
					index === 3 ? `<td>${item}</td><td>${metric}</td></tr>`:
					`<td>${item}</td>`
				);
			}, 0).join("");
		}
		i++;
	};
	plot.appendChild(element);
}


// ╭───────────────────────────────────────────────────────────────────────╮
// │ This is the header creator when the page or localStorage are updated. │
// ╰───────────────────────────────────────────────────────────────────────╯
export function createHeader(table){
	const head = document.createElement("tr");
	
	head.innerHTML =`
		<tr>
			<th>CODE</th>
			<th>LENGTH</th>
			<th>DEPTH</th>
			<th>HEIGHT</th>
			<th>UNIT</th>
		</tr>
	`
	return(table.appendChild(head));
}
