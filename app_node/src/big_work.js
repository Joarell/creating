let cube = require("./cubing.js");
 

function big_work(work_list)
{
	let i = 0;
	let cubed = 0;
	great = 0;

	for (i in work_list)
	{
		cubed = cube.cubing(work_list[i]);
		if (cubed > great)
		{
			great = cubed;
		}
	}
	return great;
}

module.exports = { big_work };
