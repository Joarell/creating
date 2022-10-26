const next_work = require("./next.work.checker.js");

const man = require("./procedures.adm.js");


function theEnd(list, gru, vcp, g_crates, g_cub, v_crates, v_cub) {
	if (v_crates.length === 0 && g_crates.length > 0) {
		gru = ["GRU", g_crates, "cub", g_cub];
		return (list.push(gru));
	}
	else if (v_crates.length > 0 && g_crates.length === 0) {
		vcp = ["VCP", v_crates, "cub", v_cub];
		return (list.push(vcp));
	}
	else if (v_crates && g_crates > 0) {
		gru = ["GRU", g_crates, "cub", g_cub];
		vcp = ["VCP", v_crates, "cub", v_cub];
		list.push(gru);
		list.push(vcp);
		return (list);
	} else
		return (list);
}

//This function provides which will be the airport to ship all the crates, or
//partially between them based on the provided list.
function whichAirport(proc_list) {
	let gru;
	let vcp;
	let i;
	let g_crates;
	let v_crates;
	let g_cub;
	let v_cub;
	let pax_lim;

	i = 0;
	g_crates = 0;
	g_cub = 0;
	v_crates = 0;
	v_cub = 0;
	pax_lim = [300, 200, 160];
	while (i < proc_list.length) {
		if (proc_list[i][0] === "Final" && proc_list[i][1] <= pax_lim[0] &&
			proc_list[i][2] <= pax_lim[1] && proc_list[i][3] <= pax_lim[2]) {
			g_crates++;
			g_cub += proc_list[i][4]
		}
		else if (proc_list[i][0] === "Final") {
			v_crates++;
			v_cub += proc_list[i][4]
		}
		i++;
	}
	return (theEnd(proc_list, gru, vcp, g_crates, g_cub, v_crates, v_cub));
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
	proc_list = man.firstThingFirst(the_list);
	crates = man.sameSizesChecker(proc_list);
	layer = proc_list.length;
	next_work.noCanvasOut(proc_list, layer, largests);
	if (largests.length != 0) {
		if (crates.length > 0)
		crates = crates.concat(man.largest(largests, crates, std_layer));
		else
		crates = man.largest(largests, crates, std_layer);
	}
	else
	next_work.noCanvasOut(proc_list, layer, largests)
	crates = man.lastStep(std_layer, proc_list, 0, crates);
	return (whichAirport(man.finishedDimensions(crates)));
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
