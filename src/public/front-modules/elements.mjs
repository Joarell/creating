// globalThis.works = elementTable();

// import ArtWork from "./classes.def.mjs";
// ╭─────────────────────────────────────────────────────────────╮
// │ // Returns the observer function to store the artwork list. │
// ╰─────────────────────────────────────────────────────────────╯
// export function observerList (n_list) {
//
// }


// ╭────────────────────────────────────────────────────╮
// │ Retunns the HTML table with all works in the list. │
// ╰────────────────────────────────────────────────────╯
export function elementTable () {
	let i;
	const list = localStorage.getItem('list');
	const plot = document.getElementById("sizes");

	i = 0;
	console.log(list);
	while (i <= list.length) {
		plot.innerHTML += list[i].vector.map(
			item => `<th>${item}</th>`
		).join("");
		i++;
	}
}
