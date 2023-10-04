// ╭────────────────────────────────────────────────────────────╮
// │ //This is the calls "work" to each work added on the list; │
// ╰────────────────────────────────────────────────────────────╯


// TODO: create the regex function applying the DRY principle.
export default class ArtWork {
	constructor (code, x, z, y) {
		this.code =	code;
		this.x =	+x;
		this.z =	+z;
		this.y =	+y;
	};

	cAir () {
		const CUBAIR =	6000;
		const regx =	/[0-9]{1,3}/.test(this.x);
		const regz =	/[0-9]{1,3}/.test(this.z);
		const regy =	/[0-9]{1,3}/.test(this.y);
		let result;

		if (regx && regz && regy) {
			result =	((this.x * this.z * this.y) / CUBAIR).toFixed(3);
			return(+result);
		}
		return (false);
	};

	cubed () {
		const CMTOM =	1_000_000;
		const regx =	/[0-9]{1,3}/.test(this.x);
		const regz =	/[0-9]{1,3}/.test(this.z);
		const regy =	/[0-9]{1,3}/.test(this.y);
		let result;
		
		if (regx && regz && regy) {
			result =	 ((this.x * this.z * this.y) / CMTOM).toFixed(3);
			return(+result);
		}
		return (false);
	};

	arr () {
		return ([this.code, this.x, this.z, this.y]);
	};

	conversion (metric) {
		const INCH =		2.54;
		const dimensions =	[];

		if (metric === "cm"){
			dimensions.push(+(this.x / INCH).toFixed(3));
			dimensions.push(+(this.z / INCH).toFixed(3));
			dimensions.push(+(this.y / INCH).toFixed(3));
			return (dimensions);
		}
		else if (metric === "in"){
			dimensions.push(+(this.x * INCH).toFixed(3));
			dimensions.push(+(this.z * INCH).toFixed(3));
			dimensions.push(+(this.y * INCH).toFixed(3));
			return (dimensions);
		}
		return(false);
	};
};
