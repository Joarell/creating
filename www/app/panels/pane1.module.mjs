// ╭────────────────────────────────────────────────────╮
// │ This is the trigger activated by the crate button. │
// ╰────────────────────────────────────────────────────╯
globalThis.onstorage = () => {
	const press =	sessionStorage.getItem("pane1");
	const getter =	localStorage.getItem("refNumb");
	const copy =	sessionStorage.getItem("copy1");

	if (copy) {
		sessionStorage.removeItem("copy1");
		sessionStorage.setItem("pane1", "populate");
		return(globalThis.location.reload() && showCrates1(getter));
	};
	return(press === "populate" ?
		globalThis.location.reload() && showCrates1(getter): false
	);
};


// FIX: The panel still not showing the content sometimes.
// globalThis.onload = () => {
globalThis.addEventListener("DOMContentLoaded", () => {
	const getter =	localStorage.getItem("refNumb");
	const press =	sessionStorage.getItem("pane1");

	press === "populate" ? setTimeout(() => {showCrates1(getter)}, 50): false;
});


globalThis.addEventListener("load", () => {
	const pane = document.getElementById("crates-only");

	pane.hasChildNodes() ? true: setTimeout(() => {showCrates1(getter)}, 50);
});


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
			<th>LENGTH</th>
			<th>DEPTH</th>
			<th>HEIGHT</th>
			<th>CUBm³</th>
		</tr>
	`
	return(table.append(head));
};


// ╭───────────────────────────────────────────────────────────╮
// │ Returns all crates from the indexedDB or gets from cloud. │
// ╰───────────────────────────────────────────────────────────╯
export function showCrates1(estimate){
	const request = globalThis.indexedDB.open("Results");

	request.onerror = (event) => {
		alert(`WARNING: ${event.target.errorCode}`);
	};
	request.onsuccess = () => {
		const db = request.result.transaction("Results")
			.objectStore("Results").get(estimate);

		db.onsuccess = () => {
			let metric;
			let crate;
			let i =			0;
			const crates =	db.result.crates;
			const element =	document.createElement("table");
			const pane =	document.getElementById("crates-only");
			
			localStorage.getItem("metrica") === "in - inches" ?
				metric = "in": metric = "cm";
			createHeader(element);
			while(i <= crates.length - 1){
				if(findKeyWords(crates[i]) ) {
					crate = db.result.crates[i];
					element.innerHTML += crate.map((info, index) => {
						return (
						index === 0 ? `<tr><td>${info}</td>`:
						(index === 5) || (index === 4) ? 
							`<td>${info}</td><td>${metric}</td></tr>`:
							`<td>${info}</td>`
						);
					}, 0).join("");
				}
				i++;
			};
			sessionStorage.removeItem("pane1");
			pane.appendChild(element);
		}
	}
};


function findKeyWords (target) {
	return ([
		"Crate",
		"PAX",
		"CARGO",
		"cm",
		"in"
		].includes(target[0]) ? true: false);
};
