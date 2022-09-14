const next_work = require("./next_work.js");
const sort = require("./sort.js");
const clean = require("./layer_puzzle.js");

function defineCrate(works_sizes)
{
	let sizes;
	let x;
	let y;
	let z;
	let i;

	i = 0;
	sizes = [];
	while (i++ < works_sizes.length - 1)
	{
		if (!Array.isArray(works_sizes[i]))
			sizes.push(works_sizes[i]);
	}
	i = 0;
	//a composição da medida y deve ser restringida pela medida da altura. Compreendendo o valor limite de 145.
	//Caso contrário, as obras deverão ser diviidas em duas secções ou mais dentro da caixa, afim de acomodar as obras de mesma QUANTIDADE.
	while ( )
	if (sizes.length % 2 === 0)
	{
		while (i < works_sizes.length - 1)
		{
			if (works_sizes[i][2] > z && works_sizes[i][2] < 175)
				z = works_sizes[i][2];
			i += 2;
		}

	}
}

//This functions provides the best arragemento to crates with the same sizes.
function arrangeCrate(work_list, arr, mesures)
{
	let aux;
	let x;
	let y;
	let z;
	let package;

	package = 5;
	aux = [];
	defineCrate(mesures);
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
function solveSameSizes(works)
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
		if (counter.length === 0 || len === works.length ||
		(counter[i][1] != works[len][1]))
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
	arrangeCrate(works, crate, counter);
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


//This function finds the works 4 works or more with the same sizes based on
//the cube values.
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
