const next_work = require("./next_work.js");
const sort = require("./sort.js");


//This function returns the the swap of the work dimensions.
//It emulates turning 90 degrees angle to fit into the empty crate size.
function workSwapNinety(work)
{
	let x;
	let y;

	x = work[0];
	y = work[1];
	work.splice(0, work.length);
	work.push(y);
	work.push(x);

	return (work);
}


//This function returns the new empty size into the crate after subtract the
//dimensions between crate and piece sizes.
function fitingCrate(crate_sizes, piece_sizes)
{
	let result;
	let x;
	let y;
	let arrange = 1;

	if((crate_sizes[0] === piece_sizes[0] && crate_sizes[1] === piece_sizes[1]) ||
	(crate_sizes[1] === piece_sizes[0] && crate_sizes[0] === piece_sizes[1]))
		return	(result = [0, 0]);
	while (arrange--)
	{
		if ((crate_sizes[0] >= piece_sizes[0] && crate_sizes[1] > piece_sizes[1]) ||
		(crate_sizes[0] > piece_sizes[0] && crate_sizes[0] < crate_sizes[1]))
		{
			x = crate_sizes[0];
			y = crate_sizes[1] - piece_sizes[1];
		}
		else if ((crate_sizes[0] > piece_sizes[0] && crate_sizes[1] <= piece_sizes[1]))
		{
			x = crate_sizes[0] - piece_sizes[0];
			y = crate_sizes[1];
		}
		else
		{
			workSwapNinety(piece_sizes);
			arrange++;
		}
	}
	return (result = [x, y]);
}


//This function is responsible to fit the works in to the crate layers.
function labor(crate_dim, works, layer, crate)
{ 
	let piece = [];
	let len;

	len = next_work.nextWorkNinety(crate_dim, works, works.length);
	if (len <= 0)
	{
		crate.push(works.splice(0, 1));
		return ;
	}
	piece.push(works[len][1]);
	piece.push(works[len][3]);
	crate_dim = Array.from(fitingCrate(crate_dim, piece));
	crate.push(works.splice(len, 1));
	return labor(crate_dim, works, layer, crate);
}


//This function eliminates the extra array provided by labor and
//noCanvasOut functions.
function arrayCleaner(list)
{
	len = list.length;
	while (len--)
	{
		list = list.concat(list[len]);
		list.splice(len, 1);
	}
	return (list);
}


//This function provides the crate with all possible works inside.
function crateArrange(standard_size, list, layer)
{
	let tmp = [];
	let crate_defined = [];

	while (layer++ <= 3 && list.length > 0)
	{
		crate_defined.push(layer);
		tmp = Array.from(standard_size);
		labor(tmp, list, layer, crate_defined);
	}
	return (arrayCleaner(crate_defined));
}


//This function returns the all the crates needed accordingly the work list.
function solveListProcedure(the_list)
{
	let crates_done = [];
	let standard_layer = [];
	let new_list;
	let largests = []

	new_list = sort.getDimensions(the_list);
	new_list = sort.quickSort(next_work.cubVersionList(new_list), 4);
	next_work.noCanvasOut(new_list, new_list.length, largests);
	layer = 0;
	while (new_list.length > 0)
	{
		if (largests != 0)
		{
			largests = arrayCleaner(largests);
			standard_layer = next_work.standardLayer(largests);
			standard_layer = next_work.largestWorks(largests, standard_layer);
			crates_done = crates_done.concat(crateArrange(standard_layer, largests, layer));
			crates_done.push(standard_layer);
		}
		else
		{
			standard_layer = next_work.standardLayer(new_list);
			crates_done = crates_done.concat(crateArrange(standard_layer, new_list, layer));
			crates_done.push(standard_layer);
			layer = 0;
		}
	}
	return (crates_done);
}

module.exports = { solveListProcedure };
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
	8877: "160, 05, 160", //third
	7777: "100, 05, 160",
	8888: "45, 45, 45",
	90890: "50, 50, 50",
	12345: "100, 10, 190"
}

console.log(solveListProcedure(work_list));
