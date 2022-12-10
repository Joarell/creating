//This is the calls "work" to each work added on the list;
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
		const regx = /^\d{1,3}$/g.test(x);
		const regz = /^\d{1,3}$/g.test(z);
		const regy = /^\d{1,3}$/g.test(y);

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
		const regx = /^\d{1,3}$/g.test(x);
		const regz = /^\d{1,3}$/g.test(z);
		const regy = /^\d{1,3}$/g.test(y);
		
		if (regx && regz && regy)
			return ((x * z * y) / cmToM);
		return (false);
	}
	get vector() {
		return ([this.code, this.x, this.z, this.y]);
	}
}
