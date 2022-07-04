let bigger = require ("./big_work.js");
const work_list =
{
	1298: "200, 05, 100",
	123: "100, 05, 100",
	5908: "150, 05, 90",
	8899: "120, 03, 100",
	777: "50, 03, 50"
}

function split_int(dimensions)
{
	dimensions = dimensions.split(",");
	let work_dimensions = [];
	let i = 0;

	while (i != 3)
	{
		work_dimensions.push(parseInt(dimensions[i]));
		i++;
	}
	return work_dimensions;
}

function get_dimensions(w_list)
{
	let i = 0;
	let hold = 0; 
	let dimensions = [];

	while (i <= Object.keys(w_list).length)
	{
		hold = (Object.values(w_list)[i]);
		dimensions.push(split_int(hold));
		i++;
	}
	return dimensions;
}


// function sort(work_list)
// {
//
// }

// let first = Object.values(work_list)[0];
let test = Object.values(work_list)[0];
// console.log(get_dimensions(work_list));
// test = test.split(",")
let first = split_int(work_list);

console.log(first);
