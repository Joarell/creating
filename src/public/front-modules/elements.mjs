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

	if(localStorage.getItem("metrica") === "in - inches")
		metric = "in";
	else
		metric = "cm";
	i = 0;
	createHeader();
	while (localStorage.key(i)) {
		if(localStorage.key(i) !== "metrica"){
			work = JSON.parse(localStorage.getItem(localStorage.key(i)));
			work = Object.values(work);
			plot.innerHTML += work.map((item, index) => {
				if (index === 3){
					return(
						`<th>${item}</th>
						<th>${metric}</th>`
					);
				}
				return(`<th>${item}</th>`);
			}, 0).join("");
		}
		i++;
	}
}

// ╭──────────────────────────────────────────────────────────────────────────╮
// │ // This is the header creator when the page or localStorage are updated. │
// ╰──────────────────────────────────────────────────────────────────────────╯
function createHeader(){
	const element = document.getElementById("sizes");
	const head = document.createElement("tr");
	
	if(element.parentNode){
		while(element.firstChild)
			element.removeChild(element.firstChild)
	}
	head.innerHTML =`
		<tr>
			<th>CODE</th>
			<th>LENGTH</th>
			<th>DEPTH</th>
			<th>HEIGHT</th>
		</tr>
	`
	return(element.appendChild(head));
}
