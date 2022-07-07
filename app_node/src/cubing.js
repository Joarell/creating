//This function returns the cubed value to the work.
function cubing(dimensions)
{
	const cubed = dimensions[0] * dimensions[1] * dimensions[2]/6000;
	return Math.floor(cubed * 1000)/1000;
}

module.exports = { cubing };
