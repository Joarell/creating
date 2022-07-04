let cube_size = require ("./cubing.js");
const work_list =
{
	1298: "200, 05, 100",
	123: "100, 05, 100",
	5908: "150, 05, 90",
	8899: "120, 03, 100",
	777: "50, 03, 50"
}

// This function is needed to get the string values from the Object and parse them to int.
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

// This function is resonsible to get the dimensions from the list.
function get_dimensions(w_list, work)
{
	let i = 0;
	let hold = 0; 
	let dimensions = [];

	while (i < work)
	{
		hold = (Object.values(w_list)[i]);
		dimensions.push(split_int(hold));
		i++;
	}
	return dimensions;
}

// function get_code(w_list)
// {
// 	let code = 0;
// 	let works = [];
//
// 	while (code < Object.keys(w_list).length)
// 	{
// 		works.push(Object.keys(w_list)[code]);
// 		code++;
// 	}
// 	return works;
// }

function sort(w_list)
{
	let work = 0;
	let i = 0;
	let j = 1;
	let key = 0;

	for (i in w_list)
	{
		key = get_dimensions(Object.values(w_list)[j]);
		work = get_dimensions(Object.values(w_list)[i]);
		key = cube_size.cubing(key);
		work = cube_size.cubing(work);

		i = j - 1;
		whiel (i >= 0 && work > key)
		{
			w_list
		}
	}
}

// let first = Object.values(work_list)[0];
// let test = Object.values(work_list)[0];
// console.log(get_dimensions(work_list));
// test = test.split(",")
// let first = get_code(work_list);
console.log(get_dimensions(Object.values(work_list)[0], 1));
console.log(cube_size(get_dimensions(Object.values(work_list)[0])));
