const next_work = require("./next_work.js");
const sort = require("./sort.js");
const start = require("./layer_puzzle.js");
const same_size_check = require("./same_sizes.js");


//This function provides a new list with cubed values, handling with the 
//object sizes to int, and sort them based on the cube values.
function firstThingFirst(work_list) {
	let new_list;

	new_list = sort.getDimensions(work_list);
	new_list = sort.quickSort(next_work.cubVersionList(new_list), 4);
	return (new_list);
}


//This function is required when the list has sculptures or furniture.
//Just to split the list between canvas from every thing else.
function handleLargest(large_works, colector, layer) {
	large_works = start.arrayLess(large_works);
	layer = next_work.standardLayer(large_works);
	layer = next_work.largestWorks(large_works, layer);
	colector = colector.concat(start.crateArrange(layer, large_works, 0));
	colector.push(layer);
	return ;
}


// function finishedDimensions (crates) {

// }


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
	proc_list = firstThingFirst(the_list);
	crates = same_size_check.sameSizes(proc_list);
	layer = proc_list.length;
	if (crates.length != 0) {
		next_work.noCanvasOut(proc_list, layer, largests);
		if (largests.length != 0)
			handleLargest(largests, crates, std_layer);
	}
	else 
		next_work.noCanvasOut(proc_list, layer, largests)
	layer = 0;
	while (proc_list.length > 0) {
		std_layer = next_work.standardLayer(proc_list);
		crates = crates.concat(start.crateArrange(std_layer, proc_list, layer));
		crates.push(std_layer);
		layer = 0;
	}
	return (crates);
}

let test = {
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
