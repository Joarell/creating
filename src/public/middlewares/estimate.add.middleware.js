const validationBody = (req, res, next) => {
	const { body } = req;
	const { reference, works, crates, total_cub, user_name, user_id } = body;
	const invalid = [ undefined, "", null, NaN ];
	const content = [reference, works, crates, total_cub, user_name, user_id];
	const check = content.some((val) => {
		return (invalid.includes(val));
	});
	
	if (check) {
		return (res.status(206).json({
		message: `Oops! somenthing is not right. Check all data and try again`}));
	}
	next();
}

module.exports = { validationBody };
