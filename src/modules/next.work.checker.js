const extra_math = require("./extras.math.js");
const sort = require("./sort.system.js");


//This functions returns a new list with the largest works found in the previous
//one.
function noCanvasOut(list, len, others) {
	if (len === 0)
		return;
	len--;
	if (list[len][2] > 11)
		others.push(list.splice(len, 1));
	return noCanvasOut(list, len, others);
}


//This function returns the available work to be set in to the actual crate 
//dimension and it emulates turning 90 degrees motion to try each work can fit
//into the crate.
function nextWorkNinety(crate_dim, works, len, spinning) {
	let sizes;

	if (len == 0)
		return len;
	len--;
	while (len >= -1) {
		sizes = [works[len][1]];
		sizes.push(works[len][3]);
		if (crate_dim[0] >= sizes[0] && crate_dim[1] >= sizes[1])
			return len;
		else {
			sizes = [works[len][3]];
			sizes.push(works[len][1]);
			if (crate_dim[0] >= sizes[0] && crate_dim[1] >= sizes[1]) {
				spinning[0] = 1;
				return len;
			}
		}
		len--;
		if (len < 0)
			return len;
	}
	return len;
}


//This function provides the cub calculation to each works sizes.
function cubVersionList(works) {
	let i = 0;

	while (i <= works.length - 1) {
		works[i].push(extra_math.cubing(works[i]));
		i++;
	}
	return (works);
}


//This function validates the limit of a pax (passenger) flight. The actual PAX
//limit is: 300 x 200 x 160 -cm 
function limit(list, new_size) {
	const x = 300;
	let len;

	if (new_size[0] > x) {
		len = list.length;
		while (new_size[0] > x) {
			new_size[0] - list[len][1];
			len--;
		}
	}
	return (new_size);
}


//This function provides the standard size of the crate base on the largest 
//works on the list.
function largestWorks(list, size) {
	let x;
	let y;
	let len;

	x = [];
	y = [];
	len = 0;
	while (len < list.length) {
		if (size[1] < 100)
			x.push(list[len][1])
		else
			y.push(list[len][3])
		len++;
	}
	if (x != 0) {
		x = x.reduce((sum, value) => {
			return (sum + value);
		}, 0);
		size.splice(0, 1);
		size.unshift(x + 10);
		limit(list, size);
		return (size);
	}
	else {
		y = y.reduce((sum, value) => {
			return (sum + value);
		}, 0);
		size.splice(1, 1);
		size.push(y + 10);
		limit(list, size);
		return (size);
	}
}


//This function is responsible to provide the standard crate dimension based on
//the last half of the list.
function standardLayer(works) {
	let crate_dim = [];
	let i;
	let x = [];
	let y = [];
	let swap;

	i = works.length;
	x.push(works[i - 1][1]);
	y.push(works[i - 1][3]);
	swap = 0;
	while (i-- > (works.length / 2)) {
		if (works[i][1] > x[0])
			x[0] = works[i][1];
		else if ((i < works.length - 1) && (works[i][3] >= works[i + 1][3] ||
			works[i][3] >= works[i + 1][1]) && (works[i][3] > swap)) {
			swap = y[0];
			y[0] = works[i][3];
		}
	}
	if (y > x) {
		swap = x;
		x = y;
		y = swap;
	}
	crate_dim.push(x[0]);
	crate_dim.push(y[0]);
	return (crate_dim);
}

module.exports = { standardLayer, nextWorkNinety, cubVersionList, noCanvasOut, largestWorks };
