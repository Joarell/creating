// ╭─────────────────────────────────────────────────────────────────────────╮
// │ ╭─────────────────────────────────────────────────────────────────────╮ │
// │ │ These are the funstions to start and finishes the processo to solve │ │
// │ │                         the art works list.                         │ │
// │ │                       function finishedOp();                        │ │
// │ │                         function sumCub();                          │ │
// │ │                       function getAirport();                        │ │
// │ │                       function finalFilter();                       │ │
// │ │                      function whichAirport();                       │ │
// │ │                          function boss();                           │ │
// │ ╰─────────────────────────────────────────────────────────────────────╯ │
// ╰─────────────────────────────────────────────────────────────────────────╯

// import ArtWork from "../public/front-modules/classes.def.mjs"
import * as next_work from "./next.work.checker.mjs";
import * as man from "./procedures.adm.mjs";


// ╭────────────────────────────────────────────────────────────────────╮
// │ Returns how many crates each airport will have based on the crates │
// │                           from the list.                           │
// ╰────────────────────────────────────────────────────────────────────╯
function finishedOp(list, airports, cubs) {
	let gru;
	let vcp;

	gru = ["GRU", airports[0].GRU.length, "cub", cubs[0].gru_cub];
	vcp = ["VCP", airports[1].VCP.length, "cub", cubs[1].vcp_cub];
	list.push(gru);
	list.push(vcp);

	return (list);
}


// ╭────────────────────────────────────────╮
// │ Returns the cub value to each airport. │
// ╰────────────────────────────────────────╯
function sumCub(goals) {
	let g_cub;
	let v_cub;
	let result;

	g_cub = goals[0].GRU.reduce((sum, value) => {
		return (sum + value[4]);
	}, 0);
	v_cub = goals[1].VCP.reduce((sum, value) => {
		return (sum + value[4]);
	}, 0);
	result = [{gru_cub: g_cub}, {vcp_cub: v_cub}];
	return (result);
}


// ╭─────────────────────────────────────────────────────────────────────╮
// │ Returns which airport each crates should be delivered. The variable │
// │         "pax_lim" has the limits of the PAX airplane door.          │
// ╰─────────────────────────────────────────────────────────────────────╯
function getAirport (crates) {
	let gru;
	let vcp;
	let pax_lim;
	let trail;

	pax_lim = [300, 200, 160];
	gru = crates.filter(g_crates => {
		if (g_crates[1] <= pax_lim[0] && g_crates[2] <= pax_lim[1] &&
			g_crates[3] <= pax_lim[2])
		return (g_crates);
	});
	vcp = crates.filter(v_crates => {
		if (v_crates[1] >= pax_lim[0] || v_crates[2] >= pax_lim[1] ||
			v_crates[3] >= pax_lim[2])
		return (v_crates);
	});
	trail = [{GRU: gru}, {VCP: vcp}]
	return(trail);
}


// ╭────────────────────────────────────────────────────────────╮
// │ Filters only the final crates that has the string "Final". │
// ╰────────────────────────────────────────────────────────────╯
function finalFilter(list) {
	const found = list.filter(word => {
		if (word[0] === "Final")
			return (word);
	});
	return (found);
}


// ╭─────────────────────────────────────────────────────────────────────────╮
// │ Provides which will be the airport to ship all the crates, or partially │
// │                between them based on the provided list.                 │
// ╰─────────────────────────────────────────────────────────────────────────╯
function whichAirport(proc_list) {
	let final_crates;
	let airports;
	let cub_a_values;

	final_crates = (finalFilter(proc_list));
	airports = getAirport(final_crates);
	cub_a_values = sumCub(airports);
	return (finishedOp(proc_list, airports, cub_a_values));
}


// ╭────────────────────────────────────────────────────────────────────────╮
// │ This function is responsible to handle all the steps in order to solve │
// │                           the art work list.                           │
// ╰────────────────────────────────────────────────────────────────────────╯
export function boss(the_list) {
	let crates;
	let std_layer;
	let largest;
	let proc_list;
	let layer;

	largest = [];
	std_layer = [];
	proc_list = man.firstThingFirst(the_list);
	crates = man.sameSizesChecker(proc_list);
	layer = proc_list.length;
	next_work.noCanvasOut(proc_list, layer, largest);
	if (largest.length !== 0) {
		if (crates.length > 0)
			crates = crates.concat(man.largest(largest, crates, std_layer));
		else
			crates = man.largest(largest, crates, std_layer);
	}
	else
		next_work.noCanvasOut(proc_list, layer, largest)
	crates = man.lastStep(std_layer, proc_list, 0, crates);
	return (whichAirport(man.finishedDimensions(crates)));
}

// let test = [new ArtWork("00001", "10", "10","10")];
// test.push(new ArtWork("00002", "100", "10","100"));
// console.log(test);
// console.log(boss(test));
