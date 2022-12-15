globalThis.onstorage = () => {
	if (!sessionStorage.getItem("codes"))
		sessionStorage.setItem( "codes", []);
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
	i = 1;
	for (i in localStorage.key(i)) {
		if (localStorage.key(i) !== "metrica" && localStorage.key(i)){
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
	}
}
