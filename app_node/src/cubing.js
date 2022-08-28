//This function returns the cubed value to the work.
function cubing(dimensions)
{
	const cubed = dimensions[1] * dimensions[2] * dimensions[3]/1000000;
	return Math.floor(cubed * 1000)/1000;
}

module.exports = { cubing };
