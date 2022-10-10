const next_work = require("./next.work.checker.js");
const sort = require("./sort.system.js");
const start = require("./layer.puzzle.man.js");
const same_size_check = require("./same.sizes.checker.js");
const extra_math = require("./extras.math.js");


//This function provides a new list with cubed values, handling with the 
//object sizes to int, and sort them based on the cube values.
function firstThingFirst(work_list) {
	let new_list;

	new_list = sort.getDimensions(work_list);
	new_list = sort.quickSort(next_work.cubVersionList(new_list), 4);
	return (new_list);
}


//This function check if were find works with the same sizes on the list.
function sameSizesChecker(list) {
	let works_crate;

	works_crate = same_size_check.sameSizes(list);
	if (list[0] === 0) {
		works_crate = [];
		list.splice(0, 1);
		return ;
	}
	return (works_crate);
}


//This function is required when the list has sculptures or furniture.
//Just to split the list between canvas from every thing else.
function largest(large_works, layer) {
	let colector;

	large_works = start.arrayLess(large_works);
	layer = next_work.standardLayer(large_works);
	layer = next_work.largestWorks(large_works, layer);
	colector = start.crateArrange(layer, large_works, 0);
	colector.push(layer);
	return (colector);
}


//This function is responsible to invert the position of the each item in the
//list.
function invert(sizes, len, new_list) {

	if (len < 0)
		return (new_list);
	new_list.push(start.arrayLess(sizes.splice(len, 1)));
	return (invert(sizes, len - 1, new_list));
}


//This function returns the ultimate crate size.
//23, 23, and 28 are external dimensions added due to padding and wood of the
//crate after it was done.
function defineCrateSizes(inner_size, layers) {
	let x;
	let z;
	let y;
	let external_size;

	x = 23 + inner_size[0];
	if (layers > 0)
		z = 23 * layers;		
	else
		z = 23 + inner_size[1];
	if (inner_size.length > 2)
		y = 28 + inner_size[2];
	else
		y = 28 + inner_size[1];
	external_size = ['Final', x, z, y];
	external_size.push(extra_math.cubing(external_size));
	return (external_size);
}


//This is the function responsible to add the final sizes to each crate in the
// crates_done list.
function finishedDimensions(crates_done) {
	let aux;
	let map;
	let result;

	result = [];
	map = [];
	aux = 0;
	while (crates_done.length > 0) {
		if (crates_done[0] > aux)
			aux = crates_done[0];
		if (crates_done[0].length === 3)
			map.push(defineCrateSizes(crates_done[0], 0));
		else if (crates_done[0].length === 2) {
			map.push(defineCrateSizes(crates_done[0], aux));
			aux = 0;
		}
		map.push(start.arrayLess(crates_done.splice(0, 1)));
	}
	return (invert(map, map.length - 1, result));
}


//This function is responsible to handle all last works on the list and return
//the finished solved list.
function lastStep(layer_size, list, len, storage) {
	if (list.length <= 0)
		return (storage);
	layer_size = next_work.standardLayer(list);
	storage = storage.concat(start.crateArrange(layer_size, list, len));
	storage.push(layer_size);
	return (lastStep(layer_size, list, len = 0, storage));
}

module.exports = { firstThingFirst, sameSizesChecker, largest, lastStep, finishedDimensions };
