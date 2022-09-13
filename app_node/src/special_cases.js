const next_work = require("./next_work.js");
const sort = require("./sort.js");
const clean = require("./layer_puzzle.js");


//This functions is only a complement to the arrageCrate function.
function arranLayer(arr, aux)
{
	let swap;

	if (arr[1].length === aux.length && arr[1][0][3] + aux[0][3] < 145)
	{
		x = aux.length * package;
		y = arr[1][0][3] + aux[0][3];
		if (arr[1][0][1] >= aux[0][1])
			z = arr[1][0][1];
		else
			z = aux[0][1];
		if (x < z)
		{
			swap = x;
			x = z;
			z = swap;
		}
		arr[0] = [x, z, y];
		arr.push(aux);
	}
	return (arr);
}	


//This functions provides the best arragemento to crates with the same sizes.
function arrangeCrate(work_list, arr)
{
	let aux;
	let x;
	let y;
	let z;
	let package;

	package = 5;
	aux = [];
	while (aux.length === 0 || aux[0][0][4] === work_list[0][4])
	{
		aux.push(work_list.splice(0, 1));
		if (work_list.length === 0)
			break ;
	}
	aux = Array.from(clean.arrayCleaner(aux));
	if (arr.length === 0)
	{
		x = aux.length * package;
		y = aux[0][3];
		z = aux[0][1];
		arr.push([x, z, y]);
		arr.push(aux);
	}
	else
		arranLayer(arr, aux);
	return (arr);
}


//This function is the second part to solve all the equal works with the 
//same sizes. The design argument is regarding to consolidate or not the works
//in side de same crate.
function solveSameSizes(works, design)
{
	let crate = [];
	let x;
	let y;
	let z;

	let sum = (list, index, len, result) => {
		let a;
		let b;

		if (len > list.length - 1)
			return (result);
		a = list[len][index];
		b = list[len + 2][index];
		len++;
		return sum(list, len, result + (a + b))
	}
	if (design)
	{
		while (works.length > 0)
			arrangeCrate(works, crate);
		return (crate);
	}
	else
		arrangeCrate(works, crate);
	return (crate);
}


//This function check if all sizes of the works is really equal to take it 
//of the list.
function checking (arr, works, length)
{
	if (length > works.length - 1 || works[length][4] != arr[0][4])
		return ;
	if (works[length][1] === arr[0][1] && works[length][2] === arr[0][2]
	&& works[length][3] === arr[0][3])
		arr.push(works.splice(length, 1));
	else
		length++;
	return checking (arr, works, length);
}


//This function finds the works 4 works or more with the same sizes.
function sameSizes(list)
{
	let len;
	let equals = [];
	let checked = [];

	len = 0;
	while (len <= list.length - 1)
	{
		checked.push(list[len]);
		checking(checked, list, 1);
		if (checked.length < 3)
			checked.splice(0, 1);
		else
		{
			checked.splice(0, 1);
			equals = equals.concat(checked);
		}
		checked.splice(0, checked.length);
		len++;
	}
	if (equals.length > 3)
		return (clean.arrayCleaner(equals));
	return (0);
}

module.exports = { sameSizes };

let test = {
	121231: "50, 5, 50",
	123: "50, 5, 50",
	9898: "50, 5, 50",
	98888: "50, 5, 50",
	101010: "40, 5, 50",
	11111: "60, 5, 60",
	22222: "60, 5, 60",
	33333: "60, 5, 60",
	44444: "60, 5, 60"
}

test = (sort.getDimensions(test));
test = sort.quickSort(next_work.cubVersionList(test), 4);
console.log(test);
let result = sameSizes(test);
console.log(test);
console.log(result);
console.log(solveSameSizes(result, 1));
