

export default class Converter {
	#values;

	constructor (...args) {
		this.#values = [...args];
		// console.log(this.#values);
	};

	// INFO: Converts inches to centimeters.
	get cmConvert () {
		return (inConvert.call(this.#values));
	}

	// INFO: Converts centimeters to inches.
	get inConvert () {
		return (cmConvert.call(this.#values));
	}
};


function checkValues () {
	const checker = this.filter(val => {
		if (Number(val))
			return (val);
		else if (typeof(val) === 'string' && val)
			return (+val.trim());
		else
			return;
	});
	try {
		if (!checker || checker.length < 1) {
			const error = "Please, provide a value to be converted.";
			throw new TypeError(error);
		}
	}
	catch (err) {
		return (err);
	};
	return(checker);
};


function cmConvert () {
	const trimmer = checkValues.call(this);

	if (Array.isArray(trimmer)) {
		const INCH =	2.54;
		const result =	this.map(val => {
			return (+(val / INCH).toFixed(3));
		});

		return (result);
	};
	return (trimmer);
};


function inConvert () {
	const trimmer = checkValues.call(this);

	if (Array.isArray(trimmer)) {
		const INCH =	2.54;
		const result =	this.map(val => {
			return (+(val * INCH).toFixed(0));
		});

		return (result);
	};
	return (trimmer);
};
