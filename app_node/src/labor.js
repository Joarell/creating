//Aqui precismos realizar algumas tratativas para a conclusão do algorítmo:
//	1 - Obter a lista de obras com os códigos e dimensões;
//	2 - Tratar a lista retornarndo para uma váriável os valores cubados do menor parao maior com a função "sort";
//	3 - Desenvoler a algoritmo de backtrack para construção e acondicionamento das obras dentro da caixa.
//	4 - 

const work_list =
{
	1298: "200, 05, 100",
	123: "100, 05, 100",
	5908: "150, 05, 90",
	8899: "120, 03, 100",
	777: "50, 03, 50",
}

let sort_list = require("./sort.js");
sort_list = sort_list.i_sort(work_list);
const last = sort_list.length;
let biggest = sort_list[last - 1][1];

console.log(biggest);
