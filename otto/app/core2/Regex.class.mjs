

export default class RegexChecker {
	#values;

	constructor(...args) {
		this.#values = [...args];
	};

	get regexSizes() {
		return (regexWorks.call(this.#values));
	};
};


function regexWorks() {
	try {
		const regx = this.map(val => {
			const reg = /[0-9]{1,3}/.test(val)
			return (Number.isNaN(val) ? false : reg);
		});
		const error = "Not a valid entry to RegexChecker!";

		if (regx.includes(false))
			throw new TypeError(error);
	}
	catch (err) {
		console.error(err);
		return (err);
	}
};
