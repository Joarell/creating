import Arranger from './Arranger.class.mjs';
import CraterPythagoras from "./Crater.largest.canvas.mjs";
import CraterLastCheckReArranger from "./Crater.last.check.mjs";
import CraterNotCanvas from "./Crater.no.canvas.mjs";
import CraterSameSize from "./Crater.same.size.mjs";
import CraterStandard from "./Crater.standard.crate.mjs";
import CraterTube from "./Crater.tube.crate.mjs";
import CubCalc from "./CubCalc.class.mjs";


export default class Crater {
	#works;
	#crates;

	constructor (procList) {
		if (!(procList === Arranger))
			return ({ crater : false });

		this.#works =	procList.list;
		this.#crates =	['crates ahead'];
		return(Object.assign(Crater, this.#startCrateList()));
	};

	#startCrateList () {
		let key =		0;
		const CRATES = [ 'tubeCrate', 'largestCrate', 'sameSizeCrate',
			'noCanvasCrate', 'standardCrate'
		];

		this.#tubeCrate();
		this.#LargestCanvas();
		this.#sameSizeCrate();
		this.#noCanvasCrate();
		this.#standardCrates();
		this.#lastCheckArrangerSameSizeToStandard();
		for (key in this.#crates)
			if (!(this.#crates[key]?.hasOwnProperty('crates') && CRATES.includes(key)))
				delete this.#crates[key];
				//key !== 'sameSizeCrate' ? delete this.#crates[key] : false;

		this.#allCrates();
		this.#cubAir();
		this.#totalCub();
		this.#whichAirPort();
		if (Array.isArray(this.#crates?.sameSizeCrate?.backUp)) {
			this.#totalCubBackUp();
			this.#whichAirPortBackUp();
			this.#allCratesBackUp();
		};
		return({ crates: this.#crates });
	};

	#tubeCrate() {
		const tubeCrate = new CraterTube(this.#works?.tubes);
		this.#crates.tubeCrate = tubeCrate;
	};

	#LargestCanvas() {
		const largestcrates = new CraterPythagoras(this.#works?.largest);
		this.#crates.largestCrate = largestcrates;
	};

	#sameSizeCrate() {
		const sameMeasure =	new CraterSameSize(this.#works?.sameSize);
		this.#crates.sameSizeCrate = sameMeasure;
	};

	#noCanvasCrate() {
		const noCanvas = new CraterNotCanvas(this.#works?.noCanvas);
		this.#crates.noCanvasCrate = noCanvas;
	};

	#standardCrates() {
		const BACKUP =	this.#crates.sameSizeCrate.hasOwnProperty('crates');
		const std =		new CraterStandard(this.#works?.sorted, BACKUP, 4, false);
		this.#crates.standardCrate = std;
	};

	#lastCheckArrangerSameSizeToStandard() {
		new CraterLastCheckReArranger(this.#crates);
	};

	#allCrates () {
		let key =				0;
		const CRATES =			[];
		const filterCrates =	(data) => {
			Array.isArray(data) ? CRATES.push(data) : false;
		};

		for (key in this.#crates)
			this.#crates[key]?.crates?.map(filterCrates);
		this.#crates.allCrates = CRATES;
	};

	#allCratesBackUp () {
		let check1;
		let check2;
		let key =		0;
		const CRATES =	[];
		const filterCrates =	(data) => {
			Array.isArray(data) ? CRATES.push(data) : false;
		};

		for (key in this.#crates) {
			check1 = this.#crates[key] === 'sameSizeCrate';
			check2 = this.#crates[key] === 'standardCrate';

			if (check1 || check2)
				this.#crates[key]?.backUp?.map(filterCrates);
			this.#crates[key]?.crates?.map(filterCrates);
		};
		this.#crates.allCratesBackUp = CRATES;
	};

	#cubAir() {
		let key =		0;
		const setCub =	(sizes) => {
			const COORDINATES = 3;
			if (Array.isArray(sizes) && sizes.length === COORDINATES) {
				const X =			sizes[0];
				const Z =			sizes[1];
				const Y =			sizes[2];
				const cubCrate =	new CubCalc(X, Z, Y).cubCalcAir;

				sizes.push(cubCrate);
			};
		};

		for (key in this.#crates)
			this.#crates[key]?.crates?.map(setCub);
		if(Array.isArray(this.#crates?.sameSizeCrate?.backUp)) {
			this.#crates?.sameSizeCrate?.backUp?.map(setCub);
			this.#crates?.standardCrate?.backUp?.map(setCub);
		};
	};

	#totalCub() {
		let key =	0;
		let total =	[];
		const setTotalCub =	(crate) => {
			if (Array.isArray(crate)) {
				total.push(crate[3]);
			};
		};

		for (key in this.#crates)
			this.#crates[key]?.crates?.map(setTotalCub);
		total = total.reduce((sum, val) => +(sum + val).toFixed(3), 0);
		this.#crates.airCubTotal = total;
	};

	#totalCubBackUp() {
		let check1;
		let check2;
		let total =			[];
		let key =			0;
		const setTotalCub =	(crate) => {
			if (Array.isArray(crate)) {
				total.push(crate[3]);
			};
		};

		for (key in this.#crates) {
			check1 = this.#crates[key] === 'sameSizeCrate';
			check2 = this.#crates[key] === 'standardCrate';

			if (check1 || check2)
				this.#crates[key]?.backUp?.map(setTotalCub);
			else if (!(check1 || check2))
				this.#crates[key]?.crates?.map(setTotalCub);
		};
		total = total.reduce((sum, val) => +(sum + val).toFixed(3), 0);
		this.#crates.airCubTotalBackUp = total;
	};

	#airPortOptions (crate) {
		const MAXX =	300;
		const MAXZ =	200;
		const MAXY =	160;

		if (Array.isArray(crate)) {
			const X = crate[0];
			const Z = crate[1];
			const Y = crate[2];

			return (!(X > MAXX || Z > MAXZ || Y > MAXY) ? 'PAX' : 'CARGO');
		};
	};

	#whichAirPort () {
		let pax =		0;
		let cargo =		0;
		let key =		0;
		let tmp;

		for (key in this.#crates)
			this.#crates[key]?.crates?.map(crate => {
				tmp =	this.#airPortOptions(crate);
				tmp === 'PAX' ? pax++ : tmp === 'CARGO' ? cargo++ : false;
			});
		this.#crates.whichAirPort = [{ PAX : pax }, { CARGO : cargo }];
	};

	#whichAirPortBackUp () {
		let check1;
		let check2;
		let tmp;
		let key =		0;
		let pax =		0;
		let cargo =		0;

		for (key in this.#crates) {
			check1 = this.#crates[key] === 'sameSizeCrate';
			check2 = this.#crates[key] === 'standardCrate';

			if (check1 || check2)
				this.#crates[key]?.backUp?.map(crate => {
				tmp =	this.#airPortOptions(crate);
				tmp === 'PAX' ? pax++ : tmp === 'CARGO' ? cargo++ : false;
				});
			else if (!(check1 || check2))
				this.#crates[key]?.crates?.map(crate => {
					tmp =	this.#airPortOptions(crate);
					tmp === 'PAX' ? pax++ : tmp === 'CARGO' ? cargo++ : false;
				});
		};
		this.#crates.whichAirPortBackUp = [{ PAX : pax }, { CARGO : cargo }];
	};
};
