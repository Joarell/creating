const cub = require('./cubing.js');
const big = require('./big_work.js');
let test = 0;


// Test: cube module.
const work = [100, 5, 100];

// Test: big work module.
const w_list = [[150, 5, 100], [200, 5, 180]];

test = big.big_work(w_list);
console.log(cub.cubing(work));
console.log(test);
