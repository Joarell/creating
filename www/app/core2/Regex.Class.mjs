
export default class RegexChecker {
	#x;
	#z;
	#y;

	constructor (x, z, y) {
		this.#x = +x;
		this.#z = +z;
		this.#y = +y;
	};

	get regex() {
		const regx = /[0-9]{1,3}/.test(this.#x);
		const regz = /[0-9]{1,3}/.test(this.#z);
		const regy = /[0-9]{1,3}/.test(this.#y);
	
		return ((regx && regz && regy) ? true : false);
	};
};
