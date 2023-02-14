const validationBody = async (req, res, next) => {
	const { body } = req;
	const { reference, list, crates, user_name, user_id } = body;
	const content = [reference, list, crates, user_name, user_id];
	const estimatesData = await getAllEstimatesReferenceServer();

	const validationContent = content.some((val) => {
		return ([undefined, "", null, NaN].includes(val));
	});
	const checkEstimate = estimatesData.some((quote) => {
		return( reference === quote ? true : false );
	});
	console.log("Test of invalid fields:", validationContent);
	console.log("Test if the estimate in on DB:", checkEstimate);

	if (validationContent) {
		return (res.status(206).json({
			message: `Oops! somenthing is not right. Check all data and try again`
		}));
	};
	if (checkEstimate) {
		return (res.status(409).json({
			message: `Oops! Your estimate already exist, please select then upadte
option or change the reference code.`}));
	};
	next();
}


// TODO:cache to the last consult on the database
async function getAllEstimatesReferenceServer() {
	const url = 'http://localhost:3000/search/estimates';
	const getter = await fetch(url).then(res => res.json().then(info => info));
	const codes = getter.map(refe => {
		const { reference_id } = refe;
		return (reference_id);
	});
	return (codes);
};

module.exports = { validationBody };
