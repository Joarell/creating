//Aqui precismos realizar algumas tratativas para a conclusão do algorítmo:

//	1 - Obter a lista de obras com os códigos e dimensões;
//	2 - Tratar a lista retornarndo para uma váriável os valores cubados do menor parao maior com a função "sort"; - DONE
//	3 - Desenvoler a algoritmo de backtrack para construção e acondicionamento das obras dentro da caixa.
//	4 - *Deletar o modulo layer_puzzle******************* - DONE
//	5 - Definir a flexibilidade do algoritmo para se adaptar a peguenas mudanças nas dimensões da caixa para acomodar todas as obras - (Backtrack);
//	6 - Definir o percentual mínimo e mutabilidade da caixa para a adaptação necessária;
//	7 - 

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
const tmp = [];
const gru = 1600;

function layer_done(work_done)
{
	const layer = [];
	let i = 0;

	for (i in work_done)
	{
		layer.unshift(work_done[i][0]);
	}
	return layer;
}


function labor(layer_dim, works)
{ 
	let layer;
	let len;

	if (works <= 0)
	{
		return tmp;
	}
	len = works.length;
	layer = works[len - 1];
	while (layer_dim < layer[1])
	{
		layer = works[len - 1];
		len--;
		if (len < 0)
		{
			return tmp;
		}
	}
	if (len == 0)
	{
		tmp.unshift(works.splice(0, 1));
	}
	else
	{
		tmp.unshift(works.splice(len - 1, 1));
	}
	labor(layer_dim - layer[1], works);
}


function solve_crate(work_list)
{	

	if (work_list == 0)	
	{
		return;		
	}
	solve_crate(labor(biggest, work_list));
}

labor(biggest, sort_list);
labor(biggest, sort_list);

console.log("This are the works on the layer:", layer_done(tmp));
console.log("This is the layer", biggest);
console.log("All the last elements of the list:", sort_list);

