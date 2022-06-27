const cub = require('./src/cubing.js');
const big = require('./src/big_work.js');
const layer = require('./src/crate_puzzle');

// Test: cube module.
const work = [100, 5, 100];
console.log(cub.cubing(work));

// Test: big work module.
const w_list = [[150, 5, 100], [200, 5, 180]];
console.log(big.big_work(w_list));

//Test: crate_puzzle.
const crate = [200, 10, 100];
console.log(layer.labor(crate, work));
