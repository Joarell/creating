const cub = require ("./cubing.js");


//This function is responsible to get only the sizes of the Object split with ",".
function splitInt(dimensions, codes)
{
	dimensions = dimensions.split(",");
	let work_dimensions = [];
	let i = 0;

	while (i != 3)
	{
		work_dimensions.push(parseInt(dimensions[i]));
		i++;
	}
	work_dimensions.unshift(codes);
	return work_dimensions;
}


//This function get the codes and sizes of the works from the list proveided.
function getDimensions(w_list)
{
	let i = 0;
	let hold = 0;
	let code = 0;
	let dimensions = [];

	while (i < Object.values(w_list).length)
	{
		hold = (Object.values(w_list)[i]);
		code = (Object.keys(w_list)[i]);
		dimensions.push(splitInt(hold, code));
		i++;
	}
	return dimensions;
}


//This function provides the airfreight cube to each sizes of the works in the Object list.
function cubeAll(w_list)
{
	let result = [];
	let i = 0;
	let dimensions = getDimensions(w_list);

	while(i < dimensions.length)
	{
		result.push(cub.cubing(dimensions[i]));
		i++;
	}
	return result;
}


//This function acts sorting the smallest work to the biggest one.
//The "position" argument provides the correct array position where the value is to be sorted.
function quickSort(works, position)
{
	if (works.length <= 1)
		return works;

	let left = [];
	let right = [];
	let i = 0;
	let pivot = [works[0]];

	while (i++ < works.length - 1)
	{
		works[i][position] <= pivot[0][position] ? left.push(works[i]) : right.push(works[i]);
	}
	return (quickSort(left, position).concat(pivot, quickSort(right, position)));
}


//This function returns the code and cubed values in new arrays to each code baased on the its sizes.
function zipper(codes, cubes, index)
{
	let new_arranje = [];
	
	new_arranje.push(codes[index]);
	new_arranje.push(cubes[index]);
	return new_arranje;
}


//This function applies the zipper function to each code and dimensions to provide a new array
//sorted with the quickSort function.
function newArraySorted(works)
{
	let new_a = [];
	let i = 0;
	
	
	while (i < Object.values(works).length)
	{
		new_a.push(zipper(Object.keys(works), cubeAll(works), i));
		i++;
	}
	return quickSort(new_a, 1);
}

module.exports = { getDimensions, newArraySorted, quickSort };
