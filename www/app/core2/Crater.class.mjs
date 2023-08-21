

import CraterPythagoras from "./Crater.largest.canvas.mjs";
import CraterLastCheckReArranger from "./Crater.last.check.mjs";
import CraterNotCanvas from "./Crater.no.canvas.mjs";
import CraterSameSize from "./Crater.same.size.mjs";
import CraterStandard from "./Crater.standard.crate.mjs";
import CraterTube from "./Crater.tube.crate.mjs";
import CubCalc from "./CubCalc.class.mjs";


export default class Crater {
	#list;
	#crates;

	constructor (list) {
		this.#list =	list;
		this.#crates =	[];
		return(this.#startCrateList());
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

		return({ crates: this.#crates });
	};
	
	#tubeCrate() {
		const tubeCrate = new CraterTube(this.#list?.tubes);
		this.#crates.push({tubeCrate : tubeCrate});
	};

	#LargestCanvas() {
		const largestcrates = new CraterPythagoras(this.#list?.largest);
		this.#crates.push({largestCrate : largestcrates});
	};
	
	#sameSizeCrate() {
		const sameMeasure = new CraterSameSize(this.#list?.sameSize);
		this.#crates.push({sameSizeCrate : sameMeasure});
	};

	#noCanvasCrate() {
		const noCanvas = new CraterNotCanvas(this.#list?.noCanvas);
		this.#crates.push({noCanvasCrate : noCanvas});
	};

	#standardCrates() {
		const standard = new CraterStandard(this.#list?.sorted);
		this.#crates.push({standardCrate : standard});
	};

	#lastCheckArrangerSameSizeToStandard() {
		new CraterLastCheckReArranger(this.#crates);
		// console.log(this.#crates[4].standardCrate.crates);
	};

	#cubAir() {
		const setCub = (sizes) => {
			if (sizes === false)
				return ;
			if (sizes.length === 3) {
				const X =			sizes[0];
				const Z =			sizes[1];
				const Y =			sizes[2];
				const cubCrate =	new CubCalc(X, Z, Y).cubCalcAir;

				sizes.push(cubCrate);
			};
		};

		this.#crates[0].tubeCrate.crates.map(crate => setCub(crate));
		this.#crates[1].largestCrate.crates.map(crate => setCub(crate));
		this.#crates[2].sameSizeCrate.crates.map(crate => setCub(crate));
		this.#crates[3].noCanvasCrate.crates.map(crate => setCub(crate));
		this.#crates[4].standardCrate.crates.map(crate => setCub(crate));
	};

	#totalCub() {
		let total =	[];
		const setTotalCub =	(crate) => {
			if (crate === false)
				return ;
			if (crate.length === 4) {
				total.push(crate[3]);
			};
		};

		this.#crates[0].tubeCrate.crates.map(crate => setTotalCub(crate));
		this.#crates[1].largestCrate.crates.map(crate => setTotalCub(crate));
		this.#crates[2].sameSizeCrate.crates.map(crate => setTotalCub(crate));
		this.#crates[3].noCanvasCrate.crates.map(crate => setTotalCub(crate));
		this.#crates[4].standardCrate.crates.map(crate => setTotalCub(crate));
		
		total = total.reduce((sum, val) => sum + val, 0);
		this.#crates.airCubTotal = total;
	};

	#whichAirPort () {
		let pax =		0;
		let cargo =		0;
		const MAXX =	300;
		const MAXZ =	200;
		const MAXY =	160;
		const wichAirport =	(crate) => {
			if (crate === false)
				return ;
			if (crate.length === 4) {
				const X = crate[0];
				const Z = crate[1];
				const Y = crate[2];

				!(X > MAXX && Z > MAXZ || Y > MAXY) ? pax++ : cargo++;
			};
		};

		this.#crates[0].tubeCrate.crates.map(crate => wichAirport(crate));
		this.#crates[1].largestCrate.crates.map(crate => wichAirport(crate));
		this.#crates[2].sameSizeCrate.crates.map(crate => wichAirport(crate));
		this.#crates[3].noCanvasCrate.crates.map(crate => wichAirport(crate));
		this.#crates[4].standardCrate.crates.map(crate => wichAirport(crate));

		this.#crates.wichAirport = [{ PAX : pax }, { CARGO : cargo }];
	};
};
