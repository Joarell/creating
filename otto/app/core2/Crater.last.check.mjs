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
		return(JSON.parse(JSON.stringify(list)));
	};

// ╭───────────────────────────────────────────────────────────────────────────╮
// │ Simulates if the crate with 5 layer can consolidate all same size canvas. │
// ╰───────────────────────────────────────────────────────────────────────────╯
	#processingCratesList (listCrates, attCrate) {
		const GC =			new WeakSet();
		const LEN =			attCrate.works.length;
		const CUBPOS =		4;
		const MAXLAYER =	4;
		let i =				0;
		let bool =			true;
		let result;

		while(i++ < listCrates.length && bool) {
			if (i % 2 === 1) {
				result =	LEN === 1 ?
					JSON.parse(JSON.stringify(attCrate.works[0])):
					JSON.parse(JSON.stringify(attCrate.works));
				this.#removeCrate(listCrates, i, result);
				result =	this.#quickSort(result, CUBPOS);
				result =	new CraterStandard(result, false, MAXLAYER);
				if (result.crates.length === 2) {
					listCrates.splice(i, 1, result.crates[1]);
					listCrates.splice(i - 1, 1, result.crates[0]);
					bool =	false;
				}
				GC.add(result);
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

	#extractTheFifthLayer(data) {
		let works;
		let info;
		let i = 0;

		for (info in data) {
			if (i++ % 2 === 1)
				data[info].works.length === 5 ? works = data[info].works[4].layer5 : 0;
			if(works)
				break;
		};
		return(works ? { info, works } : false);
	}

	#newCrateSet(works, layers) {
		const CUBPOS =	4;
		let newList =	[];
		let listSorted;

		Object.entries(layers).map(arr => {
			arr[1].map(data => {
				let info;

				for (info in data) {
					if (data[info].length > 0 && Array.isArray(data[info]))
						data[info].map(art => newList.push(art));
				}
			});
		});
		works.map(art => newList.push(art));
		listSorted = this.#quickSort(newList, CUBPOS);
		return(listSorted);
	};

	#updatesCrates(crates, pos, newCrate, target) {
		const PAD = 10;

		crates[target].works.pop();
		crates[target - 1][1] -= PAD;
		crates.splice(pos - 1, 1, newCrate.crates[0]);
		crates.splice(pos, 1, newCrate.crates[1]);
		return(crates);
	};

	#removeTheFifthLayer() {
		const { crates } =	this.#cratesDone.standardCrate;
		const list =		this.#extractTheFifthLayer(crates);
		const LIMITLAYER =	5;
		let count =			0;
		let newList;
		let newCrate;
		let check;
		let layers;

		if (!list)
			return;
		for (layers in crates) {
			if (!Array.isArray(crates[layers]) && count !== +list.info) {
				newList = this.#newCrateSet(list.works, crates[layers]);
				newCrate = new CraterStandard(newList, false, LIMITLAYER);
				check = newCrate.crates.length === 2;
				console.log(newCrate, 'and', count);
				if (check) {
					this.#updatesCrates(crates, count, newCrate, list.info);
					break ;
				};
			};
			count++;
		};
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
			return ;
		};
		this.#removeTheFifthLayer();
	};
};
