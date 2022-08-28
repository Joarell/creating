let cub_calc = require("./cubing.js");
let sort = require("./sort.js");


//This function returns the available work to be set in to the actual crate
//dimension.
function nextWork(crate_dim, works, len)
{
	let sizes;
	
	if (len == 0)
		return len;
	len--;
	while (len >= -1)
	{
		sizes = [works[len][1]];
		sizes.push(works[len][3]);
		if (crate_dim[0] >= sizes[0] && crate_dim[1] >= sizes[1])
			return len;
		else
		{
			sizes = [works[len][3]];
			sizes.push(works[len][1]);
			if (crate_dim[0] >= sizes[0] && crate_dim[1] >= sizes[1])
				return len;
		}
		len--;
		if (len < 0)
			return len;
	}
	return len;
}


//This function provides the cub calcultion to each works sizes.
function cubVersionList(works)
{
	let i = 0;

	while (i <= works.length - 1)
	{
		works[i].push(cub_calc.cubing(works[i]));
		i++;
	}
	return (works);
}


//This function is responsible to provide the standard crate dimension.
function standardLayer(works)
{
	let crate_dim = [];
	let list;
	let sort_list;
	let i;
	let x;
	let y;
	
	list = sort.getDimensions(works);
	sort_list = sort.quickSort(cubVersionList(list), 4);
	i = sort_list.length;
	x = sort_list[i - 1][1];
	y = sort_list[i - 1][3];

	while (i-- > (sort_list.length / 2))
	{
		if (sort_list[i][1] > x)
			x = sort_list[i][1];
		if (sort_list[i][3] > y)
			y = sort_list[i][3];
	}
	crate_dim.push(x);
	crate_dim.push(y);
	return (crate_dim);
}

module.exports = { standardLayer, nextWork };
