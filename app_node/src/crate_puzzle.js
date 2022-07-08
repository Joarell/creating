//This function returns if the work feats or not in to the crate sizes.
function puzzle(c, w)
{
	const layer = [];
	let i = 0;

	for (i in c && w)
	{
		if (i == 1)
		{
			layer.push(c[i]);
		}
		else
		{
			layer.push(c[i] - w[i]);
		}
	}
	return layer;
}

module.exports = { puzzle };
