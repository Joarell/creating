
const clean = require("./layer_puzzle.js");


function arrangeCrate(work_list, arr)
{
	let aux;
	let x;
	let y;
	let z;
	let layer;

	layer = 0;
	while (aux[1] === work_list[layer][1])
	{
		aux.push(works.splice(layer, 1));
		layer++;
	}
	x = layer * 5;
	y = aux[3];
	z = aux [1];
	arr = Array.from[x, z, y];
	arr = crate.concat(aux);
	return (arr);
}


function solveSameSizes(works, design)
{
	let crate;
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
	{
		while (works.length > 0)
			arrangeCrate(works, crate);
		//A complexidade de camadas mediante a quantidade obras com mesma medida precisa ser melhor identificada para uma melhor tomada de decisoes.
		if (crate.length > 2)
		{
			// if (crate.length % 2 === 0)
			// {
			// 	sum(crate, 2, crate.length, z);
			// 	switch (z < 175) 
			// 	{
			// 		case (crate.length / 2 === 2):
			// 			crate[2] = z;
			// 		case (crate.length / 2 === 4):
			// 			crate
			// 	}
			// }
			// else
			// {

			// }
		}
	}
	return (crate);
}


//This function finds the works 4 works or more with the same sizes.
function sameSizes(list)
{
	let len;
	let equals = [];
	let checked = [];

	let checking = (arr, works, length) => {
		if (length > works.length - 1)
			return ;
		if (arr.length === 0)
			arr.push(works[length]);
		if (works[length][1] === arr[0][1] && works[length][2] === arr[0][2]
		&& works[length][3] === arr[0][3])
			arr.push(works.splice(length, 1));
		else
			length++;
		return checking (arr, works, length);
	}
	len = 0;
	while (len <= list.length - 1)
	{
		checking(checked, list, len);
		if (checked.length < 4)
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

const test = [
	['121231', 50, 5, 50],
	['123', 50, 5, 50],
	['9898', 50, 5, 50],
	['98888', 50, 5, 50],
	['101010', 40, 5, 50],
	['11111', 60, 5, 60],
	['22222', 60, 5, 60],
	['33333', 60, 5, 60],
	['44444', 60, 5, 60]
];

console.log(sameSizes(test));
