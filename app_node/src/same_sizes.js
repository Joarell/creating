const next_work = require("./next_work.js");
const sort = require("./sort.js");
const clean = require("./layer_puzzle.js");
const arrange = require("./labor_same_sizes.js");


//This function provides de map of each sizes found at howManySizes function.
function defineCrate(works_sizes) {
	let sizes;
	let crate;
	let i;
	let result;

	i = 0;
	sizes = [];
	result = [];
	while (i++ < works_sizes.length - 1) {
		if (!Array.isArray(works_sizes[i]))
			sizes.push(works_sizes[i]);
	}
	i = 0;
	while (i <= sizes.length) {
		if (i + 1 < sizes.length && sizes[i] != sizes[i + 1])
			sizes[i].push(1);
		i++;
	}
	result = arrange.manager(works_sizes, sizes);
	return (result);
}


//This funciont is responsible to check if all works were put int to the crate.
function zeroSizes(work_list, sizes) {
	let crate;
	let tmp;
	let len;
	let dump;
	let drain;

	tmp = [];
	crate = [];
	len = work_list.length - 1;
	drain = (t, c) => {
		if (t.length <= 0)
			return (c);
		c.push(clean.arrayLess(t.splice(0, 1)));
		return (drain(t, c));
	}
	dump = (w, s, l) => {
		if (w[len][1] === s[0][1])
			return (tmp = clean.arrayLess(tmp));
		if (w[len][1] != s[0][1])
			tmp.push(work_list.splice(len, 1))
		return (dump(w, s, len--));
	}
	while (work_list.length > 0) {
		if (sizes.length > 0 && work_list[0][0] === sizes[0][0])
			crate.push(defineCrate(sizes));
		if (sizes.length != 0)
			dump(work_list, sizes, len);
		else {
			tmp.push(work_list.splice(0, len + 1));
			tmp = clean.arrayLess(tmp);
		}
		if (tmp.length > 0)
			drain (tmp, crate);
	}
	return (crate);
}


//This function is the second part to solve all the equal works with the 
//same sizes. The design argument is regarding to consolidate or not the works
//in side de same crate.
function howManySizes(works) {
	let len;
	let counter;
	let i;
	let last;

	i = 0;
	len = 0;
	last = 0;
	counter = [];
	while (len <= works.length) {
		if (len === works.length) {
			counter.push(len - last);
			break;
		}
		else if (counter.length === 0 || counter[i][1] != works[len][1]) {
			if (counter.length != 0) {
				i += 2;
				counter.push(len - last);
				last = len;
			}
			if (works[len])
				counter.push(works[len]);
		}
		len++;
	}
	return (zeroSizes(works, counter));
}


//This function check if all sizes of the works is really equal to take it 
//of the list.
function checking(arr, works, length) {
	let cleaner;

	if (length > works.length - 1 || works[length][4] != arr[0][4])
		return;
	if (works[length][1] === arr[0][1] && works[length][2] === arr[0][2]
		&& works[length][3] === arr[0][3]) {
		cleaner = works.splice(length, 1);
		cleaner = clean.arrayLess(cleaner);
		arr.push(cleaner);
	}
	else
		length++;
	return checking(arr, works, length);
}


//This function finds the works 4 works or more with the same sizes based on
//the cube values.
function sameSizes(list) {
	let len;
	let equals;
	let checked;
	let remainder;

	len = 0;
	equals = [];
	checked = [];
	remainder = [];
	while (len <= list.length - 1) {
		checked = list.splice(0, 1);
		checking(checked, list, 0);
		if (checked.length <= 3)
			remainder = remainder.concat(checked);
		else
			equals = equals.concat(checked);
		checked.splice(0, checked.length);
		len++;
	}
	if (equals.length > 3) {
		equals.unshift(howManySizes(equals));
		if (remainder.length > 0)
			list.push(clean.arrayLess(remainder));
		return (clean.arrayLess(equals));
	}
	return (list);
}

module.exports = { sameSizes };

let test = {

	121231: "50, 5, 50",
	123: "50, 5, 50",
	9898: "50, 5, 50",
	98888: "50, 5, 50",
	010: "40, 5, 50",
	9999: "40, 5, 50",
	7888: "40, 5, 50",
	89393: "40, 5, 50",
	11111: "60, 5, 60",
	22222: "60, 5, 60",
	33333: "60, 5, 60",
	90909: "100, 05, 90",
	12345: "89, 05, 88",
	98099: "120, 03, 100",
	34733: "130, 05, 50",
	18988: "130, 05, 50",
	38388: "130, 05, 50",
	75784: "130, 05, 50",
	44444: "60, 5, 60",
}

test = sort.getDimensions(test);
test = sort.quickSort(next_work.cubVersionList(test), 4);
console.log(test);
let result = sameSizes(test);
console.log(result);
console.log(test);
