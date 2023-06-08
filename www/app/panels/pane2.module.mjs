// ╭────────────────────────────────────────────────────╮
// │ This is the trigger activated by the crate button. │
// ╰────────────────────────────────────────────────────╯
globalThis.onstorage = () => {
	const press =	sessionStorage.getItem("pane2");
	const getter =	localStorage.getItem("refNumb");
	const copy =	sessionStorage.getItem("copy2");

	if (copy) {
		sessionStorage.removeItem("copy2");
		sessionStorage.setItem("pane2", "populate");
		return(globalThis.location.reload() && showCrates1(getter));
	};
	return(
		press === "populate" ?
		globalThis.location.reload() && showCrates2(getter): false
	);
};


// FIX: The panel still not showing the content sometimes.
// globalThis.onload = () => {
globalThis.addEventListener("DOMContentLoaded", () => {
	const getter =	localStorage.getItem("refNumb");
	const press =	sessionStorage.getItem("pane2");

	press === "populate" ? setTimeout(() => {showCrates2(getter)}, 50): false;
});


globalThis.addEventListener("load", () => {
	const pane = document.getElementById("opened-crates");

	pane.hasChildNodes() ? true: setTimeout(() => {showCrates2(getter)}, 50);
});


// ╭───────────────────────────────────────────────────────────────────────╮
// │ This is the header creator when the page or localStorage are updated. │
// ╰───────────────────────────────────────────────────────────────────────╯
export function createHeader(table){
	const head =		document.createElement("tr");
	
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
	return(table.appendChild(head));
};


// ╭───────────────────────────────────────────────────────────╮
// │ Returns all crates from the indexedDB or gets from cloud. │
// ╰───────────────────────────────────────────────────────────╯
export function showCrates2(estimate) {
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
			const pane =	document.getElementById("opened-crates");
			
			localStorage.getItem("metrica") === "in - inches" ?
				metric = "in": metric = "cm";
			createHeader(element);
			while(i <= db.result.crates.length - 1) {
				if(avoidWords(crates[i]) && crates[i].length > 2) {
					crate = db.result.crates[i];
					element.innerHTML += crate.map((info, index) => {
						return (
						index === 0 ? `<tr><td>${info}</td>`:
						index === 5 ? `<td>${info}</td><td>${metric}</td></tr>`:
							`<td>${info}</td>`
						);
					}, 0).join("");
				}
				i++;
			};
			sessionStorage.removeItem("pane2");
			pane.appendChild(element);
		}
	}
};


function avoidWords (target) {
	return (["PAX", "CARGO"].includes(target[0]) ? false: true);
};
