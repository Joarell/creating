const cub_calc = require("./cubing.js");
const sort = require("./sort.js");


function noCanvasOut(list, len, others)
{
	if (len === 0)
		return ;
	len--;
	if (list[len][2] > 11)
		others.push(list.splice(len, 1));
	return noCanvasOut(list, len, others);
}


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


//This function validates the limit of a pax (passanger) flight. The actual PAX limit is: 300 x 200 x 160 -cm 
function limit(list, new_size)
{
	const x = 300;
	let len;

	if (new_size[0] > x)
	{
		len = list.length;
		while (new_size[0] > x)
		{
			new_size[0] - list[len][1];
			len--;
		}
	}
	return (new_size);
}


//This function provides the standard size of the crate base on the largest works on the list.
function largestWorks(list, size)
{
	let x;
	let y;
	let len;

	x = [];
	y = [];
	len = 0;
	while (len < list.length)
	{
		if(size[1] < 100)
			x.push(list[len][1])
		else
			y.push(list[len][3])
		len++;
	}
	if(x)
	{
		x = x.reduce((sum, value) => {
			return (sum + value);
		}, 0);
		size.splice(0, 1);
		size.unshift(x + 10);
		limit(list, size);
		return (size);
	}
	else
	{
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

module.exports = { standardLayer, nextWorkNinety, cubVersionList, noCanvasOut, largestWorks };
