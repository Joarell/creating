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
		if (x && y && z )
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
		if (x && y && z )
			return ((x * z * y) / cmToM);
		return (false);
	}
}
