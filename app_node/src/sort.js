let cub = require ("./cubing.js");
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

	while (i < Object.values(w_list).length)
	{
		hold = (Object.values(w_list)[i]);
		dimensions.push(split_int(hold));
		i++;
	}
	return dimensions;
}


function cube_all(work_list)
{
	let result = [];
	let i = 0;
	let dimensions = get_dimensions(w_list);

	while(i < Object.values(w_list).length)
	{
		result.push(cub.cubing(dimensions[i]));
		i++;
	}
	return result;
}


function sort(work_list)
{
	let works = get_dimensions(work_list);
	let cube_w1 = 0;
	let cube_w0 = 0;

	for (i in works)
	{
		cube_w1 = cub.cubing(works[j]);
		cube_w0 = cub.cubing(works[j - 1]);
		whiel (i >= 0 && cube_w0 > cube_w1)
		{

		}
		j++;
		i = j - 1;
	}
}

// let first = get_codes(work_list);
// console.log(first);
console.log(Object.keys(work_list));
first = cube_all(work_list);
console.log(first);
