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

	if ((crate_sizes[0] === piece_sizes[0] && crate_sizes[1] === piece_sizes[1]) ||
	(crate_sizes[1] === piece_sizes[0] && crate_sizes[0] === piece_sizes[1]))
		return	(result = [0, 0]);
	while (arrange--)
	{
		if (crate_sizes[0] >= piece_sizes[0] && crate_sizes[1] > piece_sizes[1] &&
		crate_sizes[1] - piece_sizes[1] > crate_sizes[0] / 4)
		{
			x = crate_sizes[0];
			y = crate_sizes[1] - piece_sizes[1];
		}
		else if ((crate_sizes[0] > piece_sizes[0] && crate_sizes[1] >= piece_sizes[1]))
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
	let piece;
	let len;
	let spin;

	spin = [0];
	piece = [];
	len = next_work.nextWorkNinety(crate_dim, works, works.length, spin);
	if (len === -1 || works.length === 0)
		return ;
	piece.push(works[len][1]);
	piece.push(works[len][3]);
	crate_dim = Array.from(fitingCrate(crate_dim, piece));
	crate.push(works.splice(len, 1));
	if (spin[0] != 0)
		crate[crate.length - 1][0].push("S");
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


//This function return the crate with all possible works on the list.
function crateArrange(standard_size, list, layer)//(need some fix)
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
