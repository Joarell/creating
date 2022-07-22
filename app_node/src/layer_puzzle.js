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


const GRU = 1600;
sort_list = sort_list.i_sort(work_list);
let biggest = sort_list.pop();
biggest = biggest[1];
let crate_done = [];
let tmp = [];

function layer_done(work_done, layer)
{
	let layers = [];
	let i = 0;

	for (i in work_done)
	{
		layers.unshift(work_done[i][0]);
	}
	layers.push(layer);
	return crate_done.push(layers);
}


function labor(crate_dim, works, layer)
{ 
	let filled;
	let len;

	if (works <= 0)
	{
		layer_done(tmp, layer);
		tmp.splice(0, tmp.length);
		return solve_list(works, layer + 1);
	}
	len = works.length;
	filled = works[len - 1];
	while (crate_dim < filled[1])
	{
		filled = works[len - 1];
		len--;
		if (len < 0)
		{
			layer_done(tmp, layer);
			tmp.splice(0, tmp.length);
			return solve_list(works, layer + 1);
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
	labor(crate_dim - filled[1], works, layer);
}


function solve_list(work_list, layer)
{	
	while (work_list.length > 0 && layer <= 5)	
	{
		labor(biggest, work_list, layer);
		layer++;
	}
	return tmp;		
}

solve_list(sort_list, 1);
// console.log("This are the works on the layer:", layer_done(tmp));
console.log(crate_done);
console.log("This is the layer", biggest);
console.log("All the last elements of the list:", sort_list);
