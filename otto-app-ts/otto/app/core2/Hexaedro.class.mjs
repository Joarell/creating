

export default class Hexaedro {
	constructor (x, z, y) {
		try {
			const error = "Please, provide a correct x, z or y value.";
			if (!x || !z || !y)
				throw new TypeError(error);
		}
		catch (err) {
			return (err);
		}
		this.x = +x;
		this.z = +z;
		this.y = +y;
	};
};
