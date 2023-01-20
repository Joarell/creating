// ╭──────────────────────────────────────────────────╮
// │ This is the trigger actived by the crate button. │
// ╰──────────────────────────────────────────────────╯
globalThis.onstorage = () => {
	const press = localStorage.getItem("pane2");
	const getter = localStorage.getItem("refNumb");

	if(press){
		localStorage.removeItem("pane2");
		showCrates2(getter);
	}
}


// ╭──────────────────────────────────────────────────────────────────────────╮
// │ // This is the header creator when the page or localStorage are updated. │
// ╰──────────────────────────────────────────────────────────────────────────╯
export function createHeader(table){
	const head = document.createElement("tr");
	
	if(table.parentNode){
		while(table.firstChild)
			table.removeChild(table.firstChild)
	}
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
}


// ╭───────────────────────────────────────────────────────────╮
// │ Returns all crates from the indexedDB or gets from cloud. │
// ╰───────────────────────────────────────────────────────────╯
export function showCrates2(estimate){
	const request = globalThis.indexedDB.open("Results");

	request.onerror = (event) => {
		alert(`WARNING: ${event.target.errorCode}`);
	};
	request.onsuccess = () => {
		const db = request.result.transaction("Results")
			.objectStore("Results").get(estimate);

		db.onsuccess = () => {
			let i;
			let metric;
			let crate
			const pane = document.getElementById("crates-only");
			
			i = 0;
			createHeader(pane);
			if(localStorage.getItem("metrica") === "in - inches")
				metric = "in";
			else
				metric = "cm";
			while(i++ < db.result.crates.length - 1){
				if(db.result.crates[i].length > 2){
					crate = db.result.crates[i];
					pane.innerHTML += crate.map((info, index) => {
						if (index === 5){
							`<td>${info}</td>
							<td>${metric}</td>`
						};
						return(`<td>${info}</td>`);
					}, 0).join("");
				}
			}
		}
	}
}
