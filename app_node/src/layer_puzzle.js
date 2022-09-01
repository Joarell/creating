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


let next_work = require("./next_work.js");
let sort = require("./sort.js");


function workSwapNinety(work)
{
	let x;
	let y;
	let tmp = [];

	x = work[0];
	y = work[1];
	work.splice(0, work.length);
	work.push(y);
	work.push(x);

	return (work);
}

function featingCrate(crate_sizes, piece_sizes)
{
	let result = [];
	let x;
	let y;
	let arrange = 1;

	while (arrange--)
	{
		if ((crate_sizes[0] >= piece_sizes[0] && crate_sizes[1] > piece_sizes[1]) ||
		(crate_sizes[0] > piece_sizes[0]
		&& crate_sizes[0] < crate_sizes[1]))
		{
			x = crate_sizes[0];
			y = crate_sizes[1] - piece_sizes[1];
		}
		else if ((crate_sizes[0] > piece_sizes[0] && crate_sizes[1] == piece_sizes[1]))
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


//This function is responsible to feat the works in to the crate layers.
function labor(crate_dim, works, layer, crate)
{ 
	let piece = [];
	let len;
	let new_size;

	len = next_work.nextWorkNinety(crate_dim, works, works.length);
	if (len > 0)
	{
		piece.push(works[len][1]);
		piece.push(works[len][3]);
	}
	else if (len <= 0)
	{
		crate.push(works.splice(0, 1));
		return ;
	}
	new_size = featingCrate(crate_dim, piece);
	crate_dim.splice(0, 2);
	crate_dim.push(new_size[0]);
	crate_dim.push(new_size[1]);
	crate.push(works.splice(len, 1));
	return labor(crate_dim, works, layer, crate);
}


//This function returns the all the crates needed accordingly the work list.
function solveList(the_list)
{
	let crate_finished = [];
	let crates = [];
	let standard_layer = [];
	let n_crate = 0;
	let layer;
	let new_list;
	let tmp = [];

	new_list = sort.getDimensions(the_list);
	new_list = sort.quickSort(next_work.cubVersionList(new_list), 4);
	layer = 1;
	while(new_list.length > 0)
	{
		if (layer === 1)
		{
			standard_layer = next_work.standardLayer(new_list);
		}
		else if (layer === 5 )
		{
			n_crate++;
			crates.push(n_crate);
			crate_finished.pop();
			crates[1] = crates.concat(crate_finished);
			crate_finished.splice(0, crate_finished.length);
			layer = 1;
			standard_layer = next_work.standardLayer(new_list);
		}
		tmp.push(standard_layer[0]);
		tmp.push(standard_layer[1]);
		labor(tmp, new_list, layer, crate_finished);
		layer++;
		tmp.splice(0, 2);
	}
	if (crates.length == 0)
		return crate_finished;
	else if (crate_finished.length > 0)
	{
		n_crate++;
		crate_finished.pop();
		crates.push(n_crate);
		crates = crates.concat(crate_finished);
	}
	console.log(crates);
	return crates;
}


module.exports = { solveList };
let arrange = solveList(work_list);
console.log(arrange);

