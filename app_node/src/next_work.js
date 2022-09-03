let cub_calc = require("./cubing.js");
let sort = require("./sort.js");


//This function returns the available work to be set in to the actual crate dimension
//and it emalutes turning 90 degrees motion to try each work can fit into the crate
function nextWorkNinety(crate_dim, works, len)
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


//This function is responsible to provide the standard crate dimension based on
//the last half of the list.
function standardLayer(works)
{
	let crate_dim = [];
	let i;
	let x;
	let y;
	let swap;
	
	i = works.length;
	x = works[i - 1][1];
	y = works[i - 1][3];

	while (i-- > (works.length / 2))
	{
		if (works[i][1] > x)
			x = works[i][1];
		if (works[i][3] > y && works[i][1] > y && works[i][3] > x)
			y = works[i][3];
	}
	if (y > x)
	{
		swap = x;
		x = y;
		y = swap;
	}
	crate_dim.push(x);
	crate_dim.push(y);
	return (crate_dim);
}

module.exports = { standardLayer, nextWorkNinety, cubVersionList };
