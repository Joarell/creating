const cub = require('./src/cubing.js');
const big = require('./src/big_work.js');
const layer = require('./src/crate_puzzle');
const sort = require('./src/sort.js');

// Test: cube module.
const work = [100, 5, 100];
console.log(cub.cubing(work));

// Test: big work module.
const w_list = [[150, 5, 100], [200, 5, 180]];
console.log(big.big_work(w_list));

//Test: crate_puzzle.
const crate = [200, 10, 100];
console.log(layer.labor(crate, work));

//Test: i_sort
const work_list =
{
	1298: "200, 05, 100",
	123: "100, 05, 100",
	5908: "150, 05, 90",
	8899: "120, 03, 100",
	777: "50, 03, 50"
}
console.log(Object.keys(work_list));
first = sort.get_dimensions(work_list);
console.log(first);
