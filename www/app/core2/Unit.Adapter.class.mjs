
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

	#reversionUnit(data) {
		const CHECK1 = data?.hasOwnProperty('crates');
		const CHECK2 = data?.hasOwnProperty('backUp');

		if(Array.isArray(data)) {
			return(data = data.map(swapUnitReversion));
		}
		else if (!data.hasOwnProperty('crates')) {
			return(data);
		}
		else if (CHECK1 || CHECK2) {
			data.crates = data.crates.map(info => {
				if (info.length === 4)
					return (info = swapUnitReversion(info));
				Array.isArray(info.works[0]) ?
					info.works = info.works.map(swapUnitReversion) :
					info.works = info.works.map(layerInterface)
				return (info);
			});
		}
		return(data);
	};

	#convertToCM() {
		const convertedList = this.#list.map(art => {
			const converted = art.autoConvert;
			const code = converted[0];
			const x = converted[1];
			const z = converted[2];
			const y = converted[3];

			return(new ArtWork(code, x, z, y));
		});
		return (convertedList);
	};

	#convertToIN(crates) {
		const CUBCONST =	0.061_023;
		let key =			0;

		for (key in crates) {
			if (crates[key].hasOwnProperty('crates'))
				crates[key] = this.#reversionUnit(crates[key])
		}
		
		if (crates.sameSizeCrate.hasOwnProperty('backUp')) {
			crates.airCubTotalBackUp = +(crates.airCubTotalBackUp * CUBCONST)
				.toFixed(3);
			crates.allCratesBackUp = this.#reversionUnit(crates.allCratesBackUp)
		};
		crates.allCrates = this.#reversionUnit(crates.allCrates);
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


function swapUnitReversion(sizes) {
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
			return(sizes = tmp);
		case 5 || 6 :
			x =		sizes[1];
			z =		sizes[2];
			y =		sizes[3];
			tmp =	Array.from(new Converter(x, z, y).inConvert);
			tmp.unshift(sizes[0]);
			tmp.push(+(sizes[3] * CUBCONST).toFixed(3));
			return(sizes = tmp);
	};
};


function layerInterface(layer) {
	let key = 0;

	for (key in layer) {
		if (layer[key].length === 1) {
			layer[key] = swapUnitReversion(layer[key][0]);
		}
		else
			layer[key] = layer[key].map(swapUnitReversion);
	};
	return(layer);
};
