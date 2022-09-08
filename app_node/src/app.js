const sort = require("./sort.js");


const work_list = {

	1298: "200, 05, 100", //first
	123: "100, 05, 100",
	5908: "150, 05, 90",
	8899: "120, 03, 100",
	777: "50, 03, 50",
	8980: "30, 03, 30",
	71234: "30, 03, 30",
	1111: "30, 03, 30",
	2313: "30, 03, 30",
	1112: "60, 05, 90",
	1897: "180, 05, 100", //second
	9897: "75, 05, 80",
	09884: "100, 05, 120",
	8745: "130, 05, 100",
	8877: "160, 05, 160", //third
	7777: "100, 05, 160",
	8888: "45, 45, 45",
	90890: "50, 50, 50",
	12345: "100, 10, 190"
}

console.log(solveListProcedure(work_list));

// let test = [1,2,3,4,5,6,7,8,9,10];


// function binary_search(arr, target)
// {
// 	let found = 0;
// 	let last = arr.length - 1;
// 	let midpoint;

// 	while (found <= last)
// 	{
// 		if ((found + last) % 2 == 0)
// 			midpoint = (found + last) / 2;
// 		else
// 			midpoint = parseInt(((found + last) / 2) + 1);
// 		if ( arr[midpoint] == target)
// 			return midpoint;
// 		else if (arr[midpoint] < target)
// 			found = midpoint + 1;
// 		else
// 			last = midpoint - 1;
// 	}
// 	return "Not in the list";
// };


// function recursive_binary_s(arr, target, counter)
// {
// 	let last = (arr.length - counter) - 1;

// 	if (last < 0 || arr.length == 0)
// 		return "Not in the list";
// 	if (arr[counter] == target)
// 		return counter;
// 	else if ((counter + last) % 2 == 0)
// 		counter = (counter + last) / 2;
// 	else if(counter == 0)
// 		counter = parseInt(((counter + last) / 2) + 1);
// 	else
// 		counter += parseInt(counter / 2) + 1;
// 	if (arr[counter] > target)
// 	{
// 		counter -= parseInt(counter / 2);
// 		return recursive_binary_s(arr, target, counter);
// 	}
// 	return recursive_binary_s(arr, target, counter);
// };


// const computeMaxCallStackSize = (size = 1) => {
//     size = size || 1;
//     console.log(size);
//     return computeMaxCallStackSize(size + 1);
// };

// computeMaxCallStackSize();
// console.log(binary_search(test, 11));
// console.log(recursive_binary_s(test, 11, 0));


let sortedList = sort.getDimensions(work_list);
console.log(sortedList);
console.log(sortedList[0][1] - sortedList[1][1]);
