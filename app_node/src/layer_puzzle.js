const work_list = {

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
	8877: "160, 05, 160" //third
}


let sort_list = require("./sort.js");
let next_work = require("./next_work.js");


//This function returns the optimize arrays to each layer.
function layerDone(work_done, layer)
{
	let packed = [];
	let i = 0;

	for (i in work_done)
	{
		packed.unshift(work_done[i][0]);
	}
	packed.unshift(layer);
	return packed;
}


//This function is responsible to feat the works in to the crate layers.
function labor(crate_dim, works, layer, crate)
{ 
	let filled;
	let len;

	len = nextWork(crate_dim, works, works.length);
	if (len > 0)
		filled = works[len][1];
	if (len == 0)
	{
		crate.unshift(works.splice(0, 1));
		return crate = layerDone(crate, layer);
	}
	crate.unshift(works.splice(len, 1));
	return labor(crate_dim - filled, works, layer, crate);
}


//This function returns the all the crates needed accordingly the work list.
function solveList(the_list)
{
	sort_list = sort_list.newArraySorted(the_list);
	let crate_finished = [];
	let crates = [];
	let standard_layer = 0;
	let new_crate = 0;
	let layer = 2;
	let tmp = [];

	while(sort_list.length > 0)
	{
		if (layer == 2)
		{
			standard_layer = sort_list.pop();
			crate_finished.push(standard_layer);
			crate_finished.unshift(1);
			standard_layer = standard_layer[1];
		}
		else if (layer == 4)
		{
			new_crate++;
			crates.unshift(crate_finished);
			crates.unshift(new_crate);
			crate_finished.splice(0, crate_finished.length);
			layer = 1;
		}
		crate_finished.push(labor(standard_layer, sort_list, layer, tmp));
		tmp.splice(0, tmp.length);
		layer++;
	}
	if (crates == 0)
		return crate_finished;
	return crates;
}


module.exports = { solveList };
console.log(solveList(work_list));
