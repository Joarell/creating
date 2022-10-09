const next_work = require("./next_work.js");
const prepare = require("./procedures.js");


function whichAirport(final_list) {
	let gru;
	let vcp;
	let i;
	let g_crates;
	let v_crates;
	let g_cub;
	let v_cub;
	let limit_pax;


	i = 0;
	g_crates = 0;
	v_crates = 0;
	limit_pax = [300, 200, 160];
	while (i < final_list.length) {
		if (final_list[i][0] === "Final" && final_list[i][1] <= limit_pax[0] &&
			final_list[i][2] <= limit_pax[1] && final_list[i][3] <= limit_pax[2]) {
			g_crates++;
			g_cub += final_list[i][4]
		}
		else if (final_list[i][0] === "Final") {
			v_crates++;
			v_cub += final_list[i][4]
		}
		i++;
	}
	if (v_crates.length === 0 && g_crates.length > 0) {
		gru = ["GRU", g_crates, "cub", g_cub];
		return (final_list.push(gru));
	}
	else if (v_crates.length > 0 && g_crates.length === 0) {
		vcp = ["VCP", v_crates, "cub", v_cub];
		return (final_list.push(vcp));
	}
	else if (v_crates && g_crates > 0) {
		gru = ["GRU", g_crates, "cub", g_cub];
		vcp = ["VCP", v_crates, "cub", v_cub];
		final_list.push(gru);
		final_list.push(gru);
		return (final_list);
	}
	else
		return (final_list);
}
//This function is responsible to handle all the steps in order to solve the
//art work list.
function boss(the_list) {
	let crates;
	let std_layer;
	let largests;
	let proc_list;
	let layer;

	largests = [];
	std_layer = [];
	proc_list = prepare.firstThingFirst(the_list);
	crates = prepare.sameSizesChecker(proc_list);
	layer = proc_list.length;
	next_work.noCanvasOut(proc_list, layer, largests);
	if (largests.length != 0) {
		if (crates.length > 0)
			crates = crates.concat(prepare.handleLargest(largests, crates, std_layer));
		else
			crates = prepare.handleLargest(largests, crates, std_layer);
	}
	else
		next_work.noCanvasOut(proc_list, layer, largests)
	crates = prepare.lastStep(std_layer, proc_list, 0, crates);
	prepare.finishedDimensions(crates);
	return (whichAirport(crates));
}

let test = {
	88800: "70, 70, 70",
	230202: "70, 70, 70",
	1298: "200, 05, 100", //first
	123: "100, 05, 100",
	5908: "150, 05, 90",
	8899: "120, 03, 100",
	777: "50, 03, 50",
	8980: "30, 03, 30",
	71234: "30, 03, 30",
	1111: "30, 03, 30",
	2313: "30, 03, 30",
	1112: "60, 05, 90",
	1897: "180, 05, 100", //second
	9897: "75, 05, 80",
	09884: "100, 05, 120",
	8745: "130, 05, 100",
	8877: "160, 05, 160", //third
	34733: "130, 05, 50",
	18988: "130, 05, 50",
	38388: "130, 05, 50",
	75784: "130, 05, 50",
	90909: "100, 05, 90",
	12345: "89, 05, 88",
	98099: "120, 03, 100",
	44444: "60, 5, 60",
	98239: "40, 5, 50",
	23984: "40, 5, 50",
	999299: "40, 5, 50",
	134144: "40, 5, 50",
	121231: "50, 5, 50",
	123: "50, 5, 50",
	9898: "50, 5, 50",
	98888: "50, 5, 50",
	11111: "60, 5, 60",
	22222: "60, 5, 60",
	33333: "60, 5, 60",
}

console.log(boss(test));
console.log(test);
