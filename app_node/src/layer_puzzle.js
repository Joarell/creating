//	8 - Eliminar as variavies globais;

const work_list = {

	1298: "200, 05, 100",
	123: "100, 05, 100",
	5908: "150, 05, 90",
	8899: "120, 03, 100",
	777: "50, 03, 50",
	8980: "30, 03, 30",
	71234: "30, 03, 30",
	1111: "30, 03, 30",
	2313: "30, 03, 30"
}


let sort_list = require("./sort.js");
sort_list = sort_list.i_sort(work_list);

let crate_finished = [];
let standard_layer = sort_list.pop();

//The crate_finished is a global variabel responsible to get all layers to each crate designed in the labor recursion.
crate_finished.push(standard_layer);
crate_finished.unshift(1);
standard_layer = standard_layer[1];


//This function returns the optimize arrays to each layer.
function layer_done(work_done, layer)
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


//This function returns the available work to be set in to the actual crate dimension.
function next_work(crate_dim, works, len)
{
	let sizes;
	
	if (len == 0)
		return len;
	len--;
	sizes = works[len][1];
	while (len >= -1)
	{
		if (crate_dim >= sizes)
			return len;
		len--;
		if (len < 0)
			return len;
		sizes = works[len][1];
	}
	return len;
}


//This function is responsible to feat the works in to the crate layers.
function labor(crate_dim, works, layer, crate)
{ 
	let filled;
	let len;

	len = next_work(crate_dim, works, works.length);
	if (len > 0)
		filled = works[len][1];
	if (len == 0)
	{
		crate.unshift(works.splice(0, 1));
		crate = layer_done(crate, layer);
		return solve_start_line(works, layer + 1, crate);
	}
	else
	{
		crate.unshift(works.splice(len, 1));
	}
	labor(crate_dim - filled, works, layer, crate);
}


//This function is responsible to the limit of the crate layers.
function solve_start_line(work_list, layer, crate)
{	
	let empt = [];

	if (work_list.length < 0 || layer >= 5)	
	{
		return crate_finished;		
	}
	if(crate.length > 1)
		crate_finished.push(crate);
	labor(standard_layer, work_list, layer, empt);
}


//This function returns the all the crates needed accordingly the work list provided.
function solve_list(sort_list)
{
	let new_crate = 0;
	let crates = [crate_finished];

	while(sort_list.length > 0)
	{
		new_crate++;
		crates.push(solve_start_line(sort_list, 2, crates));
		crates.unshift(new_crate);
	}
	return crates;
}


module.exports = { solve_list };
