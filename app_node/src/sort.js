let cub = require ("./cubing.js");

//This function is responsible to get only the sizes of the Object split with ",".
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


//This function get only the sizes of the works
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


//This function provides the airfreight cube to each sizes of the works in the Object list.
function cube_all(w_list)
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


//This function returns the code and cubed values in new arrays to each code baased on the its sizes.
function zipper(codes, cubes, index)
{
	let new_arranje = [];
	
	new_arranje.push(codes[index]);
	new_arranje.push(cubes[index]);
	return new_arranje;
}


//This function acts sorting the smallest work to the biggest one.
function i_sort(works)
{
	let i = 0;
	let j = 1;
	let new_a = [];
	let swap = [];

	while (i < Object.values(works).length)
	{
		new_a.push(zipper(Object.keys(works), cube_all(works), i));
		i++;
	}
	while(j < new_a.length)
	{
		i = j - 1;
		swap = new_a[j];
		while (i >= 0 && new_a[i][1] > swap[1])
		{
			new_a[i + 1] = new_a[i];
			i--;
		}
		new_a[i + 1] = swap;
		j++;
	}
	return new_a;
}

module.exports = { get_dimensions, i_sort };
