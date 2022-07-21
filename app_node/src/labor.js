//Aqui precismos realizar algumas tratativas para a conclusão do algorítmo:

//	1 - Obter a lista de obras com os códigos e dimensões;
//	2 - Tratar a lista retornarndo para uma váriável os valores cubados do menor parao maior com a função "sort";
//	3 - Desenvoler a algoritmo de backtrack para construção e acondicionamento das obras dentro da caixa.
//	4 - *Deletar o modulo layer_puzzle*******************

const work_list = {

	1298: "200, 05, 100",
	123: "100, 05, 100",
	5908: "150, 05, 90",
	8899: "120, 03, 100",
	777: "50, 03, 50",
}

let sort_list = require("./sort.js");


sort_list = sort_list.i_sort(work_list);
let biggest = sort_list.pop();
biggest = biggest[1];
const actual_l = [];


function labor(layer_dim, works)
{ 
	let layer;
	let len;

	if (layer_dim <= 0)
	{
		return actual_l;
	}
	len = works.length;
	layer = works[len - 1];
	while (layer_dim < layer[1])
	{
		layer = works[len - 1];
		len--;
		if (len < 0)
		{
			return actual_l;
		}
	}
	if (len == 0)
	{
		actual_l.unshift(works.splice(0, 1));
	}
	else
	{
		actual_l.unshift(works.splice(len - 1, 1));
	}
	labor(layer_dim - layer[1], works);
}

labor(biggest, sort_list)
console.log("This are the works on the layer:", actual_l);
console.log("This is the layer", biggest);
console.log("All the last elements of the list:", sort_list);
