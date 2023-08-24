import CraterStandard from "./Crater.standard.crate.mjs";


export default class CraterLastCheckReArranger {
	#cratesDone;

	constructor (crates) {
		if (crates[0] !== 'crates ahead')
			return (false);

		this.#cratesDone = crates;
		return(this.#consolidationStarted());
	};

	#quickSort(arts, pos) {
		if (arts.length <= 1)
			return(arts);

		const left =	[];
		const pivot =	arts.splice(0, 1);
		const right =	[];
		let j =			0;

		for (j in arts)
			arts[j][pos] <= pivot[0][pos] ? left.push(arts[j]) : right.push(arts[j]);
		return(this.#quickSort(left, pos).concat(pivot, this.#quickSort(right, pos)));
	};

	#removeCrate(crate, pos, list) {
		const crateWorks =	crate[pos];
		const { works } =	crateWorks;

		works.map(layer => {
			Object.entries(layer).map(arts => {
				arts.length === 1 ?
					list.push(arts[1].flat()) :
					arts[1].map(works => list.push(works));
			});
		});
	};

// ╭───────────────────────────────────────────────────────────────────────────╮
// │ Simulates if the crate with 5 layer can consolidate all same size canvas. │
// ╰───────────────────────────────────────────────────────────────────────────╯
	#processingCratesList (listCrates, attCrate) {
		let result;
		let i =				0;
		let bool =			true;
		const LEN =			attCrate.works[0].length;
		const CUBPOS =		4;
		const MAXLAYER =	5;
		let extracted =		LEN === 1 ?
			[...attCrate.works[0].flat()]:
			[...attCrate.works[0]];

		while(i++ < listCrates.length && bool) {
			if (i % 2 === 1) {
				result =	[...extracted];
				this.#removeCrate(listCrates, i, result);
				result = this.#quickSort(result, CUBPOS);
				result = new CraterStandard(result, MAXLAYER);
				if (result.crates.length === 2) {
					listCrates.splice(i, 1, result.crates[1]);
					listCrates.splice(i - 1, 1, result.crates[0]);
					bool = false;
				};
				result = null;
			};
		};
		return(!bool);
	};

	#consolidationTrail(standard, sameSizes, pos){
		if (pos < 0)
			return ;
		if (pos % 2 === 1)
			if(this.#processingCratesList(standard, sameSizes[pos])){
				sameSizes.splice(pos - 1, 2);
				pos = sameSizes.length;
			};
		return(this.#consolidationTrail(standard, sameSizes, pos - 1));
	};

	#consolidationStarted() {
		const sameSize =	this.#cratesDone.sameSizeCrate.crates;
		const checkBackUp =	this.#cratesDone.sameSizeCrate.backUp;
		const standard =	this.#cratesDone.standardCrate.crates;
		let sameLen;

		if(!sameSize)
			return ;
		sameLen = sameSize.length;
		this.#consolidationTrail(standard, sameSize, sameLen);
		if (sameSize.length === checkBackUp.length) {
			this.#cratesDone.sameSizeCrate.backUp = false;
			this.#cratesDone.standardCrate.backUp = false;
		};
	};
};
