

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
		this.#tubeCrate();
		this.#LargestCanvas();
		this.#sameSizeCrate();
		this.#noCanvasCrate();
		this.#standardCrates();
		this.#lastCheckArrangerSameSizeToStandard();
		this.#cubAir();
		this.#totalCub();
		this.#whichAirPort();

		if (Array.isArray(this.#crates.sameSizeCrate.backUp)) {
			this.#totalCubBackUp();
			this.#whichAirPortBackUp();
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
		const standard = new CraterStandard(this.#works?.sorted);
		this.#crates.standardCrate = standard;
	};

	#lastCheckArrangerSameSizeToStandard() {
		new CraterLastCheckReArranger(this.#crates);
	};

	#cubAir() {
		const setCub = (sizes) => {
			const COORDINATES = 3;
			if (Array.isArray(sizes) && sizes.length === COORDINATES) {
				const X =			sizes[0];
				const Z =			sizes[1];
				const Y =			sizes[2];
				const cubCrate =	new CubCalc(X, Z, Y).cubCalcAir;

				sizes.push(cubCrate);
			};
		};

		this.#crates?.tubeCrate?.crates?.map(setCub);
		this.#crates?.largestCrate?.crates?.map(setCub);
		this.#crates?.sameSizeCrate?.crates?.map(setCub);
		this.#crates?.noCanvasCrate?.crates?.map(setCub);
		this.#crates?.standardCrate?.crates?.map(setCub);

		if(Array.isArray(this.#crates.sameSizeCrate.backUp)) {
			this.#crates?.sameSizeCrate?.backUp?.map(setCub);
			this.#crates?.standardCrate?.backUp?.map(setCub);
		};
	};

	#totalCub() {
		let total =	[];
		const setTotalCub =	(crate) => {
			if (Array.isArray(crate)) {
				total.push(crate[3]);
			};
		};

		this.#crates?.tubeCrate?.crates?.map(setTotalCub);
		this.#crates?.largestCrate?.crates?.map(setTotalCub);
		this.#crates?.sameSizeCrate?.crates?.map(setTotalCub);
		this.#crates?.noCanvasCrate?.crates?.map(setTotalCub);
		this.#crates?.standardCrate?.crates?.map(setTotalCub);
		
		total = total.reduce((sum, val) => +(sum + val).toFixed(3), 0);
		this.#crates.airCubTotal = total;
	};

	#totalCubBackUp() {
		let total =	[];
		const setTotalCub =	(crate) => {
			if (crate === false)
				return ;
			if (Array.isArray(crate)) {
				total.push(crate[3]);
			};
		};
		this.#crates?.tubeCrate?.crates?.map(setTotalCub);
		this.#crates?.largestCrate?.crates?.map(setTotalCub);
		this.#crates?.sameSizeCrate?.backUp?.map(setTotalCub);
		this.#crates?.noCanvasCrate?.crates?.map(setTotalCub);
		this.#crates?.standardCrate?.backUp?.map(setTotalCub);
		
		total = total.reduce((sum, val) => +(sum + val).toFixed(3), 0);
		this.#crates.airCubTotalBackUp = total;
	};

	#whichAirPort () {
		let pax =		0;
		let cargo =		0;
		const wichAirPort = (crate) => {
			const MAXX =	300;
			const MAXZ =	200;
			const MAXY =	160;

			if (crate === false)
				return ;
			if (Array.isArray(crate)) {
				const X = crate[0];
				const Z = crate[1];
				const Y = crate[2];

				!(X > MAXX && Z > MAXZ || Y > MAXY) ? pax++ : cargo++;
			};
		};

		this.#crates?.tubeCrate?.crates?.map(wichAirPort);
		this.#crates?.largestCrate?.crates?.map(wichAirPort);
		this.#crates?.sameSizeCrate?.crates?.map(wichAirPort);
		this.#crates?.noCanvasCrate?.crates?.map(wichAirPort);
		this.#crates?.standardCrate?.crates?.map(wichAirPort);

		this.#crates.wichAirPort = [{ PAX : pax }, { CARGO : cargo }];
	};

	#whichAirPortBackUp () {
		let pax =		0;
		let cargo =		0;
		const wichAirPort = (crate) => {
			const MAXX =	300;
			const MAXZ =	200;
			const MAXY =	160;

			if (crate === false)
				return ;
			if (Array.isArray(crate)) {
				const X = crate[0];
				const Z = crate[1];
				const Y = crate[2];

				!(X > MAXX && Z > MAXZ || Y > MAXY) ? pax++ : cargo++;
			};
		};

		this.#crates?.tubeCrate?.crates?.map(wichAirPort);
		this.#crates?.largestCrate?.crates?.map(wichAirPort);
		this.#crates?.sameSizeCrate?.backUp?.map(wichAirPort);
		this.#crates?.noCanvasCrate?.crates?.map(wichAirPort);
		this.#crates?.standardCrate?.backUp?.map(wichAirPort);

		this.#crates.wichAirPortBackUp = [{ PAX : pax }, { CARGO : cargo }];
	};
};
