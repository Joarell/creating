// ╭───────────────────────────────────────────────────────────────────╮
// │ Calls to each change on the localStorage to update the list pane. │
// ╰───────────────────────────────────────────────────────────────────╯
globalThis.onstorage = () => {
	elementTable();
}
globalThis.onload = () => {
	elementTable();
}


// ╭────────────────────────────────────────────────────╮
// │ Retunns the HTML table with all works in the list. │
// ╰────────────────────────────────────────────────────╯
export function elementTable () {
	let i;
	let work;
	let metric;
	const plot = document.getElementById("sizes");
	const test = (store) =>{
		if(store !== "metrica" && store !== "pane1" && store !== "pane2"
			&& store !== "refNumb")
			return (true);
		return (false);
	}

	if(localStorage.getItem("metrica") === "in - inches")
		metric = "in";
	else
		metric = "cm";
	i = 0;
	createHeader(plot);
	while (localStorage.key(i)) {
		if(test(localStorage.key(i))){
			work = JSON.parse(localStorage.getItem(localStorage.key(i)));
			work = Object.values(work);
			plot.innerHTML += work.map((item, index) => {
				if (index === 3){
					return(
						`<td>${item}</td>
						<td>${metric}</td>`
					);
				}
				return(`<td>${item}</td>`);
			}, 0).join("");
		}
		i++;
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
			<th>CODE</th>
			<th>LENGTH</th>
			<th>DEPTH</th>
			<th>HEIGHT</th>
		</tr>
	`
	return(table.appendChild(head));
}
