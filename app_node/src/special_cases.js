const next_work = require("./next_work.js");
const sort = require("./sort.js");
const clean = require("./layer_puzzle.js");


//This function is a extension from splitSectionCrate function.
function splitSectionCrateFour(list, dimensions)
{
	let x;
	let y;
	let z;
	let definition;
	let major;
	let i;

	x = dimensions[0] * 5;
	i = 0;
	z = list[i][1];
	major = list[i + 1][1];
	while (i <= dimensions.length)
	{
		if (list[i][1] < list[i + 1][1])
		{
			z = major;
			major = list[i + 1][1];
		}
		i++;
	}
	i = 0;
	while (i <= dimensions.length)
	{
		if (z != list[i][1] || major != list[i][1]) 
			y = list[i][3];
		if (y < list[i][3])
			y = list[i][3];
		i++;
	}
	if (major > z)
	{
		i = list.filter(value => list[1] === major);
		y += i[3];
	}
	else
	{
		i = list.filter(value => list[1] === z);
		y += i[3];
	}
	z += major;
	if (z > x)
	{
		i = x;
		x = z;
		z = i;
	}
	dimensions.slice(0, 4);
	return definition = [x, z, y];
}


//This function returns the sizes of the crate dealing with all works with the
//sizes.
function splitSectionCrate(list, dimensions)
{
	let x;
	let y;
	let z;
	let definition;
	let i;

	if(dimensions.length < 2)
	{
		x = list[0] * 5;
		z = list[0][1];
		y = list[0][3];		
		if (z > x)
		{
			i = x;
			x = z;
			z = i;
		}
		dimensions.splice(0, 1);
		return definition = [x, z, y];
	}
	else if (dimensions.length === 2 || dimensions[2] != 1)
	{
		x = dimensions[0] * 5;
		list[0][1] > list[2][1] ? z = list[0][1] : z = list[2][1];
		if ( list[0][3] + list[2][3] < 145)
			y = list[0][3] + list[2][3];		
		else
		{
			z = list[0][1] + list[2][1];
			list[0][3] > list[2][3] ? y = list[0][3] : y = list[2][3];
		}
		if (z > x)
		{
			i = x;
			x = z;
			z = i;
		}
		dimensions.splice(0, 2);
		return definition = [x, z, y];
	}
	else if (dimensions.length >= 4 && dimensions[4] != 1 && dimensions[3] != 1)
		splitSectionCrateFour(list, dimensions);
}


//This function provides de map of each sizes found at howManySizes function.
function defineCrate(works_sizes)
{
	let sizes;
	let crate;
	let i;

	i = 0;
	sizes = [];
	while (i++ < works_sizes.length - 1)
	{
		if (!Array.isArray(works_sizes[i]))
			sizes.push(works_sizes[i]);
	}
	i = 0;
	while (i <= sizes.length)
	{
		if (i + 1 < sizes.length && sizes[i] != sizes[i + 1])
			sizes[i].push(1);
		i++;		
	}
	return crate = splitSectionCrate(works_sizes, sizes);
}


//This function is the second part to solve all the equal works with the 
//same sizes. The design argument is regarding to consolidate or not the works
//in side de same crate.
function howManySizes(works)
{
	let crate = [];
	let len;
	let counter = [];
	let i;
	let last;

	i = 0;
	len = 0;
	last = 0;
	while(len <= works.length)
	{
		if (len === works.length)
		{
			counter.push(len - last);
			break ;
		}
		else if (counter.length === 0 || counter[i][1] != works[len][1])
		{
			if (counter.length != 0)
			{
				i += 2;
				counter.push(len - last);
			}
			if (works[len])
				counter.push(works[len]);
			last += len;
		}
		len++;
	}
	crate.push(defineCrate(counter));
	return (clean.arrayLess(crate));
}


//This function check if all sizes of the works is really equal to take it 
//of the list.
function checking(arr, works, length)
{
	let cleaner;

	if (length > works.length - 1 || works[length][4] != arr[0][4])
		return ;
	if (works[length][1] === arr[0][1] && works[length][2] === arr[0][2]
	&& works[length][3] === arr[0][3])
	{
		cleaner = works.splice(length, 1);
		cleaner = clean.arrayLess(cleaner);
		arr.push(cleaner);
	}
	else
		length++;
	return checking (arr, works, length);
}


//This function finds the works 4 works or more with the same sizes based on
//the cube values.
function sameSizes(list)
{
	let len;
	let equals = [];
	let checked = [];
	let remainder = [];

	len = 0;
	while (len <= list.length - 1)
	{
		checked = list.splice(0, 1);
		checking(checked, list, 0);
		if (checked.length <= 3)
			remainder = remainder.concat(checked);
		else
			equals = equals.concat(checked);
		checked.splice(0, checked.length);
		len++;
	}
	if (equals.length > 3)
	{
		equals.unshift(howManySizes(equals));
		list.push(remainder);
		return (equals);
	}
	return (0);
}

module.exports = { sameSizes };

let test = {

	121231: "50, 5, 50",
	123: "50, 5, 50",
	9898: "50, 5, 50",
	98888: "50, 5, 50",
	010: "40, 5, 50",
	9999: "40, 5, 50",
	7888: "40, 5, 50",
	11111: "60, 5, 60",
	22222: "60, 5, 60",
	33333: "60, 5, 60",
	44444: "60, 5, 60"
}

test = (sort.getDimensions(test));
test = sort.quickSort(next_work.cubVersionList(test), 4);
console.log(test);
let result = sameSizes(test);
console.log(clean.arrayLess(test));
console.log(result);
