// ╭─────────────────────────────────────────────────────────────╮
// │ // Returns the observer function to store the artwork list. │
// ╰─────────────────────────────────────────────────────────────╯
// export function observerList (n_list) {
//
// }


// ╭────────────────────────────────────────────────────╮
// │ Retunns the HTML table with all works in the list. │
// ╰────────────────────────────────────────────────────╯
export function elementTable (n_list, listID) {
	document.querySelector(`${listID}`).innerHTML += n_list
		.map(item => `<lis>${item}</lis>`).join("");
}
