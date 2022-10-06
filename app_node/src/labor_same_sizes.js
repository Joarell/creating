//
function largeCrate(list, sizes, dimensions) {
	let new_crate;
	let len;
	let x;
	let z;
	let y;

	height = 145;
	len = list.length;
	x = dimensions[0];
	z = dimensions[1];
	y = list[len - 2][3];
	while (x >= 0 || len > 0) {
		if (list[len - 2][3] <= y && x >= list[len - 2][1]) {
			x -= list[len - 2][1];
			list.splice(len - 2, 2);
			sizes.splice(sizes.length - 1, 1);
		}
		len -= 2;
		if (x - list[len - 2][1] < 0)
			break;
	}
	if (x < dimensions[0]) {
		x = dimensions[0];
		y += dimensions[2];
		new_crate = [x, z, y];
		dimensions = new_crate;
	}
	return (dimensions);
}


//This function call the largerCrate funtion to define a new crate to arrange
// more works in side.
function doubleCheck(list, sizes, dimensions) {
	let x;
	let z;
	let y;
	let package;
	let height;

	i = 0;
	x = false;
	z = false;
	y = false;
	package = 5;
	height = 145;
	if (list[i][1] >= dimensions[0]) {
		x = true;
	}
	if (list[i][2] >= dimensions[1] * package) {
		z = true;
	}
	if (list[i][3] + dimensions[2] <= height) {
		y = true;
	}
	if (!x && !z && y)
		return (largeCrate(list, sizes, dimensions));
	else
		return (dimensions);
}


//This function returns the sizes of the crate dealing with all works with the
//sizes if the dimensions length if equal to four.
function splitSectionCrateFour(list, dimensions) {
	let x;
	let y;
	let z;
	let definition;
	let tmp;
	let i;
	let package;

	i = 0;
	package = 5;
	z = list[i][1];
	x = dimensions[0] * package;
	tmp = list[i][1];
	while (i <= dimensions.length) {
		if (list[i][1] < list[i + 2][1]) {
			z = tmp;
			tmp = list[i + 2][1];
		}
		i += 2;
	}
	if (tmp > z)
		z = tmp;
	i = 0;
	while (i < list.length) {
		if (z === list[i][1]) {
			y = list[i][3];
			list.splice(i, 2);
			if (i > dimensions.length)
				dimensions.splice(dimensions.length - 1, 1);
			else
				dimensions.splice(i, 1);
		}
		i += 2;
	}
	if (z > x) {
		i = x;
		x = z;
		z = i;
	}
	definition = [x, z, y];
	return (doubleCheck(list, dimensions, definition));
}


//This function returns the sizes of the crate dealing with all works with the
//sizes if the dimensions length if equal to two.
function splitSectionTwo(list, dimensions) {
	let x;
	let y;
	let z;
	let definition;
	let swap;
	let package;
	let max_hight;

	package = 5;
	max_hight = 145;
	x = dimensions[0] * package;
	list[0][1] > list[2][1] ? z = list[0][1] : z = list[2][1];
	if (list[0][3] + list[2][3] < max_hight)
		y = list[0][3] + list[2][3];
	else {
		z = list[0][1] + list[2][1];
		list[0][3] > list[2][3] ? y = list[0][3] : y = list[2][3];
	}
	if (z > x) {
		swap = x;
		x = z;
		z = swap;
	}
	list.splice(0, 4);
	dimensions.splice(0, 2);
	return (definition = [x, z, y]);
}


//This function returns the sizes of the crate dealing with all works with the
//sizes if the dimensions length if equal to one.
function splitSectionCrateOne(list, dimensions) {
	let x;
	let y;
	let z;
	let definition;
	let swap;
	let package;

	package = 5;
	x = list[0][2] * package;
	z = list[0][1];
	y = list[0][3];
	if (z > x) {
		swap = x;
		x = z;
		z = swap;
	}
	list.splice(0, 2);
	dimensions.splice(0, 2);
	return definition = [x, z, y];
}


//This function does the redirection to the correct function splitSectin base on
//the list and dimensions provided.
function manager(list, dimensions) {
	if (dimensions.length === 1)
		return (splitSectionCrateOne(list, dimensions));
	else if (dimensions.length <= 3)
		return (splitSectionTwo(list, dimensions));
	else
		return (splitSectionCrateFour(list, dimensions));
}

module.exports = { manager };
