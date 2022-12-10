// import { elementTable } from '../main.mjs';
// import { list } from './functions.front.end.mjs';
//
//
// const getter = document.createElement("tr").appendChild(elementTable(list));
// globalThis.table = document.getElementById("sizes");
// globalThis.table.appendChild(getter);
//
// console.log(getter);



// import ArtWork from "./classes.def.mjs";
// ╭─────────────────────────────────────────────────────────────╮
// │ // Returns the observer function to store the artwork list. │
// ╰─────────────────────────────────────────────────────────────╯
// export function observerList (n_list) {
//
// }


// export function elementTable () {
// 	const table = document.createElement("table");
// 	const target = document.getElementById("plotter");
//
// 	table.innerHTML = `
// 		<th>CODE</th>
// 		<th>LENGTH</th>
// 		<th>DEPTH</th>
// 		<th>HEIGHT</th>
// 	`;
// 	target.appendChild(table).width = "20%";
// 	return (target);
// }


// ╭────────────────────────────────────────────────────╮
// │ Retunns the HTML table with all works in the list. │
// ╰────────────────────────────────────────────────────╯
// export function elementTable (nList) {
// 	let i;
// 	let scopeList;
// 	const plot = document.getElementById("sizes");
//
// 	i = 0;
// 	scopeList = Array.from(nList);
// 	console.log(scopeList);
// 	while (i <= scopeList.length) {
// 		plot.innerHTML += scopeList[i].vector.map(
// 			item => `<th>${item}</th>`
// 		).join("");
// 		i++;
// 	}
// }

// const test = [new ArtWork("0001", "100", "10", "100")];
// test.push(new ArtWork("AJL-1090", "200", "10", "100"));
// test.push(new ArtWork("AJL-1000", "100", "05", "100"));
// elementTable(test);
