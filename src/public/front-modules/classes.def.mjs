// ╭────────────────────────────────────────────────────────────╮
// │ //This is the calls "work" to each work added on the list; │
// ╰────────────────────────────────────────────────────────────╯
export default class ArtWork {
	constructor (code, x, z, y) {
		this.code = code;
		this.x = x;
		this.z = z;
		this.y = y;
	}
	get cubeAir () {
		return (this.cAir());
	}
	cAir () {
		const cons = 6000;
		const x = parseInt(this.x);
		const z = parseInt(this.z);
		const y = parseInt(this.y);
		const regx = /[0-9]{1,3}/.test(x);
		const regz = /[0-9]{1,3}/.test(z);
		const regy = /[0-9]{1,3}/.test(y);

		if (regx && regz && regy)
			return ((x * z * y) / cons);
		return (false);
	}
	get cub () {
		if (this.cubed() === false)
			return (false);
		return (Math.floor(this.cubed() * 1000) / 1000);
	}
	cubed () {
		const cmToM = 1000000;
		const x = parseInt(this.x);
		const z = parseInt(this.z);
		const y = parseInt(this.y);
		const regx = /[0-9]{1,3}/.test(x);
		const regz = /[0-9]{1,3}/.test(z);
		const regy = /[0-9]{1,3}/.test(y);
		
		if (regx && regz && regy)
			return ((x * z * y) / cmToM);
		return (false);
	}
	get vector () {
		const x = parseFloat(this.x);
		const z = parseFloat(this.z);
		const y = parseFloat(this.y);

		return ([this.code, x, z, y]);
	}
}
