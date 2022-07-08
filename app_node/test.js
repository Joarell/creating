const cub = require('./src/cubing.js');
const big = require('./src/big_work.js');
const layer = require('./src/crate_puzzle');
const sort = require('./src/sort.js');

// Test: cube module.
const work = [100, 5, 100];
console.log("The cubed value is:", cub.cubing(work));

// Test: big work module.
const w_list = [[150, 5, 100], [200, 5, 180]];
console.log("That is the biggest cubed work on the list:", big.big_work(w_list));

//Test: crate_puzzle.
const crate = [200, 10, 100];
console.log("This is the result from the puzzle function:", layer.puzzle(5, 2));

//Test: i_sort
const work_list =
{
	1298: "200, 05, 100",
	123: "100, 05, 100",
	5908: "150, 05, 90",
	8899: "120, 03, 100",
	777: "50, 03, 50"
}
first = sort.get_dimensions(work_list);
console.log("Here is all works dimensions from the list:", first);
first = sort.i_sort(work_list);
console.log("The sorted list is:", first);
