
import Arranger from "./Arranger.class.mjs";
import ArtWork from "./ArtWork.class.mjs";
import Converter from "./Converter.class.mjs";
import Crater from "./Crater.class.mjs";


export default class UnitAdapter {
	#list;
	#unit;

	constructor(works, unit) {
		this.#list = works;
		this.#unit = unit;

		return(this.#definePath());
	};

	#checkInput() {
		try {
			if (!Array.isArray(this.#list)) {
				const error = `Please, provide a valid list.`
				throw new TypeError(error);
			};

			const validation = this.#list.some(art => {
				return (art.constructor.name !== 'ArtWork');
			});

			if (validation) {
				const error = `Please, provide a type of 'ArtWork' object list.`
				throw new TypeError(error);
			};

			if (this.#unit !== 'cm' && this.#unit !== 'in') {
				const error = `Please, provide a valid unit.`
				throw new TypeError(error);
			};
		}
		catch (err) {
			return (err);
		};
		return('pass');
	};

	async #definePath() {
		let result;
		const checker =	this.#checkInput();
		const path =	checker !== 'pass' ? 'error' :
			this.#unit === 'cm' ? 'cm' : 'in';

		switch (path) {
			case 'error' :
				return(checker);

			case 'cm' :
				result = await this.#cmPath()
				return (result);
			
			case 'in' :
				result = await this.#inPath();
				return (result);
		};
	};

	#swapUnitRevertion(sizes) {
		const CUBCONST = 0.061_023;
		let tmp;
		let x;
		let z;
		let y;

		switch(sizes.length) {
			case 4 :
				x =		sizes[0];
				z =		sizes[1];
				y =		sizes[2];
				tmp =	Array.from(new Converter(x, z, y).inConvert);
				tmp.push(+(sizes[3] * CUBCONST).toFixed(3));
				return(tmp);
			case 5 :
				x =		sizes[1];
				z =		sizes[2];
				y =		sizes[3];
				tmp =	Array.from(new Converter(x, z, y).inConvert);
				tmp.unshift(sizes[0]);
				tmp.push(+(sizes[3] * CUBCONST).toFixed(3));
				return(tmp);
		};
	};

	#revertionLayers(crate) {
		return (crate.works = crate.works.map(layer => {
			if(Object.keys(layer)[0] === 'layer1')
				return(layer = layer.layer1.map(work => {
					return(this.#swapUnitRevertion(work))
				}))
			if(Object.keys(layer)[0] === 'layer2')
				return(layer = layer.layer2.map(work => {
					return(this.#swapUnitRevertion(work))
				}))
			if(Object.keys(layer)[0] === 'layer3')
				return(layer = layer.layer3.map(work => {
					return(this.#swapUnitRevertion(work))
				}))
			if(Object.keys(layer)[0] === 'layer4')
				return(layer = layer.layer4.map(work => {
					return(this.#swapUnitRevertion(work))
				}))
			if(Object.keys(layer)[0] === 'layer5')
				return(layer = layer.layer5.map(work => {
					return(this.#swapUnitRevertion(work))
				}))
		}));
	};

	#revertionUnit(data) {
		if(Array.isArray(data))
			return(data = data.map(this.#swapUnitRevertion));

		else if (data.hasOwnProperty('crates') === false)
			return(data);

		data.crates = data.crates.map(info => {
			if (info.length === 4)
				return(info = this.#swapUnitRevertion(info));
			return (info.works = this.#revertionLayers(info));
		});
		return(data);
	};

	#convertToCM() {
		const convertedList = this.#list.map(art => {
			const converted = art.autoConvert;
			const code = converted[0];
			const x = converted[1];
			const z = converted[2];
			const y = converted[3];

			return( new ArtWork(code, x, z, y));
		});
		return (convertedList);
	};

	#convertToIN(crates) {
		const CUBCONST = 0.061_023;

		crates.tubeCrate = this.#revertionUnit(crates.tubeCrate);
		crates.largestCrate = this.#revertionUnit(crates.largestCrate);
		crates.sameSizeCrate = this.#revertionUnit(crates.sameSizeCrate);
		crates.noCanvasCrate = this.#revertionUnit(crates.noCanvasCrate);
		crates.standardCrate = this.#revertionUnit(crates.standardCrate);
		crates.airCubTotal = +(crates.airCubTotal * CUBCONST).toFixed(3);
		crates.allCrates = this.#revertionUnit(crates.allCrates);
		return(crates);
	};

	async #cmPath() {
		const RESULT = await Promise.resolve(new Arranger(this.#list))
			.then(procList => new Crater(procList))
			.then(cratesDone => cratesDone.crates)
		.catch(err => err);

		return (RESULT);
	};

	async #inPath() {
		const RESULT = await Promise.resolve(this.#convertToCM())
			.then(list => new Arranger(list))
			.then(procList => new Crater(procList))
			.then(cratesDone => this.#convertToIN(cratesDone.crates))
		.catch(err => err);

		return (RESULT);
	};
};
