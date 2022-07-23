//Aqui precismos realizar algumas tratativas para a conclusão do algorítmo:

//	1 - Obter a lista de obras com os códigos e dimensões; - DONE
//	2 - Tratar a lista retornarndo para uma váriável os valores cubados do menor parao maior com a função "sort"; - DONE
//	3 - Desenvoler a algoritmo de backtrack para construção e acondicionamento das obras dentro da caixa. - DONE
//	4 - *Deletar o modulo layer_puzzle******************* - DONE
//	5 - Definir a flexibilidade do algoritmo para se adaptar a peguenas mudanças nas dimensões da caixa para acomodar todas as obras - (Backtrack);
//	6 - Definir o percentual/valor máximo de mutabilidade da caixa para a adaptação necessária;
//	7 - Definir a divisão de caixas mediante o limite de camadas;
//	8 -

const work_list = {

	1298: "200, 05, 100",
	123: "100, 05, 100",
	5908: "150, 05, 90",
	8899: "120, 03, 100",
	777: "50, 03, 50",
	8980: "30, 03, 30",
	71234: "30, 03, 30",
	1111: "30, 03, 30",
	2313: "30, 03, 30"
}


let sort_list = require("./sort.js");
sort_list = sort_list.i_sort(work_list);
let biggest = sort_list.pop();
let crate_done = [];
let tmp = [];
const GRU = 1600;


crate_done.push(biggest);
crate_done.push(1);
biggest = biggest[1];

//This function returns the optimize arrays to each layer.
function layer_done(work_done, layer)
{
	let packed = [];
	let i = 0;

	for (i in work_done)
	{
		packed.unshift(work_done[i][0]);
	}
	packed.push(layer);
	return crate_done.push(packed);
}


//This function returns the available work to be set in to the actual crate dimension.
function next_work(crate_dim, works, len)
{
	let sizes;
	
	len--;
	sizes = works[len][1];
	while (len >= -1)
	{
		if (crate_dim >= sizes)
			return len;
		len--;
		if (len < 0)
			return len;
		sizes = works[len][1];
	}
	return len;
}


//This function is responsible to feat the works in to the crate layers.
function labor(crate_dim, works, layer)
{ 
	let filled;
	let len;

	len = next_work(crate_dim, works, works.length);
	filled = works[len][1];
	if (len == 0)
	{
		tmp.unshift(works.splice(0, 1));
		layer_done(tmp, layer);
		tmp.splice(0, tmp.length);
		return solve_list(works, layer + 1);
	}
	else
	{
		tmp.unshift(works.splice(len, 1));
	}
	labor(crate_dim - filled, works, layer);
}


//This function is responsible to the limit of the crate layers.
function solve_list(work_list, layer)
{	
	while (work_list.length > 0 && layer <= 5)	
	{
		labor(biggest, work_list, layer);
	}
	return crate_done;		
}

solve_list(sort_list, 2);

console.log(crate_done);
console.log("This is the layer", biggest);
console.log("All the last elements of the list:", sort_list);
