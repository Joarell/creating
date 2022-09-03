let next_work = require("./next_work.js");
let sort = require("./sort.js");


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
function featingCrate(crate_sizes, piece_sizes)
{
	let result = [];
	let x;
	let y;
	let arrange = 1;

	if((crate_sizes[0] === piece_sizes[0] && crate_sizes[1] === piece_sizes[1]) ||
	(crate_sizes[1] === piece_sizes[0] && crate_sizes[0] === piece_sizes[1]))
		return	result = [0, 0];
	while (arrange--)
	{
		if ((crate_sizes[0] >= piece_sizes[0] && crate_sizes[1] > piece_sizes[1]) ||
		(crate_sizes[0] > piece_sizes[0] && crate_sizes[0] < crate_sizes[1]))
		{
			x = crate_sizes[0];
			y = crate_sizes[1] - piece_sizes[1];
		}
		else if ((crate_sizes[0] > piece_sizes[0] && crate_sizes[1] === piece_sizes[1]))
		{
			if(crate_sizes[0] > crate_sizes[1])
			{
				x = crate_sizes[0] - piece_sizes[0];
				y = crate_sizes[1];
			}
			else
			{
				x = crate_sizes[0];
				y = crate_sizes[1] - piece_sizes[1];
			}
		}
		else
		{
			workSwapNinety(piece_sizes);
			arrange++;
		}
	}
	result.push(x);
	result.push(y);
	return (result);
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
	crate_dim = Array.from(featingCrate(crate_dim, piece));
	crate.push(works.splice(len, 1));
	return labor(crate_dim, works, layer, crate);
}


//This function provides the crate with all possble works in.
function crateArrange(standard_size, list, layer)
{
	let tmp;
	let crate_defined = [];

	while (layer++ <= 3 && list.length > 0)
	{
		crate_defined.push(layer);
		tmp = Array.from(standard_size);
		labor(tmp, list, layer, crate_defined);
	}
	return (crate_defined);
}


//This function returns the all the crates needed accordingly the work list.
function solveListProcedure(the_list)
{
	let crates_done = [];
	let standard_layer = [];
	let new_list;

	new_list = sort.getDimensions(the_list);
	new_list = sort.quickSort(next_work.cubVersionList(new_list), 4);
	layer = 0;
	while (new_list.length > 0)
	{
		standard_layer = next_work.standardLayer(new_list);
		crates_done.push(standard_layer);
		crates_done = crates_done.concat(crateArrange(standard_layer, new_list, layer));
		layer = 0;
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
	8877: "160, 05, 160" //third
}
console.log(solveListProcedure(work_list));
