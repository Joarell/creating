//This function returns the sizes of the crate dealing with all works with the
//sizes if the dimensions length if equal to four.
function splitSectionCrateFour(list, dimensions) {
	let x;
	let y;
	let z;
	let definition;
	let major;
	let i;
	let package;

	package = 5;
	x = dimensions[0] * package;
	i = 0;
	z = list[i][1];
	major = list[i + 1][1];
	while (i <= dimensions.length) {
		if (list[i][1] < list[i + 1][1]) {
			z = major;
			major = list[i + 1][1];
		}
		i++;
	}
	i = 0;
	while (i <= dimensions.length) {
		if (z != list[i][1] || major != list[i][1])
			y = list[i][3];
		if (y < list[i][3])
			y = list[i][3];
		i++;
	}
	if (major > z) {
		i = list.filter(value => list[1] === major);
		y += i[3];
	}
	else {
		i = list.filter(value => list[1] === z);
		y += i[3];
	}
	z += major;
	if (z > x) {
		i = x;
		x = z;
		z = i;
	}
	dimensions.slice(0, 4);
	return definition = [x, z, y];
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
	return (splitSectionCrateFour(list, dimensions));
}

module.exports = { manager };
