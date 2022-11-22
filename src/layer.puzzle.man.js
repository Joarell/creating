const next_work = require("./next.work.checker.js");
const sort = require("./sort.system.js");


//This function returns the the swap of the work dimensions.
//It emulates turning 90 degrees angle to fit into the empty crate size.
function workSwapNinety(work) {
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
function fitingCrate(c_sizes, p_sizes) {
	let result;
	let x;
	let y;
	let arrange = 1;

	if ((c_sizes[0] === p_sizes[0] && c_sizes[1] === p_sizes[1]) ||
		(c_sizes[1] === p_sizes[0] && c_sizes[0] === p_sizes[1]))
		return (result = [0, 0]);
	while (arrange--) {
		if (c_sizes[0] >= p_sizes[0] && c_sizes[1] > p_sizes[1] &&
			c_sizes[1] - p_sizes[1] > c_sizes[0] / 4) {
			x = c_sizes[0];
			y = c_sizes[1] - p_sizes[1];
		}
		else if ((c_sizes[0] >= p_sizes[0] && c_sizes[1] >= p_sizes[1])) {
			x = c_sizes[0] - p_sizes[0];
			y = c_sizes[1];
		}
		else {
			workSwapNinety(p_sizes);
			arrange++;
		}
	}
	return (result = [x, y]);
}


//This function is responsible to fit the works in to the crate layers.
function labor(crate_dim, works, layer, crate) {
	let piece;
	let len;
	let spin;

	spin = [0];
	piece = [];
	len = next_work.nextWorkNinety(crate_dim, works, works.length, spin);
	if (len === -1 || works.length === 0)
		return;
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
function arrayLess(list) {
	len = list.length;
	while (len--) {
		list = list.concat(list[len]);
		list.splice(len, 1);
	}
	return (list);
}


//This function return the crate with possible works on the list and the reset
//size of the crate until 4 layers.
function crateArrange(standard_size, list, layer)
{
	let tmp = [];
	let crate_defined = [];

	while (layer++ <= 3 && list.length > 0) {
		crate_defined.push(layer);
		tmp = Array.from(standard_size);
		labor(tmp, list, layer, crate_defined);
	}
	return (arrayLess(crate_defined));
}


module.exports = { crateArrange, arrayLess, labor, fitingCrate, crateArrange, };
