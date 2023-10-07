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

	#layersInterfaceChecker(layer) {
		if (Array.isArray(layer[0]))
			return(layer.map(art => art.length === 6 ? art.pop() : false));
		switch (Object.keys(layer)[0]) {
			case 'layer1' :
				return(layer.layer1.map(art => art.length === 6? art.pop(): false));
			case 'layer2' :
				return(layer.layer2.map(art => art.length === 6? art.pop(): false));
			case 'layer3' :
				return(layer.layer3.map(art => art.length === 6? art.pop(): false));
			case 'layer4' :
				return(layer.layer4.map(art => art.length === 6? art.pop(): false));
			case 'layer5' :
				return(layer.layer5.map(art => art.length === 6? art.pop(): false));
		};
	};

	#cleanWorksSpinning(data) {
		let key = 0;
		let val = 0;

		for (key in data) {
			if (data[key][val] === 'works') {
				data[key][val].works.map(arts => {
					if (Array.isArray(arts) && arts.length === 6)
						arts.pop();
					else if (!Array.isArray(arts))
						this.#layersInterfaceChecker(arts);
				});
			};
		};
	};

// ╭───────────────────────────────────────────────────────────────────────────╮
// │ Simulates if the crate with 5 layer can consolidate all same size canvas. │
// ╰───────────────────────────────────────────────────────────────────────────╯
	#processingCratesList (listCrates, attCrate) {
		const LEN =			attCrate.works.length;
		const CUBPOS =		4;
		const MAXLAYER =	5;
		let result;
		let i =				0;
		let bool =			true;
		let extracted =		LEN === 1 ?
			[...attCrate.works[0]]:
			[...attCrate.works];

		while(i++ < listCrates.length && bool) {
			if (i % 2 === 1) {
				result =	[...extracted];
				this.#removeCrate(listCrates, i, result);
				result =	this.#quickSort(result, CUBPOS);
				result =	new CraterStandard(result, false, MAXLAYER);
				if (result.crates.length === 2) {
					listCrates.splice(i, 1, result.crates[1]);
					listCrates.splice(i - 1, 1, result.crates[0]);
					bool =	false;
				}
				else
					this.#cleanWorksSpinning(result);
				result = null;
			};
		};
		return(!bool);
	};

	#consolidationTrail(standard, sameSizes, pos){
		if (pos < 0)
			return(sameSizes);
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

		if(!sameSize || !standard)
			return ;
		sameLen = sameSize.length;
		this.#consolidationTrail(standard, sameSize, sameLen);
		if (sameSize.length === checkBackUp.length) {
			this.#cratesDone.sameSizeCrate.backUp = false;
			this.#cratesDone.standardCrate.backUp = false;
		};
	};
};