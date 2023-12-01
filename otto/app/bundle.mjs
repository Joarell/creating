class Converter {
	#values;

	constructor (...args) {
		this.#values = [...args];
		// console.log(this.#values);
	};

	// INFO: Converts inches to centimeters.
	get cmConvert () {
		return (inConvert.call(this.#values));
	}

	// INFO: Converts centimeters to inches.
	get inConvert () {
		return (cmConvert.call(this.#values));
	}
}

function checkValues () {
	const checker = this.filter(val => {
		if (Number(val)) 
			return (val);
		else if (typeof(val) === 'string' && val)
			return (+val.trim());
		else
			return;
	});
	try {
		if (!checker || checker.length < 1) {
			const error = "Please, provide a value to be converted.";
			throw new TypeError(error);
		}
	}
	catch (err) {
		return (err);
	}	return(checker);
}

function cmConvert () {
	const trimmer = checkValues.call(this);

	if (Array.isArray(trimmer)) {
		const INCH =	2.54;
		const result =	this.map(val => {
			return (+(val / INCH).toFixed(3));
		});

		return (result);
	}	return (trimmer);
}

function inConvert () {
	const trimmer = checkValues.call(this);

	if (Array.isArray(trimmer)) {
		const INCH =	2.54;
		const result =	this.map(val => {
			return (+(val * INCH).toFixed(0));
		});
		
		return (result);
	}	return (trimmer);
}

class RegexChecker {
	#values;

	constructor (...args) {
		this.#values = [...args];
	};

	get regexSizes() {
		return (regexWorks.call(this.#values));
	};
}

function regexWorks () {
	try {
		const regx =	this.map(val => {
			const reg = /[0-9]{1,3}/.test(val);
			return(Number.isNaN(reg) ? true : reg);
		});
		const error =	"Not a valid entry to RegexChecker!";

		if (regx.includes(false)) {
			throw new TypeError(error);
		};
	}
	catch (err) {
		return (err);
	}
}

class CubCalc {
	#x;
	#z;
	#y;

	constructor (x, z, y) {
		this.#x = +x;
		this.#z = +z;
		this.#y = +y;
	};

	get cubCalcAir () {
		return (CubCalcAir(this.#x, this.#z, this.#y));
	};

	get cubArea () {
		return (CubArea(this.#x, this.#z, this.#y));
	};
}

function CubCalcAir(x, z, y) {
	const regex = new RegexChecker(x, z, y).regexSizes;

	if (typeof(regex) === 'object')
		return (regex);

	const CUBAIR = 6000;
	const result = ((x * z * y) / CUBAIR).toFixed(3);

	return(+result);
}

function CubArea(x, z, y) {
	const regex = new RegexChecker(x, z, y).regexSizes;

	if (typeof(regex) === 'object')
		return (regex);

	const CMTOM =	1_000_000;
	const result =	((x * z * y) / CMTOM).toFixed(3);
	
	return(+result);
}

class Hexaedro {
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
}

class ArtWork extends Hexaedro {
	#code;
	#x;
	#z;
	#y;

	constructor (code, x, z, y) {
		super(x, z, y);
		try {
			if (!code || code.trim() <= 0) {
				const error = `Please, provide a valid code. Current: ${code}`;
				throw new TypeError(error);
			}
		}
		catch (err) {
			return (err);
		}
		this.#code =	""+code;
		this.#x =		+x;
		this.#z =		+z;
		this.#y =		+y;
	};

	get arr () {
		return ([this.#code, this.#x, this.#z, this.#y]);
	};

	get cAir () {
		return (new CubCalc(this.#x, this.#z, this.#y).cubCalcAir);
	};

	get cubed () {
		return (new CubCalc(this.#x, this.#z, this.#y).cubArea);
	};

	get autoConvert () {
		const CMVALUES = new Converter(this.#x, this.#z, this.#y).cmConvert;

		this.#x =	CMVALUES[0];
		this.#z =	CMVALUES[1];
		this.#y =	CMVALUES[2];

		return([this.#code, this.#x, this.#z, this.#y]);
	};

	get data () {
		return ({ code : this.#code, x : this.#x, z : this.#z, y : this.#y});
	};
	
}

class ArrangerLargestCanvas {
	#list;

	constructor (list) {
		this.#list = list;
		return(this.#largest());
	};

	#finder () {
		const MAXHEIGHT = 220;
		const largestCanvas = this.filter(work => {
			if(work[1] > MAXHEIGHT || work[3] > MAXHEIGHT)
				return(work);
			return ;
		});

		return(largestCanvas);
	}

	#largest() {
		const { sorted } =	this.#list;
		const finder =		this.#finder.call(sorted);

		finder.map(canvas => {
			this.#list.sorted.splice(this.#list.sorted.indexOf(canvas), 1);
		});
		this.#list.largest = finder;

		return (this.#list);
	};
}

class ArrangerNoCanvas {
	#peces;

	constructor (list) {
		this.#peces = list;
		return(this.#noCanvas());
	};

	#removePeces (peces) {
		peces.map(element => {
			this.sorted.splice(this.sorted.indexOf(element), 1);
		});
	};

	#noCanvasOut () {
		let { 
			sorted, 
			sameSize 
		} =					this.#peces;
		const MAXDEPTH =	10;
		let checkerOne =	sorted.filter(pece => pece[2] > MAXDEPTH);
		let checkerTwo =	sameSize.filter(pece => pece[2] > MAXDEPTH);
		let found =			[];

		checkerOne.map(pece => found.push(pece));
		this.#removePeces.call(this.#peces, checkerOne);
		checkerTwo.map(pece => found.push(pece));
		this.#removePeces.call(this.#peces, checkerTwo);

		sorted =		null;
		sameSize =		null;
		checkerOne =	null;
		checkerTwo =	null;
		this.#peces.noCanvas = found;
		return(this.#peces);
	};

	#noCanvas () {
		const filtered = this.#noCanvasOut();
		return (filtered);
	};
}

class ArrangerSameSize {
	#list;

	constructor ({ sorted }) {
		this.#list = sorted;
		return(this.#sameSizeTrail());
	};

	#trailOne() {
		const MAXDEPTH =	10;
		const getter =		[];
		const checker =		(a, b) => a[4] === b[4] && a[0] !== b[0];
		this.map(work => {
			let i =	0;

			if (work[2] <= MAXDEPTH)
				for(i in this)
					if (!getter.includes(this[i]) && checker(this[i], work))
						getter.push(this[i]);
		});
		return(getter);
	};

	#checker(art, work) {
		const x =	work[1];
		const y =	work[3];
		const cub =	work[4];
	
		return (art[1] === x && art[3] === y && art[4] === cub);
	};

	#trailTwo(list) {
		const sameSize = [];
		list.map(work => {
			let getter =	[];
			let i =		0;

			for(i in list) {
				if (this.#checker(list[i], work) && !sameSize.includes(list[i]))
					getter.push(list[i]);	
			}			if (getter.length >= 4)
				getter.map(element => {
					sameSize.push(element);
				});
			getter = null;
		});

		return(sameSize);
	};

	#sameSizeTrail () {
		const pathOne = this.#trailOne.call(this.#list);
		const pathTwo = this.#trailTwo(pathOne);

		pathTwo.map(art => {
			this.#list.splice(this.#list.indexOf(art), 1);
		});

		return({sorted: this.#list, sameSize: pathTwo});
	};
}

class ArrangerStarter {
	#list;

	constructor (works) {
		this.#list = works;
		return(this.#starter());
	};

	#addCubValueToEachWork() {
		const cubedList = this.#list.map(work => {
			const arrWork = work.arr;
			arrWork.push(work.cubed);

			return(arrWork);
		});
		return(cubedList);
	};

	#quickS(list, pos) {
		if (list.length <= 1)
			return(list);

		const left =	[];
		const pivot =	list.splice(0, 1);
		const right =	[];

		list.map(work => {
			work[pos] <= pivot[0][pos] ? left.push(work): right.push(work);
		});
		return(this.#quickS(left, pos) .concat(pivot, this.#quickS(right, pos)));
	};

	#starter() {
		const arrCubedList =	this.#addCubValueToEachWork();
		const CUBEDPOS =		4;
		const sorted =			this.#quickS(arrCubedList, CUBEDPOS);

		return({ sorted });
	};
}

class ArrangerTube {
	#list;

	constructor (list) {
		this.#list = list;
		return(this.#findTubesOnTheList());
	};

	#findTubesOnTheList() {
		const { noCanvas } =	this.#list;
		const tubes =			noCanvas.filter(pece => {
			if(pece[1] !== pece[2] && pece[2] === pece[3])
				return(pece);
			return ;
		});

		tubes.map(art => {
			this.#list.noCanvas.splice(this.#list.noCanvas.indexOf(art), 1);
		});
		this.#list.tubes = tubes;
		return (this.#list);
	};
}

class Arranger {
	#works;
	#procList;

	constructor (list) {
		this.#works = list;
		const dataChecker =	this.#checkData();

		if(dataChecker && dataChecker.constructor.name === 'TypeError')
			return (dataChecker);
		this.#procList = Object.assign(Arranger, this.#solver());
		return (this.#procList);
	};
	
	#solver () {
		this.#start();
		this.#sameSizeTrail();
		this.#noCanvasTrail();
		this.#largestCanvasTrail();
		this.#findTubes();

		return(Object.assign(Arranger, { list: this.#works }));
	};

	#checkData () {
		try {
			const check =	(val) => val.length === 0 || !val;
			const checker =	(!Array.isArray(this.#works) || check(this.#works));

			if(checker) {
				const error = `Please, provide a type of 'ArtWork' object.`;
				throw new TypeError(error);
			}
			const artWork =	this.#works.map(work => {
				return (work.constructor.name === "ArtWork");
			});
			if (artWork.includes(false)) {
				const error = `Some work is not of the type 'ArtWork' object.`;
				throw new TypeError(error);
			}
		}
		catch (err) {
			return(err);
		}	};

	#start () {
		this.#works = new ArrangerStarter(this.#works);
	};

	#sameSizeTrail () {
		this.#works = new ArrangerSameSize(this.#works);
	};

	#noCanvasTrail () {
		this.#works = new ArrangerNoCanvas(this.#works);
	};

	#largestCanvasTrail () {
		this.#works = new ArrangerLargestCanvas(this.#works);
	};

	#findTubes () {
		this.#works = new ArrangerTube(this.#works);
	};
}

class CraterPythagoras {
	#largest;

	constructor (canvas) {
		if(!canvas || canvas.length === 0)
			return({ largest: false });
		this.#largest = canvas;
		return(this.#pitagorasCrater());
	};

	#setPadding(innerCrate, layers) {
		const PAD =		23;
		const HIGHPAD =	28;
		const LAYER =	10;
		const X =		innerCrate[0] + PAD;
		const Z =		(innerCrate[1] + PAD) + (LAYER * layers);
		const Y =		innerCrate[2] + HIGHPAD;

		return ([X, Z, Y]);
	};

	#pitagorasTheorem(crate) {
		const MAXHEIGHT =	240;
		const a =			crate[2] ** 2;
		const b =			MAXHEIGHT ** 2;
		const c =			a > b ? a - b : b - a;
		const z =			(~~(Math.sqrt(c) * 100)) / 100;

		return ([crate[0], z, MAXHEIGHT]);
	};

	#defineCrate(canvas) {
		let crate;
		let x = 0;
		let z = 0;
		let y = 0;

		canvas.map(work => {
			x < work[1] ? x = work[1] : false;
			z < work[2] ? z = work[2] : false;
			y < work[3] ? y = work[3] : false;
		});
		crate = this.#setPadding([x, z, y], canvas.length);
		return(crate);
	};

	#crateInterface(works) {
		let crate;
		let pitagorasCrates;

		crate =				this.#defineCrate(works);
		pitagorasCrates =	this.#pitagorasTheorem(crate);
		return(pitagorasCrates);
	};

	#largestCrateTrail () {
		const MAXCANVAS =	3;
		let crates =		[];
		let canvas;

		while(this.#largest.length) {
			canvas = this.#largest.splice(0, MAXCANVAS);
			crates.push(this.#crateInterface(canvas));
			crates.push({ works: canvas });
		}		return(crates);
	};

	#pitagorasCrater() {
		const crates = this.#largestCrateTrail();
		return(this.largest = { crates: crates });
	};
}

class CraterStandard {
	#list;
	#maxLayers;
	#backUp;

	constructor(canvas, backUp, maxLayer) {
		if(!canvas || canvas.length === 0)
			return({ standard: false});

		this.#list =		canvas;
		this.#maxLayers =	maxLayer ?? 4;
		this.#backUp =		backUp;
		return(this.#startCrate());
	}

	#startCrate() {
		const ARTS = [];

		this.#provideCrate(ARTS);
		if (!this.#backUp)
			return ({ crates :  ARTS });
		return({ crates : ARTS, backUp : JSON.parse(JSON.stringify(ARTS)) });
	};

	#quickSort(arts, pos) {
		if (arts.length <= 1)
			return(arts);

		const left =	[];
		const pivot =	arts.splice(0, 1);
		const right =	[];

		arts.map(work => {
			work[pos] <= pivot[0][pos] ? left.push(work) : right.push(work);
		});
		return(this.#quickSort(left, pos).concat(pivot, this.#quickSort(right, pos)));
	};

	#defineFinalSize(innerSize, works) {
		const DEFAULTPAD =	23;
		const HIGHPAD =		28;
		const LAYERPAD =	10;
		const X =			innerSize[0] + DEFAULTPAD;
		const Y =			innerSize[2] + HIGHPAD;
		let z =				works.length * LAYERPAD + DEFAULTPAD;
		let i =				0;
		let tmp =			0;

		for (i in works) {
			Object.entries(works[i]).map(canvas => {
				canvas[1].map(art => {
					art[2] > tmp ? tmp = art[2] : false;
				});
				z +=	tmp;
				tmp =	0;
			});
		}		return([X, z, Y]);
	};

	//						x1
	//		   ╭──────────────────────────╮
	//		   │                          │
	//		   │                          │
	//		   │                          │
	//		y1 │                          │ y2
	//		   │                          │
	//		   │                          │
	//		   │                          │
	//		   ╰──────────────────────────╯
	//						x2

	#selectAxioToAddworks(work, layer, size) {
		let sizeX = work.length > 5 ? work[3] / size[0] : work[1] / size[0];
		let sizeY = work.length > 5 ? work[1] / size[2] : work[3] / size[2];
		const avlX = layer[0].x1 < 1 ? sizeX + layer[0].x1 <= 1 : 0;
		const avlY = layer[0].y1 < 1 ? sizeY + layer[0].y1 <= 1 : 0;

		return({ avlX, avlY });
	};

	#updateWorkCoordinates(art, sizeX, sizeY, layer) {
		const check1 = layer[0].x1 + sizeX <= 1;
		const check2 = layer[0].y1 + sizeY <= 1;

		if(art[1].x2 === 0) {
			check2 || !check1 && check2 ?
				art[1].x2 += +sizeX.toFixed(2) : 0;
			art[1].y2 < 1 && check1 || !check2 ?
				art[1].y2 += +sizeY.toFixed(2) : 0;
		}
		else {
			art[1].x2 < 1 && !check1 && !check2 ?
				art[1].x2 = +(art[1].x2 + sizeX).toFixed(2) :
					check1 ? art[1].y2 = +(art[1].y2 + sizeY).toFixed(2) : 0;
			art[1].x2 > 1 ? art[1] = 1 : 0;
		}		return(art);
	};

	#updateAllWorksCoordinates(work, layer, size) {
		const filled =	[...layer];
		const place =	this.#selectAxioToAddworks(work, layer, size);
		const LEN =		layer.length - 1;

		filled.reverse().map((art, i) => {
			if (i >= LEN)
				return ;
			let sizeX;
			let sizeY;
			const artX = art[0].length > 5 ? art[0][3] : art[0][1];
			const artY = art[0].length > 5 ? art[0][1] : art[0][3];
			
			if (place.avlX && place.avlY)
				sizeX = work.length > 5 ? work[3] / size[0] : work[1] / size[0];
			else
				sizeX = work.length > 5 ? work[3] / artX : work[1] / artX;
			if (place.avlY)
				sizeY = work.length > 5 ? work[1] / size[2] : work[3] / size[2];
			else
				sizeY = work.length > 5 ? work[1] / artY : work[3] / artY;
			this.#updateWorkCoordinates(art, sizeX, sizeY, layer);
		}, 0);
		return(layer);
	};

	#updateLayerSpace(layer, work, valX, valY) {
		const { size } = layer[0];

		if (layer.length > 1) {
			layer[0].x1 + valX <= 1 ? layer[0].x1 = layer[0].x1 + valX : 0;
			layer[0].y1 + valY <= 1 ? layer[0].y1 = layer[0].y1 + valY : 0;
			layer[0].y1 === 1 ? layer[0].x2 = layer[0].x2 + valX : 0;
			layer[0].x1 === 1 ? layer[0].y2 = layer[0].y2 + valY : 0;
		}
		else {
			layer[0].x1 = layer[0].x1 !== 0 ? layer[0].x1 + valX : valX;
			layer[0].y1 = layer[0].y1 !== 0 ? layer[0].y1 + valY : valY;
			layer[0].x2 = work[3] === size[2] ? 1 : 0;
			layer[0].y2 = work[1] === size[0] ? 1 : 0;
		}		return(layer);
	};

	#setLayerCoordinates(work, layer, { size }, prev) {
		const sizeX = work.length > 5 ? work[3] / size[0] : work[1] / size[0];
		const sizeY = work.length > 5 ? work[1] / size[2] : work[3] / size[2];
		const x1 = 1;
		const y1 = 1;
		let x2;
		let y2;

		if (layer.length > 1) {
			this.#updateAllWorksCoordinates(work, layer, size);
			x2 = sizeY + layer[prev][1].x2 === 1 ? 1 : 0;
			y2 = sizeX + layer[prev][1].y2 === 1 ? 1 : 0;
		}
		else {
			x2 = sizeY + layer[0].x2 === 1 ? 1 : 0;
			y2 = sizeX + layer[0].y2 === 1 ? 1 : 0;
		}		this.#updateLayerSpace(layer, work, sizeX, sizeY);
		layer.push([work, { x1, y1, x2, y2, prev }]);
		return(layer);
	};

	#findWorksToMatchInLayer(work, layer, { size }) {
		const ICON =	`<i class="nf nf-oct-sync"></i>`;
		let workX =		work[1];
		let workY =		work[3];
		let len =		layer.length;
		let spin =		0;
		let check1;
		let check2;

		while(len-- >= 0) {
			check1 =	workX / size[0] <= 1 && workY / size[2] <= 1;
			check2 =	workX / size[0] <= 1 && workY / size[2] <= 1;
			if (check1 || check2) {
				work.length >= 6 ? work.pop() : 0;
				spin === 1 && work.length === 5 ? work.push(ICON) : 0;
				return(this.#setLayerCoordinates(work, layer, layer[0]));
			}			[workX, workY] = [workY, workX];
			spin = 1;
		}		return(layer);
	};

	#checkPrevAvailableSpace(nextX, nextY, layer, work) {
		if (!work)
			return(false);
		const { x1, y2 } =	layer[0];
		const { x2 } =	layer[work][1];
		const avlX =	1 - x1;
		let place;

		place = x1 < 1 ? x2 + nextX + avlX <= 1 : x2 + nextX <= 1;
		return(place && y2 + nextY <= 1 || place && nextX <= x2);
	};

	#fitSizesCheckIn(work, layer, spin) {
		const { size, x1, y1 } =	layer[0];
		let workX =					work[1];
		let workY =					work[3];
		let check1 =				false;
		let check2 =				false;
		let check3 =				false;
		let seeking =				true;
		let i =						layer.length;
		let height;
		let support;

		spin === 1 ? [workX, workY] = [workY, workX] : 0;
		workX /= size[0];
		workY /= size[2];
		while (i > 1 && seeking && (workY <= 1)) {
			i--;
			support = this.#checkPrevAvailableSpace(workX, workY, layer, layer[i][1].prev);
			height = layer[i][0].length > 5 ? layer[i][0][1] : layer[i][0][3];
			check1 = layer[i][1].y2 <= workY && x1 + workX <= 1;
			!check1 ? check2 = layer[i][1].x2 <= workX && y1 + workY <= 1 : 0;
			!check2 ? check3 = height >= work[3] && support : 0;
			check1 || check2 || check3 ? seeking = false : 0;
		}		if(check1 || check2 || check3)
			return(check3 ? layer[i][1]?.prev : i);
		return(false);
	};

	#metchCloseWorkOnLayer(work, layer) {
		const ICON =	`<i class="nf nf-oct-sync"></i>`;
		let flip =		true;
		let spin =		0;
		let baseWork;

		if (layer.length === 1)
			return(this.#findWorksToMatchInLayer(work, layer, layer[0]));
		while(flip) {
			baseWork = this.#fitSizesCheckIn(work, layer, spin);
			if(baseWork) {
				work.length >= 6 ? work.splice(5, Infinity) : 0;
				spin === 1 && work.length === 5 ? work.push(ICON) : 0;
				return(this.#setLayerCoordinates(work, layer, layer[0], baseWork));
			}			spin === 1 ? flip = false : 0;
			spin === 0 ? spin = 1 : spin = 0;
		}		return(layer);
	};

	#matchCanvasInLayer(matched, layer, len) {
		const { x1, y1, x2, y2 } = layer[0];
		const emptyLayer = (x1 === 1 && y1 === 1 && x2 === 1 && y2 === 1);

		if(emptyLayer || len < 0) {
			layer.map((work, i) => i > 0 ? matched.push(work[0]) : 0 , 0);
			return ;
		}
		this.#metchCloseWorkOnLayer(this.#list[len], layer, layer[0]);
		return (this.#matchCanvasInLayer(matched, layer, len - 1));
	};

	#setLayer(crate, works) {
		switch(this) {
			case 1:
				crate.unshift({ layer1 : works });
				break ;
			case 2:
				crate.push({ layer2 : works });
				break ;
			case 3:
				crate.push({ layer3 : works });
				break ;
			case 4:
				crate.push({ layer4 : works });
				break ;
			case 5:
				crate.push({ layer5 : works });
				break ;
			default:
				return ;
		}	};

	#hugeCanvasFirst(crate, layer) {
		let countLayer =	0;
		const GETCANVAS =	[];
		const HUGE =		this.#list.at(-1);

		if (HUGE[1] === layer[0] && HUGE[3] === layer[2]) {
			countLayer++;
			this.#setLayer.call(countLayer, crate, [HUGE]);
			this.#list.pop();
		}
		else {
			this.#list.reverse().map(art => {
				art[1] === layer[0] ? GETCANVAS.push(art) : false;
			});
			GETCANVAS.map(canvas => {
				countLayer++;
				this.#setLayer.call(countLayer, crate, [canvas]);
				this.#list.splice(this.#list.indexOf(canvas), 1);
			});
		}		return(countLayer);
	};

	#fillCrate(measure) {
		const GC =		new WeakSet();
		let crate =		[];
		let greb =		[];
		let checkLen =	true;
		let i =			this.#hugeCanvasFirst(crate, measure);
		let len;
		let innerCrate;

		while (i++ < this.#maxLayers || checkLen && this.#list.length) {
			innerCrate = { size : measure, x1 : 0, y1 : 0, x2 : 0, y2 : 0 };
			len = this.#list.length - 1;
			this.#matchCanvasInLayer(greb, [innerCrate], len);
			if (greb.length > 0) {
				greb.map(art => this.#list.splice(this.#list.indexOf(art), 1));
				this.#setLayer.call(i, crate, greb);
				GC.add(innerCrate);
				greb =		null;
				greb =		[];
			}			checkLen =	this.#list.length === 1 && i === this.#maxLayers;
		}		return(crate);
	};

	#checkOneCrate(list) {
		const BIGGEST =	list.at(-1);
		const CHECKER =	list.filter(art => {
			if(BIGGEST[4] >= art[4])
				return (art);
		});
		return (this.#list.length === CHECKER.length ? true : false);
	};

	// HACK: improvement necessary to define the best crate size 'backtrack'.
	#defineSizeBaseCrate(list) {
		const CRATE1 =	this.#checkOneCrate(list);
		const MAXX =	250;
		const MAXY =	132;
		let len =		list.length;
		let x =			0;
		let z =			0;
		let y =			0;

		if (CRATE1)
			return([list.at(-1)[1], list.at(-1)[2], list.at(-1)[3]]);
		while(len--) {
			(x + x + list[len][1]) <= MAXX ? x += list[len][1] :
				x < list[len][1] && list[len][1] <= MAXX ? x = list[len][1]:
					list[len][1] > MAXX ? x = list[len][1] : false;

			z = list[len][2] ?? z;

			(y + y + list[len][3]) <= MAXY ? y += list[len][3]:
				y < list[len][3] && list[len][3] <= MAXY ? y = list[len][3]:
					list[len][3] > MAXY ? y = list[len][3] : false;
		}		return([x, z, y]);
	};

	#addXandYtimes(canvas) {
		let procList = canvas.map(art => {
			art.push(art[1] * art[3]);
			return(art);
		});

		procList = this.#quickSort(procList, 5);
		procList = procList.map(art => { art.pop(); return(art) });
		return(this.#list = procList);
	};

	#provideCrate(crate) {
		if (!this.#list.length)
			return ;
		this.#addXandYtimes(this.#list);
		const size =		this.#defineSizeBaseCrate(this.#list);
		const crateFilled =	this.#fillCrate(size);
		const crateDone =	this.#defineFinalSize(size, crateFilled);

		crate.push(crateDone);
		crate.push({ works: crateFilled });
		return(this.#provideCrate(crate));
	};
}

// TODO: alocate the 5th layer after all arrange done.
class CraterLastCheckReArranger {
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
		let extracted =		LEN === 1 ? [...attCrate.works[0]]: [...attCrate.works];
		let result;

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
				GC.add(result);
			}		}		return(!bool);
	};

	#consolidationTrail(standard, sameSizes, pos){
		if (pos < 0)
			return(sameSizes);
		if (pos % 2 === 1)
			if(this.#processingCratesList(standard, sameSizes[pos])){
				sameSizes.splice(pos - 1, 2);
				pos = sameSizes.length;
			}		return(this.#consolidationTrail(standard, sameSizes, pos - 1));
	};

	#extractTheFifthLayer(data) {
		let works;
		let info;
		let i = 0;

		for (info in data) {
			if (i % 2 === 1)
				data[info].works.length === 5 ? 
					works = data[info].works[4].layer5 : 0;
			if(works)
				break;
			i++;
		}		return(works ? { info, works } : false);
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

	#allocateTheFifthLayer() {
		const { crates } =	this.#cratesDone.standardCrate;
		const list =		this.#extractTheFifthLayer(crates);
		let count =			0;
		let newList;
		let newCrate;
		let check;
		let i;

		if (!list)
			return;
		for (i in crates) {
			if (!Array.isArray(crates[i]) && crates[i].works.length <= 4) {
				newList = this.#newCrateSet(list.works, crates[i]);
				newCrate = new CraterStandard(newList, false);
				check = newCrate.crates.length === 2 && 
					newCrate.crates[1].works.length <= 4;
				if (check) {
					this.#updatesCrates(crates, count, newCrate, list.info);
					break ;
				}			}			count++;
		}	};

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
		}		this.#allocateTheFifthLayer();
	};
}

class CraterNotCanvas {
	#peces;

	constructor (list) {
		if(!list || list.length === 0)
			return({ noCanvas: false});
		this.#peces = list;
		return (this.#noCanvasTrail());
	};

	#quickSort(arts, pos) {
		if (arts.length <= 1)
			return(arts);

		const left =	[];
		const pivot =	arts.splice(0, 1);
		const right =	[];

		arts.map(work => {
			work[pos] <= pivot[0][pos] ? left.push(work) : right.push(work);
		});
		return(this.#quickSort(left, pos).concat(pivot, this.#quickSort(right, pos)));
	};

	#setPadding(innerCrate) {
		const PAD =		23;
		const HIGHPAD =	28;
		const X =		innerCrate[0] + PAD;
		const Z =		innerCrate[1] + PAD;
		const Y =		innerCrate[2] + HIGHPAD;

		return ([X, Z, Y]);
	};

	#splitCrate(works) {
		let x =		0;
		let z =		0;
		let newX =	0;
		let newZ =	0;
		let aux;

		aux = works.length / 2;
		works.map(item => {
			if (aux-- > 0) {
				x += item[1];
				z < item[2] ? z = item[2] : false;
			}
			newX = item[1];
			newZ < item[2] ? newZ = item[2] : false;
		});
		newX > x ? true : newX = x;
		newZ += z;
		return ({ newX, newZ });
	}

	#defCrate(peces) {
		const LENLIMIT =	277;
		const SPLIT =		peces.length > 4 && peces.length % 2 === 0;
		let x =				0;
		let z =				0;
		let y =				0;
		let splited;

		peces.map(item => {
			x +=	item[1];
			z =		item[2] > z ? item[2] : z;
			y =		item[3] > y ? item[3] : y;
		});
		if (x > LENLIMIT || SPLIT) {
			splited = this.#splitCrate(peces);
			x = splited.newX;
			z = splited.newZ;
		}		return (this.#setPadding([x, z, y]));
	};

	#validationComp(val1, val2) {
		const MAXLEN =		277;
		const MAXDEPTH =	177;
		const MAXHEIGHT =	132;
		const compareX =	val1[1] === val2[1] && val1[1] < MAXLEN;
		const compareZ =	val1[2] === val2[2] && val1[2] < MAXDEPTH;
		const compareY =	val1[3] <= MAXHEIGHT;

		return (compareX && compareZ && compareY ? true : false);
	};

	#validationSizes(x, z, equals, items) {
		const PAD =			10;
		const MAXLEN =		554;
		const MAXDEPTH =	177;

		if(items.length % 2 === 0)
			if(x > MAXLEN && (z * 2) + PAD < MAXDEPTH)
				return (items.length);
		return (equals === 0 || items[0][1] > MAXLEN ? 1 : equals);
	};

	//returns how many works to put in side the crate.
	#defineMaxPeces(items) {
		const PAD =		10;
		let x =			PAD * items.length;
		let z =			0;
		let equals =	0;
		const workRef =	items[0];

		items.map(art => {
			const compare =	this.#validationComp(art, workRef);
			const bool1 =	art[2] - workRef[2];
			const bool2 =	workRef[2] - art[2];
			const check =	bool1 > 0 && bool1 <= PAD || bool2 > 0 && bool2 <= PAD;
			
			if (compare === true || check) {
				equals++;
				x += art[1];
				z += art[3];
			}		});
		return (this.#validationSizes(x, z, equals, items));
	};

	#addXandZtimes(canvas) {
		if (!Array.isArray(canvas))
			return (canvas);
		let procList = canvas.map(art => {
			art.push(art[1] * art[2]);
			return(art);
		});

		procList = this.#quickSort(procList, 5);
		procList = procList.map(art => { art.pop(); return(art) });
		return(this.#peces = procList);
	};

	#noCanvasTrail(){
		const crate =	[];
		let peces;

		this.#addXandZtimes(this.#peces);
		while(this.#peces.length > 0) {
			peces =		this.#defineMaxPeces(this.#peces);
			peces =		this.#peces.splice(0, peces);
			if (peces.length > 0) {
				crate.push(this.#defCrate(peces));
				crate.push({ works: peces });
			}
			else {
				crate.push(this.#defCrate(this.#peces.splice(0, 1)));
				crate.push({ works: peces });
			}		}		return ({ crates: crate });
	};
}

class CraterSameSize {
	#peces;

	constructor(list) {
		if(!list || list.length === 0)
			return({ sameSize: false});

		this.#peces = list;
		return (this.#startCrateTrail());
	};

	#setPad(innerCrate) {
		const PAD =		23;
		const HIGHPAD =	28;
		const X =		innerCrate[0] + PAD;
		const Z =		innerCrate[1] + PAD;
		const Y =		innerCrate[2] + HIGHPAD;

		return([X, Z, Y]);
	};

	#checkComp(getter, test, baseLayer) {
		const checker =	getter.map(value => {
			const checkX = (value[0] + test[0]) <= baseLayer[0];
			const checkZ = (value[1] + test[1]) <= baseLayer[1];
			const checkY = (value[2] + test[2]) <= baseLayer[2];
			
			if (checkX && checkZ && checkY)
				return (value);
			return
		});

		if(checker[0] !== undefined)
			checker.map(size => getter.splice(getter.indexOf(size), 1));
		return(checker[0] !== undefined);
	};

	#composeLayer(baseSize, list) {
		const PACKAGECM =	10;
		let getter =		[];
		const compLayer =	list.map(size => {
			const X =		size[0] === baseSize[0][0];
			const Y =		size[2] === baseSize[0][2];
			const secondX = size[0] === (baseSize[0][0] - PACKAGECM);
			const secondY = size[2] === (baseSize[0][2] - PACKAGECM);

			if (X && Y || secondX && secondY)
				return(size);
			if (getter.length > 0) {
				if (this.#checkComp(getter, size, baseSize))
					return(size);
			}
			else
				getter.push(size);
		});
		return (compLayer[0] !== undefined);
	};

	#orderSizes(base, art) {
		const STACK =		base.shift();
		const PACKAGECM =	5;
		const LEN =			art.length === 1 ? art[0].length : art.length;
		let DEPTH;
		let x;
		let z;
		let y;

		if (STACK) {
			DEPTH =	(LEN % 2) + (LEN / 2);
			x =		base[0];
			z =		DEPTH * PACKAGECM;
			y =		base[2];
		}
		else {
			DEPTH =	(LEN % 2) + LEN;
			x =		base[0];
			z =		DEPTH * PACKAGECM;
			y =		base[2];
		}		return (this.#setPad([x, z, y]));
	};

	#sizeStacking(base, newBase) {
		const extraSizes =	newBase.length > 3 ?
			[
				newBase[0][1],
				newBase[0][2],
				newBase[0][3],
			]:
			newBase;
		const LIMIT =	132;
		let x =			base[0][0];
		let z =			base[0][1];
		let y =			base[0][2] + extraSizes[2];
		let stack =		false;

		if (y > LIMIT && x < LIMIT) {
			[y, x] =	[x, y];
			stack =		true;
		}
		else if (y > base[0][2])
			stack =		true;
		return ([stack, [x, z, y]]);
	};

	#solveList(list) {
		const LIMITWORKS =	10;
		let comp;
		let baseCrate =	list.splice(0, 1).flat();
		let works =		list.splice(0, 1).flat();

		list.length > 0 ? comp = this.#composeLayer(baseCrate, list): false;
		if(comp) {
			baseCrate =	this.#sizeStacking(baseCrate, list.splice(0, 1));
			list[0].map(val => works[0][0].push(val));
			list.splice(0, list[0].length);
		}
		else {
			if(works[0].length > LIMITWORKS && (works[0].length % 2) === 0)
				baseCrate =	this.#sizeStacking(baseCrate, works[0]);
			else
				baseCrate.unshift(false);
		}		Array.isArray(works[0][0]) ? works = works.flat() : false;
		return ({ crate: this.#orderSizes(baseCrate, works), works: works });
	};

	#compCrate(list) {
		const crate = [];
		let solver;

		while (list.length) {
			solver = this.#solveList(list);
			crate.push(solver.crate);
			crate.push({ works: solver.works });
		}		return (crate);
	};

	#countWorks () {
		const MAXDEPTH =	10;
		let x =				this.#peces[0][1];
		let z =				this.#peces[0][2];
		let y =				this.#peces[0][3];
		let sizes =			[[x, z, y]];
		let works =			[];

		this.#peces.map(work => {
			if (work[2] <= MAXDEPTH) {
				if(work[1] !== x && work[3] !== y) {
					sizes.push([works]);
					x =	work[1];
					z =	work[2];
					y =	work[3];
					sizes.push([x, z, y]);
					works =	[];
				}				works.push(work);
			}		});
		sizes.push(works);
		return (sizes[1][0].length >= 4 ? sizes : null);
	};

	#startCrateTrail () {
		let countDiffSizes =	this.#countWorks();
		if (countDiffSizes === null)
			return(null);
		const crateDone =		this.#compCrate(countDiffSizes);
		const BACKUP =			JSON.parse(JSON.stringify(crateDone));

		countDiffSizes =		null;
		return ({ crates : crateDone, backUp : BACKUP });
	};
}

class CraterTube {
	#tubes;

	constructor(list) {
		if(!list || list.length === 0) 
			return({ tube : false });

		this.#tubes = list;
		return(this.#crateMaker());
	};

	#crateMaker() {
		this.#possibleCrates();
		return (this.#tubes);
	};

	#sizeComposer(){
		let x = this[0][1];
		let z = this[0][2];
		let y = 0;
		
		this.map(tube => {
			x = tube[1] > x ? tube[1]: x;
			z = tube[2] > z ? tube[2]: z;
			y += tube[3];
		});
		return([x, z, y]);
	}

	#setPaddings(pad, highPad) {
		const X = this[0] + pad;
		const Z = this[1] + pad;
		const Y = this[2] + highPad;

		return([X, Z, Y]);
	};

	#oneTubeCrate() {
		const DEFAULTPAD =	18;
		const HEIGHTPAD =	25;
		const X =			this[0][1] + DEFAULTPAD;
		const Z =			this[0][2] + DEFAULTPAD;
		const Y =			this[0][3] + HEIGHTPAD;

		return ([X, Z, Y]);
	};

	#tubeCrate(works) {
		const DEFAULTPAD =	18;
		const HEIGHTPAD =	25;
		const baseSize =	this.#sizeComposer.call(works);

		return (this.#setPaddings.call(baseSize, DEFAULTPAD, HEIGHTPAD));
	};

	#interfaceCrates(opt, list) {
		switch(opt) {
			case 1:
				return(this.#oneTubeCrate.call(list));
			case 2:
				return(this.#tubeCrate(list));
			case 3:
				return(this.#tubeCrate(list));
			case 4:
				return(this.#tubeCrate(list));
		}	};

	#hugeTubes(tubes) {
		const result =		[];
		const MAXCONTENT =	3;
		let getter;

		while(tubes.length >= MAXCONTENT) {
			getter = tubes.splice(0, MAXCONTENT);
			result.push(this.#interfaceCrates(getter.length, getter));
			result.push({ works: getter });
		}		return (result);
	};

	#checkHugeTubes() {
		const DIAMETER =	40;
		const getter =		this.#tubes.filter(tube => {
			if (tube[2] > DIAMETER)
				return (tube);
			return ;
		});
		getter.map(roll => {
			this.#tubes.splice(this.#tubes.indexOf(roll), 1);
		});
		return (getter);
	};

	#possibleCrates() {
		let reduce =		[];
		let crates =		[];
		const MAXCONTENT =	3;
		const biggest =		this.#checkHugeTubes();

		if (biggest.length > 0 || biggest.length > MAXCONTENT)
			crates.push(this.#hugeTubes(biggest));

		while(this.#tubes.length) {
			reduce = this.#tubes.splice(0, MAXCONTENT);
			crates.push(this.#interfaceCrates(reduce.length, reduce));
			crates.push({ works: reduce });
		}		if (this.#tubes.length >= 1) {
			crates.push(this.#interfaceCrates(this.#tubes.length, this.#tubes));
			crates.push({ works: this.#tubes });
		}		return(this.#tubes = { crates: crates });
	};
}

class Crater {
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
				key !== 'sameSizeCrate' ? delete this.#crates[key] : false;

		this.#allCrates();
		this.#cubAir();
		this.#totalCub();
		this.#whichAirPort();
		if (Array.isArray(this.#crates?.sameSizeCrate?.backUp)) {
			this.#totalCubBackUp();
			this.#whichAirPortBackUp();
			this.#allCratesBackUp();
		}		return({ crates: this.#crates });
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
		const std =		new CraterStandard(this.#works?.sorted, BACKUP);
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
		}		this.#crates.allCratesBackUp = CRATES;
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
			}		};

		for (key in this.#crates)
			this.#crates[key]?.crates?.map(setCub);
		if(Array.isArray(this.#crates?.sameSizeCrate?.backUp)) {
			this.#crates?.sameSizeCrate?.backUp?.map(setCub);
			this.#crates?.standardCrate?.backUp?.map(setCub);
		}	};

	#totalCub() {
		let key =	0;
		let total =	[];
		const setTotalCub =	(crate) => {
			if (Array.isArray(crate)) {
				total.push(crate[3]);
			}		};

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
			}		};

		for (key in this.#crates) {
			check1 = this.#crates[key] === 'sameSizeCrate';
			check2 = this.#crates[key] === 'standardCrate';

			if (check1 || check2) 
				this.#crates[key]?.backUp?.map(setTotalCub);
			else if (!(check1 || check2))
				this.#crates[key]?.crates?.map(setTotalCub);
		}		total = total.reduce((sum, val) => +(sum + val).toFixed(3), 0);
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
		}	};

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
		this.#crates.wichAirPort = [{ PAX : pax }, { CARGO : cargo }];
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
		}		this.#crates.wichAirPortBackUp = [{ PAX : pax }, { CARGO : cargo }];
	};
}

class UnitAdapter {
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
				const error = `Please, provide a valid list.`;
				throw new TypeError(error);
			};

			const validation = this.#list.some(art => {
				return (art.constructor.name !== 'ArtWork');
			});

			if (validation) {
				const error = `Please, provide a type of 'ArtWork' object list.`;
				throw new TypeError(error);
			};

			if (this.#unit !== 'cm' && this.#unit !== 'in') {
				const error = `Please, provide a valid unit.`;
				throw new TypeError(error);
			};
		}
		catch (err) {
			return (err);
		}		return('pass');
	};

	// BUG: minified version of the file is not working properly to convert data to ArtWork class.
	async #definePath() {
		let result;
		const checker =	this.#checkInput();
		const path =	checker !== 'pass' ? 'error' :
			this.#unit === 'cm' ? 'cm' : 'in';

		switch (path) {
			case 'error' :
				return(checker);

			case 'cm' :
				result = await this.#cmPath();
				return (result);
			
			case 'in' :
				result = await this.#inPath();
				return (result);
		}	};

	#reversionUnit(data) {
		const CHECK1 = data?.hasOwnProperty('crates');
		const CHECK2 = data?.hasOwnProperty('backUp');

		if(Array.isArray(data)) {
			return(data = data.map(swapUnitReversion));
		}
		else if (!data?.hasOwnProperty('crates')) {
			return(data);
		}
		else if (CHECK1 || CHECK2) {
			data.crates = data.crates.map(info => {
				if (info.length === 4)
					return (info = swapUnitReversion(info));
				Array.isArray(info.works[0]) ?
					info.works = info.works.map(swapUnitReversion) :
					info.works = info.works.map(layerInterface);
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
				crates[key] = this.#reversionUnit(crates[key]);
		}		if (crates.sameSizeCrate?.hasOwnProperty('backUp')) {
			crates.airCubTotalBackUp = +(crates.airCubTotalBackUp * CUBCONST)
				.toFixed(3);
			crates.allCratesBackUp = this.#reversionUnit(crates.allCratesBackUp);
		}		crates.allCrates = this.#reversionUnit(crates.allCrates);
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
}

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
		case 5  :
			x =		sizes[1];
			z =		sizes[2];
			y =		sizes[3];
			tmp =	Array.from(new Converter(x, z, y).inConvert);
			tmp.unshift(sizes[0]);
			tmp.push(+(sizes[3] * CUBCONST).toFixed(3));
			return(sizes = tmp);
	}}

function layerInterface(layer) {
	let key = 0;

	for (key in layer) {
		if (layer[key].length === 1) {
			layer[key] = swapUnitReversion(layer[key][0]);
		}
		else
			layer[key] = layer[key].map(swapUnitReversion);
	}	return(layer);
}

// TODO: develop a closure class to preserve the access and refresh token
// on the client side towards future http requests using Map().

async function getIDB (ref) {
	const WORKER = new Worker(
		new URL('./panels/worker.IDB.crates.mjs', import.meta.url), { type: "module" }
	);
	let request;

	WORKER.postMessage(ref);
	request = await new Promise((resolve, reject) => {
		WORKER.onmessage = (res) => {
			const { data } = res;
			data.reference === ref ? resolve(data) : reject(res);
		};
	});

	return(request);
}

function setOfflineRef(doc) {
	const STORAGE =	localStorage;
	const offList =	STORAGE.getItem('offResults');
	const list =	offList !== undefined ? JSON.parse(offList) : false;

	if (list) {
		list.push(doc);
		STORAGE.removeItem('offResults');
		STORAGE.setItem('offResults', JSON.stringify(list));
	}
	else
		STORAGE.setItem('offResults', JSON.stringify([doc]));
}


// TODO: test.
async function getNewTokens(content) {
	const url =		'/shift/tokens';
	const HEADER =	{ 'Content-Type': 'application/json; charset=UTF-8' };

	try {
		const result = await fetch (url, {
			method: "POST",
			headers: HEADER,
		}).then(code => code.status)
		.catch(err => console.error(`ALERT ${err}`));
		postDataFromClientSide(content);
	}
	catch(err) {
		alert(`ATTENTION: ${err}`);
	}}

function checkStatusCode(code, info, data, header) {
	switch(code) {
		case 409 :
			upDateEstimateClient(data, header, info);
			break ;
		case 403 :
			getNewTokens(info);
			break ;
	}}

async function upDateEstimateClient(data, header, content) {
	if (confirm("This estimate already exist. Would you like to update it?")){
		const url = '/update/estimate';

		try {
			const result = await fetch (url, {
				method: "PUT",
				body: data,
				headers: header,
			}).then(code => code.status)
			.catch(err => console.error(`ALERT ${err}`));
			result === 403 ? checkStatusCode(result, content) : false;
		}
		catch(err) {
			alert(`ATTENTION: ${err}`);
		}	}
	else
		alert(`Not updated!`);
}

async function postDataFromClientSide(content) {
	const DATA =	JSON.stringify(content);
	const url =		`/new/estimate/`;
	const HEADER =	{
		'Content-Type': 'application/json; charset=UTF-8',
	};
	if (globalThis.navigator.onLine) {
		try {
			const result = await fetch (url, {
				method: "POST",
				body: DATA,
				headers: HEADER,
			}).then(code => code.status)
			.catch(err => console.error(`ALERT ${err}`));
			checkStatusCode(result, content, DATA, HEADER);
		}
		catch(err) {
			alert(`ATTENTION: ${err}`);
		}
	}
	else
		setOfflineRef(content.reference);
		// TODO: set offline estimates to LocalStorage for upploading online.
}

async function saveTheCurrentEstimate (estimate) {
	const contentStorage =	await getIDB(estimate);
	const { reference, list, crates } = contentStorage;
	const result = Object.assign({}, crates);
	const INFO = {
		reference,
		list,
		crates : result,
	};
	return (postDataFromClientSide(INFO));
}

// export function deleteEstimateClient (estimaateCode) {
// };

// ╭────────────────────────────────────────────────────╮
// │ ╭────────────────────────────────────────────────╮ │
// │ │ INFO: These are functions to handle indexedDB: │ │
// │ │                  createDB();                   │ │
// │ │                 addNewWorks();                 │ │
// │ │                 deleteData();                  │ │
// │ │          movingDataToSesseionStorage();        │ │
// │ ╰────────────────────────────────────────────────╯ │
// ╰────────────────────────────────────────────────────╯



function createDB() {
	const dataName =	"Results";
	const request =		globalThis.indexedDB.open(dataName);

	request.onerror = (event) => {
		alert(`ATTENTION! ${event.target.errorCode}`);
	};
	request.onupgradeneeded = (event) => {
		const db = event.target.result;
		let object;
	
		object = db.createObjectStore(dataName, {keyPath: "reference"});
		object.createIndex( "reference", "reference", { unique: true });
		console.log('Done!');
	};
}


function addNewWorksToIndexedDB (works) {
	const dataName =	"Results";
	const list =		document.getElementById("input_estimate").value;
	const request =		globalThis.indexedDB.open(dataName);

	request.onerror = (event) => {
		alert(`ERROR: ${event.target.errorCode}`);
	};
	request.onsuccess = async (event) => {
		const db =			event.target.result;
		const object =		db.transaction("Results", "readwrite")
			.objectStore("Results");
		const existsInIDB =	object.get(works.reference);
		
		existsInIDB.onsuccess = () => {
			existsInIDB.result === undefined ? object.add(works):
			(object.delete(existsInIDB.result.reference)) &&
			(object.add(works));
			movingDataToSesseionStorage(list);
		};
	};
}


// TODO: refectory this function to use the worker script
async function movingDataToSesseionStorage(reference) {
	const request = globalThis.indexedDB.open("Results");

	request.onerror = (event) => {
		alert(`WARNING: ${event.target.errorCode}`);
	};
	request.onsuccess = () => {
		const db = request
			.result
			.transaction("Results")
			.objectStore("Results").get(reference);
		
		db.onsuccess = async () => {
			const reference = document.getElementById("input_estimate").value;
			const obj = db.result;

			globalThis.sessionStorage.setItem(reference, JSON.stringify(obj));
			await saveTheCurrentEstimate(reference);
		};
	};
}

// ╭──────────────────────────────────────────────────────────────────────────╮
// │ ╭──────────────────────────────────────────────────────────────────────╮ │
// │ │ INFO:            These are the second layer of the app:              │ │
// │ │                        function displayAirCub();                     │ │
// │ │                            function crate();                         │ │
// │ │                         function cleanInputs();                      │ │
// │ │                         function parseArtWork();                     │ │
// │ ╰──────────────────────────────────────────────────────────────────────╯ │
// ╰──────────────────────────────────────────────────────────────────────────╯



// ╭─────────────────────────────────────────────╮
// │ This function adds the new work and counts. │
// ╰─────────────────────────────────────────────╯
function countWorks() {
	const result =		parseArtWork();
	let counter =		document.getElementById("count");

	counter.innerText =	result ? "Counting: " + result?.length : "Counting 0";
	return (counter);
}


// ╭─────────────────────────────────────────────────────────────────────╮
// │ This function do the calculation of the cub of all works in meters. │
// ╰─────────────────────────────────────────────────────────────────────╯
function displayCub() {
	let result;
	const COMA =	1000;
	const element =	document.getElementById("cub-meter");

	result =		parseArtWork();
	result =		result?.reduce((sum, val) => {
		return (sum + val.cubed);
	}, 0) ?? 0;
	element.innerText = "Cub: " + ((result * COMA) / COMA).toFixed(3) + "m³";
	return (element);
}


// ╭──────────────────────────────────────────────────────────────────────────╮
// │ Returns a calculation of the cub of all works based on the air companies.│
// ╰──────────────────────────────────────────────────────────────────────────╯
function displayAirCub() {
	let result;
	let element;
	let std_msg;
	const COMA =	1000;

	std_msg =		"Air-Cub: ";
	element =		document.getElementById("cub-air");
	result =		parseArtWork();
	result =		result?.reduce((sum, val) => {
		return (sum + val.cAir);
	}, 0) ?? 0;
	element.innerText = std_msg + ((result * COMA) / COMA).toFixed(3);
	return (element);
}


// ╭──────────────────────────────────────────────────────────────────────────╮
// │ This function is the main function of the webapp. It solves the art work │
// │                         list to possible crates.                         │
// ╰──────────────────────────────────────────────────────────────────────────╯
async function crate$1() {
	let crates;
	let list;
	const estimate =	{};
	const e_code =		document.getElementById("input_estimate").value;

	if (confirm("Ready to crate all works?")) {
		crates =					await checkMetric();
		if (crates !== undefined) {
			estimate["reference"] =	e_code;
			list =					parseArtWork();
			estimate["list"] =		list.map(art => art.data);
			estimate["crates"] =	crates;
			addNewWorksToIndexedDB(estimate);

			// INFO: Efemeral triggers to each panel render the result
			sessionStorage.setItem("pane1", "populate");
			sessionStorage.setItem("pane2", "populate");
		}	}
}

//╭───────────────────────────────────────────────────────────────────────────╮
//│ This function cleans all fields and puts the cursor in the code input box.│
//╰───────────────────────────────────────────────────────────────────────────╯
function cleanInputs() {
	document.getElementById("input_code").value = "";
	document.getElementById("input_code").select();
	document.getElementById("input_length").value = "";
	document.getElementById("input_depth").value = "";
	document.getElementById("input_height").value = "";
}


// ╭──────────────────────────────────────────────────────╮
// │ Converts the localStorage data in to ArtWork object. │
// ╰──────────────────────────────────────────────────────╯
function parseArtWork() {
	const DB =		localStorage;
	const temp =	[];
	let works;
	const avoid =	[
		"doneList",
		"mode",
		"storage",
		"currency",
		"currency",
		"metrica",
		"refNumb",
		"FETCHED",
	];
	
	Object.entries(DB).map(data => {
		!avoid.includes(data[0]) ? temp.push(JSON.parse(data[1])) : false;
	});
	if (temp.length > 0)
		works = temp.map(work => {
			return(new ArtWork(work.code, work.x, work.z, work.y));
		});
	return(works ? works : undefined);
}


// ╭──────────────────────────────────────────────────────────────────────────────╮
// │ Checks the works is in inches and converts to centimeters and solve the list.│
// ╰──────────────────────────────────────────────────────────────────────────────╯
async function checkMetric() {
	const storageUnit =	localStorage.getItem('metrica');
	const UNIT =		storageUnit === 'cm - centimeters' ? 'cm' : 'in';
	const list =		parseArtWork();
	let crates;

	if (!list)
		return(alert("Oops! Sounds like you do not added any work yet. Please, try again!"));
	crates = await Promise.resolve(new UnitAdapter(list, UNIT));
	return (crates);
}

//╭───────────────────────────────────────────────────────────────────────────╮
//│ ╭───────────────────────────────────────────────────────────────────────╮ │
//│ │ INFO:          These are the functions to the first layer:            │ │
//│ │                           Function checWork();                        │ │
//│ │                           Function regValid();                        │ │
//│ │                          Function catchWork();                        │ │
//│ │                         Function catchRemove();                       │ │
//│ │                         Function checkReference();                    │ │
//│ │                         Function intParser();                         │ │
//│ ╰───────────────────────────────────────────────────────────────────────╯ │
//╰───────────────────────────────────────────────────────────────────────────╯



// ╭────────────────────────────────────────────────────────────────────────╮
// │ This function validates all inputs of the fields provided by the user. │
// ╰────────────────────────────────────────────────────────────────────────╯
function checkWork(work) {
	const checked =		regValid(intParser([work[1], work[2], work[3]]));
	const regex =		/[^-a-z-A-Z-0-9]/g;
	const estimate =	document.getElementById("input_estimate").value;
	let i;
	
	i = 0;
	for (i in localStorage.key(i)){
		if(work[0] === localStorage.key(i)){
			alert(`${work[0]} already added to the list. Please, try again`);
			return(false);
		}
	}
	switch (regex.test(work[0]) || regex.test(estimate)) {
		case true:
			alert(`Found special character NOT allowed on "Work code",\
			or "Estimate" input. Please, try again!`);
			return (false);
	}
	checkReference();
	return ( Array.isArray(checked) ? 
		new ArtWork(work[0], checked[0], checked[1], checked[2]) : false
	);
}


// ╭──────────────────────────────────────────────────────╮
// │ This function converts all string inputs in integer. │
// ╰──────────────────────────────────────────────────────╯
function intParser(dimensions) {
	const result = dimensions.map(size => {
		return parseInt(size);
	});
	return (result);
}

// ╭────────────────────────────────────────────────────────────────────╮
// │ Regular expression function to validate if all inputs are numbers. │
// ╰────────────────────────────────────────────────────────────────────╯
function regValid(sizes_parsed) {
	let i =			2;
	const regex =	/^[0-9\.0-9]{1,7}$/;

	while (--i >= 0) {
		if (!regex.test(sizes_parsed[i])) {
			switch (i) {
				case 2:
					alert(`The provide HEIGHT is not a valid number.\
					Please, try again!`);
					return (false);
				case 1:
					alert(`The provide DEPTH is not a valid number.\
					Please, try again!`);
					return (false);
				case 0:
					alert(`The provide LENGTH is not a valid number.\
					Please, try again!`);
					return (false);
			}
		}
	}
	return (sizes_parsed);
}


//╭───────────────────────────────────────────────────────────────────────────╮
//│   This function start the verification of the inputs in the first step.   │
//│Secondly, calls the other functions from the modules when all verifications│
//│                           were done and right.                            │
//╰───────────────────────────────────────────────────────────────────────────╯
function catchWork() {
	const estimate =	document.getElementById("input_estimate").value;
	const cod =			document.getElementById("input_code").value;
	const length =		document.getElementById("input_length").value;
	const depth =		document.getElementById("input_depth").value;
	const height =		document.getElementById("input_height").value;
	let tmp;

	if (!estimate)
		return(alert("Attention! Please, add the \"Doc:\" reference field!"));
	switch (cod && length && depth && height) {
		case "":
			alert(`Oops! Do not forget to fill each field. Please, try again!`);
			return (cleanInputs());
	}
	tmp = checkWork([cod, length, depth, height]);
	if (tmp !== false) {
		// console.log(tmp);
		orderWorks(tmp.data);
		localStorage.setItem(tmp.data.code, JSON.stringify(tmp.data));
		localStorage.setItem("storage", "art-work");
		countWorks();
		displayAirCub();
		displayCub();
	}
	return (cleanInputs());
}


// ╭─────────────────────────────────────────────────────────────────╮
// │ This is the function to find the work in the list to remove it. │
// ╰─────────────────────────────────────────────────────────────────╯
function catchRemove() {
	const work = prompt("Please enter the work code to be removed:", "code?");
	
	if(localStorage.getItem(work)){
		orderRemove(work);
		localStorage.removeItem(work);
		countWorks();
		displayAirCub();
		displayCub();
	}
	else if(work === null)
		return(cleanInputs());
	else
		alert(`"${work}" was not found in the list. Please, try again!`);
	localStorage.setItem("storage", "art-work");
	return(cleanInputs());
}


// ╭─────────────────────────────────────────────────────────────────╮
// │ This functions checks if the reference has changed by the user. │
// ╰─────────────────────────────────────────────────────────────────╯
function checkReference() {
	const ref =		localStorage.getItem("refNumb");
	const actual =	document.getElementById("input_estimate").value;
	
	if (ref){
		if (ref !== actual) {
			if (confirm("ATTENTION! The refNumb has changed")){
				localStorage.removeItem("refNumb");
				localStorage.setItem("refNumb", actual);
				document.getElementById("input_estimate").value = actual;
			}
			else
				document.getElementById("input_estimate").value = ref;
		}
	}
	localStorage.setItem("refNumb", actual);
}


function orderWorks({ code }){
	const storage =	sessionStorage;
	const array =	JSON.parse(storage.getItem("codes"));
	let num;

	if (!array)
		return(storage.setItem("codes", JSON.stringify([[0, code]])));
	num = Number.parseInt(array[array.length - 1]);
	num = num + 1;
	array.push([num, code]);
	return(storage.setItem("codes", JSON.stringify(array)));
}

function orderRemove (code) {
	const session =	sessionStorage;
	const codes =	JSON.parse(session.getItem("codes"));
	let i =			0;

	while (codes[i][1] !== code && i <= codes.length)
		i++;
	codes.splice(i, 1);
	session.setItem("codes", JSON.stringify(codes));
}

//       ╭──────────────────────────────────────────────────────────────╮
//       │ ╭──────────────────────────────────────────────────────────╮ │
//       │ │    INFO: Here you are goint to find these functions:     │ │
//       │ │                      currencyName()                      │ │
//       │ │                     populateCoins()                      │ │
//       │ │                   conversionCurrency()                   │ │
//       │ │                    getCurrencyValue()                    │ │
//       │ │                       setValues()                        │ │
//       │ ╰──────────────────────────────────────────────────────────╯ │
//       ╰──────────────────────────────────────────────────────────────╯


function currencyName(list) {
	const fragment = document.createDocumentFragment();

	list.map(name => {
		const option = document.createElement("option");

		option.textContent = name;
		fragment.appendChild(option);
	});
	return(fragment);
}

async function populateCoins() {
	const coins =		JSON.parse(sessionStorage.getItem("currency"));
	const select1 =		document.getElementById("coin1");
	const select2 =		document.getElementById("coin2");
	const coinNames =	Object.keys(coins);

	if (!coins)
		return("Error");
	select1.appendChild(currencyName(coinNames));
	select2.appendChild(currencyName(coinNames));
	return ;
}

function conversionCurrency(opt1, opt2, val1, val2) {
	const list =		JSON.parse(sessionStorage.getItem("currency"));
	const COMA =		1000;
	const shiftInput1 =	(Number.parseFloat(val1.value) === list[opt1]);
	const shiftInput2 =	(Number.parseFloat(val2.value) === list[opt2]);

	if (opt1 === opt2)
		return(shiftInput1 ? val2.value: val1.value);
	else if (shiftInput1 && shiftInput2)
		return (~~((list[opt1] * list[opt2]) * COMA) / COMA);
	else if (list[opt1] < list[opt2]) {
		return (shiftInput1 === true ?
			~~(((val2.value / list[opt2]) * list[opt1]) * COMA) / COMA:
			~~(((val1.value * list[opt2]) / list[opt1]) * COMA) / COMA
		);
	}
	return (shiftInput2 === true ?
		~~(((val1.value * list[opt2]) / list[opt1]) * COMA) / COMA:
		~~(((val2.value / list[opt2]) * list[opt1]) * COMA) / COMA
	);
}

async function getCurrencyValue() {
	const url =			'/currency';
	const getCurrecy =	await fetch(url, {
		method: "GET",
		headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
	}).then(body => body.json()).catch(err => alert(`CurrencyError: ${err}!`));
	const { rates } =	getCurrecy.response;
	const storage =		globalThis.sessionStorage;

	return(rates && storage.setItem("currency", JSON.stringify(rates)));
}

function setValues (coin, place) {
	const currency = JSON.parse(sessionStorage.getItem("currency"));

	if (!currency)
		return(false);
	place.value = currency[coin];
}

//    ╭─────────────────────────────────────────────────────────────────────╮
//    │ ╭─────────────────────────────────────────────────────────────────╮ │
//    │ │ INFO: Here you are going to find the currency interface caller. │ │
//    │ ╰─────────────────────────────────────────────────────────────────╯ │
//    ╰─────────────────────────────────────────────────────────────────────╯




async function coins() {
	await getCurrencyValue();
	await populateCoins();
}

async function exchangeHeader() {
	const storageCurrency =	sessionStorage.getItem("currency");
	const coin1 =			JSON.parse(sessionStorage.getItem("coin1"));
	const coin2 =			JSON.parse(sessionStorage.getItem("coin2"));
	const opt1 =			document.getElementById("coin1");
	const opt2 =			document.getElementById("coin2");

	coin1 !== null ? opt1.value = coin1: false;
	coin2 !== null ? opt2.value = coin2: false;
	storageCurrency === null ? await getCurrencyValue(): false;
}

function coinInputOne() {
	const coin =	document.getElementById("coin1").value;
	const input =	document.getElementById("coin1-input");

	sessionStorage.setItem("coin1", JSON.stringify(coin));
	setValues(coin, input);
}

function coinInputTwo() {
	const coin =	document.getElementById("coin2").value;
	const input =	document.getElementById("coin2-input");

	sessionStorage.setItem("coin2", JSON.stringify(coin));
	setValues(coin, input);
}

function getInputOne() {
	const opt1 =	document.getElementById("coin1").value;
	const opt2 =	document.getElementById("coin2").value;
	const value1 =	document.getElementById("coin1-input");
	const value2 =	document.getElementById("coin2-input");

	setValues(opt2, value2);
	value2.value =	`$ ${conversionCurrency(opt1, opt2, value1, value2)}`;
}

function getInputTwo() {
	const opt1 =	document.getElementById("coin1").value;
	const opt2 =	document.getElementById("coin2").value;
	const value1 =	document.getElementById("coin1-input");
	const value2 =	document.getElementById("coin2-input");

	setValues(opt1, value1);
	value1.value =	`$ ${conversionCurrency(opt1, opt2, value1, value2)}`;
}

//       ╭──────────────────────────────────────────────────────────────╮
//       │ ╭──────────────────────────────────────────────────────────╮ │
//       │ │     INFO: Here you are going to find these functions:    │ │
//       │ │                    centimetersShift()                    │ │
//       │ │                      inchesShift()                       │ │
//       │ │                  measureSetupCheckout()                  │ │
//       │ │                      metersShift()                       │ │
//       │ │                   resolveConversion()                    │ │
//       │ │                     unitConvertion()                     │ │
//       │ ╰──────────────────────────────────────────────────────────╯ │
//       ╰──────────────────────────────────────────────────────────────╯


function unitConversion (input1, input2, value1, value2) {
	const result = (input1 === "centimeters" ?
		centimetersShift(input1, input2, value1, value2) :
		input1 === "inches" ?
			inchesShift(input1, input2, value1, value2) :
			metersShift(input1, input2, value1, value2)
	);
	return (result);
}

function measureSetupCheckout(option1, option2){
	const checked = {
		checked1 :option1 === "centimeters" && option2 === "inches",
		checked2 :option1 === "inches" && option2 === "centimeters",
		checked3 :option1 === "meters" && option2 === "centimeters",
	};
	return (checked);
}

function resolveConversion(input1, input2, unit, type) {
	const roundDecimal = 1000;

	if (type !== "m")
		return (input1.value > input2.value ?
			~~((input1.value / unit) * roundDecimal) / roundDecimal:
			~~((input2.value * unit) * roundDecimal) / roundDecimal
		);
	return (input1.value < input2.value ?
		~~((input2.value / unit) * roundDecimal) / roundDecimal:
		~~((input1.value * unit) * roundDecimal) / roundDecimal
	);
}

function centimetersShift (unit1, unit2, measure1, measure2) {
	const inches =		2.54;
	const meters =		0.01;
	const cmpSetup =	measureSetupCheckout(unit1, unit2);

	if (unit1 === unit2)
		return(measure1.value > measure2.value ? measure1.value: measure2.value);
	else if (cmpSetup.checked1)
		return(resolveConversion(measure1, measure2, inches, "in"));
	return(resolveConversion(measure1, measure2, meters, "m"));
}

function inchesShift (unit1, unit2, measure1, measure2) {
	const centimeters = 0.393;
	const meters =		0.0254;
	const cmpSetup =	measureSetupCheckout(unit1, unit2);

	if (unit1 === unit2)
		return(measure1.value > measure2.value ? measure1.value: measure2.value);
	else if (cmpSetup.checked2)
		return(resolveConversion(measure1, measure2, centimeters, "cm"));
	return(resolveConversion(measure1, measure2, meters, "m"));
}

function metersShift (unit1, unit2, measure1, measure2) {
	const centimeters = 0.01;
	const inches =		0.0254;
	const cmpSetup =	measureSetupCheckout(unit1, unit2);

	if (unit1 === unit2)
		return (
			measure1.value > measure2.value ? measure1.value: measure2.value
		);
	else if (cmpSetup.checked3)
		return(resolveConversion(measure1, measure2, centimeters, "cm"));
	return(resolveConversion(measure1, measure2, inches, "in"));
}

//     ╭──────────────────────────────────────────────────────────────────╮
//     │ ╭──────────────────────────────────────────────────────────────╮ │
//     │ │ INFO: Here you are going to find the units interface caller. │ │
//     │ ╰──────────────────────────────────────────────────────────────╯ │
//     ╰──────────────────────────────────────────────────────────────────╯



function getUnitOne() {
	const selected1 =	globalThis.document.getElementById("units1").value;
	const selected2 =	globalThis.document.getElementById("units2").value;
	const input1 =		globalThis.document.getElementById("input-unit1");
	const input2 =		globalThis.document.getElementById("input-unit2");

	input2.value = 0;
	input2.value = unitConversion(selected1, selected2, input1, input2);
}

function getUnitTwo() {
	const selected1 =	globalThis.document.getElementById("units1").value;
	const selected2 =	globalThis.document.getElementById("units2").value;
	const input1 =		globalThis.document.getElementById("input-unit1");
	const input2 =		globalThis.document.getElementById("input-unit2");

	input1.value = 0;
	input1.value = unitConversion(selected1, selected2, input1, input2);
}

function setUnitOne () {
	const input1 =	globalThis.document.getElementById("input-unit1");
	const input2 =	globalThis.document.getElementById("input-unit2");

	input1.value = 0;
	input2.value = 0;
}

function setUnitTwo () {
	const input1 =	globalThis.document.getElementById("input-unit1");
	const input2 =	globalThis.document.getElementById("input-unit2");

	input1.value = 0;
	input2.value = 0;
}

function proportion (val, pixArea, layer) {
	const layerArea = +((val / layer) * pixArea).toFixed(3);
	return (layerArea);
}

function getScreenProportion(screenSize, layerSize) {
	const DESKTOP =	1024;
	return( screenSize >= DESKTOP ?
			deskTopView(layerSize) : mobileView(layerSize)
	);
}

function deskTopView(sizes) {
	const MAXSIZE =	800;
	let layerLength;
	let layerHeight;

	if (sizes[0] > sizes[1]) {
		layerLength = MAXSIZE;
		layerHeight = +((sizes[1] / sizes[0]) * MAXSIZE).toFixed(0);
	}
	else {
		layerHeight = MAXSIZE;
		layerLength = +((sizes[0] / sizes[1]) * MAXSIZE).toFixed(0);
	}	return ({ x: layerLength, y: layerHeight });
}

function mobileView(sizes) {
	const displaySetup =	0.870;
	const MOBILEWIDTH =		globalThis.screen.availWidth * displaySetup;
	const MOBILEHEIGHT =	globalThis.screen.availHeight * displaySetup;
	let layerLength;
	let layerHeight;

	if (sizes[0] > sizes[1]) {
		layerLength = MOBILEWIDTH;
		layerHeight = +((sizes[1] / sizes[0]) * MOBILEHEIGHT).toFixed(0);
	}
	else {
		layerHeight = MOBILEHEIGHT;
		layerLength = +((sizes[0] / sizes[1]) * MOBILEWIDTH).toFixed(0);
	}
	return ({x: layerLength, y: layerHeight});
}

class TubeRender {
	#pixSize;
	#tubes;
	#inCrate;

	constructor ({ works }, layerSize, dim) {
		this.#pixSize =	layerSize;
		this.#inCrate =	[dim[0] + 5, dim[1], dim[2] + 3];
		this.#tubes =	Array.isArray(works[0]) ? works : [works];

		return(this.#tubeRender());
	};

	#worksPositionLayer({ x, y }) {
		const RECT =	document.createElementNS("http://www.w3.org/2000/svg", "rect");
		const INSET =	1;
		const PAD =		20;
		const Y =		y.length > 1 ? nextPointY$2(y) : 0;

		RECT.setAttribute("x", 0 + INSET);
		RECT.setAttribute("y", Y + INSET);
		RECT.setAttribute("width", x.at(-1) - PAD);
		RECT.setAttribute("height", y.at(-1) - PAD);
		return(RECT);
	};

	#textOnCenter({ x, y }, work) {
		const text =		document.createElementNS("http://www.w3.org/2000/svg", "text");
		const MID =			0.5;
		const X =			x.at(-1);
		const Y =			y.at(-1) * MID;
		const LETTERPIX =	10;
		const CENTERX =		X * MID - ((work.length * LETTERPIX) * MID);
		const POS =			y.length === 1 ? Y : nextPointY$2(y) + Y;

		text.setAttribute("x", CENTERX);
		text.setAttribute("y", POS);
		text.innerHTML = work[0];
		return (text);
	};

	#tubeRender () {
		const element =	document.createDocumentFragment();
		const X =		[];
		const Y =		[];
		let txt;

		this.#tubes.map(tube => {
			X.push(proportion(tube[1], this.#pixSize.x, this.#inCrate[0]));
			Y.push(proportion(tube[3], this.#pixSize.y, this.#inCrate[2]));
			element.appendChild(this.#worksPositionLayer({ x: X, y: Y }));
			txt = [ { x: X , y: Y }, tube, this.#inCrate, ];
			element.appendChild(this.#textOnCenter.apply(null, txt));
		});
		return (element);
	};
}
function nextPointY$2(info) {
	let result;

	if (info.length === 2)
		return (info.at(-2));
	result = info.reduce((sum, val) => (sum + val), 0);
	return (result - info.at(-1));
}

class StandarRender {
	#canvas;
	#pixelSize;
	#inCrate;
	#filled;

	constructor({ works }, layerSize, dim, layer) {
		this.#pixelSize = layerSize;
		this.#filled = JSON.parse(JSON.stringify(layerSize));
		this.#inCrate = dim;
		this.#canvas = Object.values(works[layer])[0];

		this.#filled.x2 = this.#filled.x;
		this.#filled.y2 = this.#filled.y;
		return (this.#standardRender());
	};

	#worksPositionLayer({ next, pos, values }) {
		const RECT = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		const INSET = 1;
		const PAD = 20;
		const X = this.#pixelSize.x;
		const Y = this.#pixelSize.y;
		const EXTPADY = 0;
		// const EXTPADY =		next[1] ? Y - next[1] : 0; // BUG: rendering wrong in some cases.

		RECT.setAttribute("x", pos[0] + INSET);
		RECT.setAttribute("y", pos[1] + EXTPADY + INSET);

		values[0] >= X || pos[0] + values[0] + INSET >= X ?
			RECT.setAttribute("width", values[0] - PAD) :
			RECT.setAttribute("width", values[0]);
		values[1] + EXTPADY >= Y || pos[1] + values[1] >= Y ?
			RECT.setAttribute("height", values[1] - PAD) :
			RECT.setAttribute("height", values[1]);
		return (RECT);
	};

	#textOnCenter({ next, pos, values }, code) {
		const TEXT = document.createElementNS("http://www.w3.org/2000/svg", "text");
		const MID = 0.5;
		// const Y =			this.#pixelSize.y;
		const EXTPADY = 0;
		// const EXTPADY =	next[1] ? Y - next[1] : 0; // BUG: rendering wrong in some cases.
		const LETTERPIX = 7;
		let posX;
		let posY;

		posX = pos[0] + (values[0] * MID);
		posY = pos[1] + EXTPADY + (values[1] * MID);
		TEXT.setAttribute("x", posX - ((code.length * LETTERPIX) * MID));
		TEXT.setAttribute("y", posY);
		TEXT.innerHTML = code;
		return (TEXT);
	};

	#updateInnerCrate(x, y) {
		const test1 = this.#filled.y > 0 && y <= this.#filled.y;
		const test2 = this.#filled.x > 0 && x <= this.#filled.x;
		let test3;
		let test4;

		test1 ? this.#filled.y -= y : 0;
		test2 ? this.#filled.x -= x : 0;
		test3 = this.#filled.y === 0;
		test4 = this.#filled.x === 0;
		test3 ? this.#filled.x2 -= x : 0;
		test4 ? this.#filled.y2 -= y : 0;
	};

	#lastWorkUpdateNextValues(place, data, x, y) {
		Object.entries(data).map((info) => {
			const { fillX, fillY, next } = info[1];
			const propX = +(x / info[1].values[0]).toFixed(2);
			const propY = +(y / info[1].values[1]).toFixed(2);
			const updateX = place.y === next[1] && fillX + propX <= 1;
			const updateY = place.x === next[0] && fillY + propY <= 1;

			updateX ? info[1].fillX = +(fillX + propX).toFixed(2) : 0;
			updateY ? info[1].fillY = +(fillY + propY).toFixed(2) : 0;
			info[1].fillX >= 1 ? info[1].next[1] = null : 0;
			info[1].fillY >= 1 ? info[1].next[0] = null : 0;
		});
		this.#updateInnerCrate(x, y);
		return (data);
	};

	#setNewWork(code, data, prev, coord, x, y) {
		let nextX;
		let nextY;
		let fillX;
		let fillY;
		const PIXELX = this.#pixelSize.x;
		const PIXELY = this.#pixelSize.y;
		const testX = coord.x + prev.next[0] === PIXELX || this.#filled.x === coord.x;
		const testY = coord.y + prev.next[1] === PIXELY || this.#filled.y === coord.y;

		this.#lastWorkUpdateNextValues(coord, data, x, y);
		nextX = testY && coord.y === prev.next[1] ? null : coord.x + x;
		nextY = testX && coord.x === prev.next[0] ? null : coord.y + y;
		fillX = nextX === null || nextY >= PIXELY ? 1 : 0;
		fillY = nextY === null || nextX >= PIXELX ? 1 : 0;
		data[code] = {
			values: [x, y],
			pos: [coord.x, coord.y],
			next: [nextX, nextY],
			fillX,
			fillY,
		};
		return (data);
	};

	#verifyPlaceWork(data, valX, valY) {
		let x;
		let y;
		const { next, pos, values, fillX, fillY } = data;
		const lastX = pos[0] === 0 ? next[0] : pos[0];
		const lastY = pos[1] === 0 ? next[1] : pos[1];
		const testX = fillX + valX / values[0] <= 1;
		const testY = fillY + valY / values[1] <= 1;

		if (lastX + valX <= this.#pixelSize.x) {
			x = next[0] + valX <= this.#pixelSize.x ? next[0] : undefined;
			y = pos[1] + valY <= this.#pixelSize.y ? pos[1] : undefined;
		}
		else if (lastY + valY <= this.#pixelSize.y) {
			x = pos[0] + valX <= this.#pixelSize.x ? pos[0] : undefined;
			y = next[1] + valY <= this.#pixelSize.y ? next[1] : undefined;
		}		x === 0 && fillX > 0 || x === null ? x = undefined : 0;
		!x && this.#filled.y >= valY ? x = pos[0] : 0;
		!x && !testX && testY ? x = fillX * values[0] + pos[0] : 0;

		y === 0 && !testY ? y = undefined : 0;
		y === 0 && testY ? y = fillY * values[1] + pos[1] : 0;
		y === 0 && this.#filled.x === 0 ? y = next[1] : 0;
		return (x !== undefined && y !== undefined ? { x, y } : false);
	};

	#layoutMapWorks(info, weight, height, code) {
		const ART = code.at(-1);
		let len = code.length;
		let result;
		let ref;

		for (ref of code) {
			if (len-- > 1) {
				result = this.#verifyPlaceWork(info[ref], weight, height);
				if (result) {
					this.#setNewWork(ART, info, info[ref], result, weight, height);
					break;
				}			}		}		return (info);
	};

	#layoutArranger(map, weigth, height, code) {
		let x;
		let y;
		let fillX;
		let fillY;

		if (Object.entries(map).length === 0) {
			x = this.#pixelSize.x - weigth === 0 ? null : weigth;
			y = this.#pixelSize.y - height === 0 ? null : height;
			fillX = this.#filled.x + weigth === this.#pixelSize.x ? 1 : 0;
			fillY = this.#filled.y + height === this.#pixelSize.y ? 1 : 0;
			map[code] = {
				values: [weigth, height],
				pos: [0, 0],
				next: [x, y],
				fillX,
				fillY
			};
			this.#updateInnerCrate(weigth, height);
		}
		else
			this.#layoutMapWorks(map, weigth, height, code);
		return (map)
	};

	#drawAndWrite(table) {
		const element = document.createDocumentFragment();
		let work;

		for (work in table) {
			element.appendChild(this.#worksPositionLayer(table[work]));
			element.appendChild(this.#textOnCenter(table[work], work));
		}		return (element);
	};

	#standardRender() {
		let x;
		let y;
		const MAPWORK = {};
		const ICON = `<i class="nf nf-oct-sync"></i>`;
		const CODES = [];

		this.#canvas.map(async art => {
			if (art.at(-1) === ICON) {
				x = proportion(art[3], this.#pixelSize.x, this.#inCrate[0]);
				y = proportion(art[1], this.#pixelSize.y, this.#inCrate[2]);
			}
			else {
				x = proportion(art[1], this.#pixelSize.x, this.#inCrate[0]);
				y = proportion(art[3], this.#pixelSize.y, this.#inCrate[2]);
			}			CODES.push(art[0]);
			await this.#layoutArranger(MAPWORK, x, y, CODES);
		}, 0);
		return (this.#drawAndWrite(MAPWORK));
	};
}

class LargestRender {
	#pixSize;
	#canvas;
	#inCrate;

	constructor ({ works }, layerSize, dim, layer) {
		this.#pixSize =	layerSize;
		this.#inCrate =	dim;
		this.#canvas =	Array.isArray(works[0]) ? [works[layer]] : works;

		return (this.#canvasRender());
	};

	#worksPositionLayer({ x, y }) {
		const RECT =	document.createElementNS("http://www.w3.org/2000/svg", "rect");
		const INSET =	1;
		const PAD =		20;
		const Y =		y.length > 1 ? nextPointY$1(y) : 0;

		RECT.setAttribute("x", 0 + INSET);
		RECT.setAttribute("y", Y + INSET);
		RECT.setAttribute("width", x.at(-1) - PAD);
		RECT.setAttribute("height", y.at(-1) - PAD);
		return(RECT);
	};

	#textOnCenter({ x, y }, work) {
		const text =		document.createElementNS("http://www.w3.org/2000/svg", "text");
		const X =			x.at(-1);
		const Y =			y.at(-1) * 0.5;
		const MID =			0.5;
		const LETTERPIX =	10;
		const CENTERX =		X * MID - ((work.length * LETTERPIX) * MID);
		const POS =			y.length === 1 ? Y : nextPointY$1(y) + Y;

		text.setAttribute("x", CENTERX);
		text.setAttribute("y", POS);
		text.innerHTML = work[0];
		return (text);
	};

	#canvasRender () {
		const element =	document.createDocumentFragment();
		const X =		[];
		const Y =		[];
		let txt;


		this.#canvas.map(art => {
			X.push(proportion(art[1], this.#pixSize.x, this.#inCrate[0]));
			Y.push(proportion(art[3], this.#pixSize.y, art[3]));
			element.appendChild(this.#worksPositionLayer({ x: X, y: Y }));
			txt = [ { x: X , y: Y }, art, this.#inCrate, ];
			element.appendChild(this.#textOnCenter.apply(null, txt));
		});
		return (element);
	};
}

function nextPointY$1(info) {
	let result;

	if (info.length === 2)
		return (info.at(-2));
	result = info.reduce((sum, val) => (sum + val), 0);
	return (result - info.at(-1));
}

class sameSizeRender {
	#pixSize;
	#canvas;
	#inCrate;

	constructor ({ works }, layerSize, dim, layer) {
		this.#pixSize =	layerSize;
		this.#inCrate =	dim;
		this.#canvas =	Array.isArray(works[0]) ? [works[layer]] : works[0];

		return (this.#canvasRender());
	};

	#worksPositionLayer({ x, y }) {
		const RECT =	document.createElementNS("http://www.w3.org/2000/svg", "rect");
		const INSET =	1;
		const PAD =		20;
		const Y =		y.length > 1 ? nextPointY(y) : 0;

		RECT.setAttribute("x", 0 + INSET);
		RECT.setAttribute("y", Y + INSET);
		RECT.setAttribute("width", x.at(-1) - PAD);
		RECT.setAttribute("height", y.at(-1) - PAD);
		return(RECT);
	};

	#textOnCenter({ x, y }, work) {
		const text =		document.createElementNS("http://www.w3.org/2000/svg", "text");
		const MID =			0.5;
		const LETTERPIX =	10;
		const X =			x.at(-1);
		const Y =			y.at(-1) * MID;
		const CENTERX =		X * MID;
		const POS =			y.length === 1 ? Y : nextPointY(y) + Y;

		text.setAttribute("x", CENTERX - ((work.length * LETTERPIX) * MID));
		text.setAttribute("y", POS);
		text.innerHTML = work[0];
		return (text);
	};

	#canvasRender () {
		const element =	document.createDocumentFragment();
		const X =		[];
		const Y =		[];
		let txt;


		this.#canvas.map(art => {
			X.push(proportion(art[1], this.#pixSize.x, this.#inCrate[0]));
			Y.push(proportion(art[3], this.#pixSize.y, this.#inCrate[2]));
			element.appendChild(this.#worksPositionLayer({ x: X, y: Y }));
			txt = [ { x: X , y: Y }, art, this.#inCrate, ];
			element.appendChild(this.#textOnCenter.apply(null, txt));
		});
		return (element);
	};
}

function nextPointY(info) {
	let result;

	if (info.length === 2)
		return (info.at(-2));
	result = info.reduce((sum, val) => (sum + val), 0);
	return (result - info.at(-1));
}

class noCanvasRender {
	#pixelSize;
	#items;
	#inCrate;

	constructor ({ works }, layerSize, dim) {
		this.#pixelSize =	layerSize;
		this.#inCrate =		dim;
		this.#items =		works;

		return (this.#canvasRender());
	};

	#layerPositioningWork(x, y) {
		let posX;
		let posY;
		const RESET = findSpot(x, y, this.#pixelSize);

		if (x.includes(0) || y.includes(0)) {
			posX = RESET.x;
			posY = RESET.y;
		}
		else {
			!x.includes(0) && x.length === 1 ? posX = 0 : posX = RESET.x;
			!y.includes(0) && !x.includes(0) ? posY = 0 : posY = RESET.y;
		}
		return({ posX, posY });
	};

	#worksPositionLayer({ X, Y }) {
		const RECT =		document.createElementNS("http://www.w3.org/2000/svg", "rect");
		const INSET =		1;
		const PAD =			20;
		const POS =			this.#layerPositioningWork(X, Y);
		const { x, y } =	this.#pixelSize;

		RECT.setAttribute("x", POS.posX + INSET);
		RECT.setAttribute("y", POS.posY + INSET);
		X.at(-1) >= x || POS.posX + X.at(-1) + INSET >= x ? 
			RECT.setAttribute("width", X.at(-1) - PAD):
			RECT.setAttribute("width", X.at(-1));
		Y.at(-1) >= y || POS.posY + Y.at(-1) >= y ?
			RECT.setAttribute("height", Y.at(-1) - PAD):
			RECT.setAttribute("height", Y.at(-1));
		return(RECT);
	};

	#textOnCenter({ X, Y }, work, layer) {
		const TEXT =		document.createElementNS("http://www.w3.org/2000/svg", "text");
		const MID =			0.5;
		const SUMMX =		+nextPoint(X).toFixed(0);
		const LETTERPIX =	10;
		let posX;
		let posY;
		const RESET =	findSpot(X, Y, layer);

		if (X.includes(0) || Y.includes(0)) {
			posX = RESET.x + (X.at(-1) * MID - ((work.length * LETTERPIX) * MID));
			posY = RESET.y + (Y.at(-1) * MID);
		}
		else {
			!X.includes(0) ? posX = SUMMX + (X.at(-1) * MID) :
				posX = RESET.x (X.at(-1) * MID - ((work.length * LETTERPIX) * MID));
			!Y.includes(0) && !X.includes(0) ? posY = Y.at(-1) * MID :
				posY = RESET.y + (Y.at(-1) * MID);
		}
		TEXT.setAttribute("x", posX);
		TEXT.setAttribute("y", posY);
		TEXT.innerHTML = work[0];
		return (TEXT);
	};

	#addZero(x, y, count, layer) {
		let i =			count;
		let resultX =	[];
		let resultY =	[];

		while(i >= 0 && x[i] !== 0) {
			resultX.push(x[i]);
			i--;
		}		i = count;
		while(i >= 0 && y[i] !== 0) {
			resultY.push(y[i]);
			i--;
		}		resultX = resultX.reduce((sum, val) => (sum + val), 0);
		resultY = resultY.reduce((sum, val) => (sum + val), 0);
		resultX >= layer.x ? x.push(0) : false;
		resultY >= layer.y ? y.push(0) : false;
	};

	#canvasRender () {
		const element =	document.createDocumentFragment();
		const X =		[];
		const Y =		[];
		let txt;

		this.#items.map((item, i) => {
			X.push(proportion(item[1], this.#pixelSize.x, this.#inCrate[0]));
			Y.push(proportion(item[2], this.#pixelSize.y, this.#inCrate[1]));
			element.appendChild(this.#worksPositionLayer({ X, Y }));
			txt = [ { X, Y }, item, this.#pixelSize ];
			element.appendChild(this.#textOnCenter.apply(null, txt));
			this.#addZero( X, Y , i, this.#pixelSize);
		});
		return (element);
	};
}

function nextPoint(info) {
	let result;

	if (info.length === 2)
		return (info.at(-2));
	result = info.reduce((sum, val) => (sum + val), 0);
	return (result - info.at(-1));
}

// ╭──────────────────────────────────────────────────────────────╮
// │ INFO: finds the last work location to define the next point. │
// ╰──────────────────────────────────────────────────────────────╯
function findSpot(axioX, axioY, layer) {
	let x;
	let y;
	let tmp;
	let zeroX =		0;
	let zeroY =		0;
	const SUMMX =	nextPoint(axioX);
	const SUMMY =	nextPoint(axioY);

	axioX.map(val => val === 0 ? zeroX++ : false);
	axioY.map(val => val === 0 ? zeroY++ : false);
	x = SUMMX - (zeroX * layer.x);
	y = SUMMX < layer.x || SUMMY < layer.y ? 0 : SUMMY - (zeroY * layer.y);
	if (x === 0 && axioY.includes(0)) {
		tmp = axioY.indexOf(layer.y);
		tmp >= 0 ? x = axioX[tmp] : x = axioX[axioY.indexOf(0) - 1];
	}	y >= layer.y ? y = SUMMY - (zeroY * layer.y) - axioY.at(-1) : false;
	return ({ x, y });
}

function plotter({ type, crate, works }, layerNum) {
	const draw =	cleanRender();
	const screen =	globalThis.screen.availWidth;
	const inCrate = [crate[0] - 23, crate[1] - 23, crate[2] - 28];
	let layerV;

	layerV = getScreenProportion(screen, [inCrate[0], inCrate[2]]);
	draw.setAttribute("width", layerV.x);
	draw.setAttribute("height", layerV.y);
	switch (type) {
		case 'tubeCrate' : //Renders only the X and Y, from tubes on layer.
			draw.appendChild(new TubeRender(works, layerV, inCrate));
			break ;
		case 'largestCrate' : //Renders only X, and Y, from largest canvas on layer.
			draw.appendChild(new LargestRender(works, layerV, inCrate, layerNum));
			break ;
		case 'sameSizeCrate' : //Renders only Z, and Y, on the layer.
			draw.appendChild(new sameSizeRender(works, layerV, inCrate, layerNum));
			break ;
		case 'noCanvasCrate' : //Renders only the X and Y, of each object.
			layerV = getScreenProportion(screen, [inCrate[0], inCrate[1]]);
			draw.setAttribute("width", layerV.x);
			draw.setAttribute("height", layerV.y);
			draw.appendChild(new noCanvasRender(works, layerV, inCrate));
			break ;
		case 'standardCrate' : //Renders all cnvas on each layer.
			draw.appendChild(new StandarRender(works, layerV, inCrate, layerNum));
			break ;
	}	return (draw);
}


function cleanRender() {
	const eLayer = document.querySelector(".crate-layer");

	if (eLayer.parentNode)
		while(eLayer.firstChild)
			eLayer.removeChild(eLayer.firstChild);
	return (eLayer);
}

async function getDataIDB (ref) {
	const WORKER = new Worker(
		new URL('./panels/worker.IDB.crates.mjs', import.meta.url), { type: "module" }
	);
	let request;

	WORKER.postMessage(ref);
	request = await new Promise((resolve, reject) => {
		WORKER.onmessage = (res) => {
			const { data } = res;
			data.reference === ref ? resolve(data.crates) : reject(res);
		};
	});
	return(request);
}

async function populateOptions() {
	const estimate =	localStorage.getItem("refNumb");
	const crates =		await getDataIDB(estimate);
	const select =		document.getElementById('selected-crate');
	const unit =		localStorage
		.getItem("metrica") === 'cm - centimeters' ? 'cm' : 'in';

	if(select.hasChildNodes())
		while(select.firstChild)
			select.removeChild(select.firstChild);
	select.innerHTML = crates.allCrates.map((crate, i) => {
		i++;
		return (`
			<option>
				Crate ${i} - ${crate[0]} x ${crate[1]} x ${crate[2]} - ${unit}
			</option>
		`);
	}, 0);
	localStorage.setItem('doneList', JSON.stringify({...crates}));
	await layersNumber(crates);
}

function getCurrentCrate$1() {
	const crates =	JSON.parse(localStorage.getItem('doneList'));
	let crateNum =	document.getElementById('selected-crate').value.split(' ')[1];
	let key;
	let works;
	let data;

	for (key in crates) {
		if (crates[key]?.hasOwnProperty('crates')) {
			crates[key].crates.map((crate, i) => {
				if (Array.isArray(crate) && --crateNum === 0) {
					works = crates[key].crates[i + 1];
					data = { type : key, crate : crate, works : works };
				}
			}, 0);
		}	}	return (data);
}

// ╭─────────────────────────────────────────╮
// │ Functions to preparete rendering works. │
// ╰─────────────────────────────────────────╯
function renderLayer$1() {
	const display =	document.getElementById('layers');
	const crate =	getCurrentCrate$1();
	const layer =	+sessionStorage.getItem('numLayer');

	display.appendChild(plotter(crate, layer - 1));
}

function findLayersNumber(data, counter, key) {
	let layers;

	if (key === 'sameSizeCrate') {
		data[key].crates.map((info, i) => {
			if (counter === 0 && layers === undefined)
				layers = info.works.length;
			i % 2 === 0 || i === 0 ? counter-- : false;
		}, 0);
	}
	else
		data[key].crates.map((box, i) => {
			if (counter === 0 && i % 2 === 1)
				key === 'tubeCrate' || key === 'noCanvasCrate' ?
					layers = 1 : layers = box.works.length;
			i % 2 === 0 || i === 0 ? counter-- : false;
		}, 0);
	return({ layers , counter });
}

async function layersNumber(list) {
	const crate =	document.getElementById('selected-crate').value;
	let selected =	+crate.split(' ')[1];
	let data =		list ?? JSON.parse(localStorage.getItem('doneList'));
	let number;
	let key;

	for (key in data) {
		if (data[key].hasOwnProperty('crates') && selected > 0) {
			if (data[key].crates.length > 0 ) {
				number = findLayersNumber(data, selected, key);
				selected = number.counter;
			}		}	}	sessionStorage.setItem('layers', number.layers);
	sessionStorage.setItem('numLayer', 1);
	setLayerDisplay();
}

function setLayerDisplay (value) {
	const layersNum =	sessionStorage.getItem('layers');
	const display =		document.getElementById('layer-count');

	value === undefined ?
		display.innerText = `Current layer: 1 / ${layersNum}`:
		display.innerText = `Current layer: ${value} / ${layersNum}`;
}

function skipLayer(button) {
	const storage =		sessionStorage;
	const layersVal =	Number.parseInt(storage.getItem('layers'));
	const currentVal =	Number.parseInt(storage.getItem('numLayer'));
	let sum;
	
	if (button.target.id === "next" || button.target.id === "layer-next") {
		sum = currentVal + 1;
		if (sum <= layersVal) {
			setLayerDisplay(sum);
			storage.setItem('numLayer', sum);
			sum--;
		}
		else {
			sum = layersVal - 1;
			storage.setItem('numLayer', layersVal);
		}
	}
	else {
		sum = currentVal - 1;
		if (sum >= 1 ) { 
			setLayerDisplay(sum);
			storage.setItem('numLayer', sum);
		}
		else {
			sum = 1;
			storage.setItem('numLayer', sum);
		}
	}
	displayClean();
	renderLayer$1();
}

function displayClean() {
	const display = document.querySelector(".crate-layer");

	if (display.hasChildNodes())
		while(display.firstChild)
			display.removeChild(display.firstChild);
	return ;
}

function openCloseDisplay (element) {
	const works = sessionStorage.getItem('codes');
	element.map(plotter => {
		if (plotter.ariaHidden === 'true' && works) {
			plotter.setAttribute("aria-hidden", false);
			plotter.setAttribute("aria-expanded", true);
		}
		else {
			plotter.setAttribute("aria-hidden", true);
			plotter.setAttribute("aria-expanded", false);
		}
	});
}

async function openDisplay() {
	const estimate =	document.getElementById("input_estimate").value;
	const display =		document.querySelector(".plotter");
	const menu =		document.querySelector(".plotter__menu");
	
	if(!estimate)
		return(alert("Please, start an 'Doc', add works and press the 'Crate' button."));
	openCloseDisplay([display, menu]);
	if (display.ariaHidden === 'false') {
		await populateOptions();
		renderLayer();
		setTimeout(
			() => globalThis.scroll({ top: 1000, behavior: "smooth" }), 1000
		);
	}}
// ╭─────────────────────────────────────────╮
// │ Functions to preparete rendering works. │
// ╰─────────────────────────────────────────╯
function renderLayer() {
	const display =	document.getElementById('layers');
	const crate =	getCurrentCrate();
	const layer =	+sessionStorage.getItem('numLayer');

	display.appendChild(plotter(crate, layer - 1));
}

function getCurrentCrate() {
	const crates =	JSON.parse(localStorage.getItem('doneList'));
	let crateNum =	document.getElementById('selected-crate').value.split(' ')[1];
	let key;
	let works;
	let data;

	for (key in crates) {
		if (crates[key]?.hasOwnProperty('crates')) {
			crates[key].crates.map((crate, i) => {
				if (Array.isArray(crate) && --crateNum === 0) {
					works = crates[key].crates[i + 1];
					data = { type : key, crate : crate, works : works };
				}
			}, 0);
		}	}	return (data);
}

// ╭──────────────────────────────────────────────────────────╮
// │          Change the works on the current layer.          │
// ╰──────────────────────────────────────────────────────────╯
function changeCrateDisplay() {
	const crateNum = document.getElementById('selected-crate').value;
	displayClean();
	return(renderLayer(+crateNum.split(' ')[1]));
}

// ╭───────────────────────────────────────────────────────────────────────╮
// │ ╭───────────────────────────────────────────────────────────────────╮ │
// │ │ INFO: Here is some functions to work when the page is loaded, and │ │
// │ │          expose another ones to be available to the DOM:          │ │
// │ │                     browserStoragePrepare();                      │ │
// │ │                             crate();                              │ │
// │ │                            clearAll();                            │ │
// │ ╰───────────────────────────────────────────────────────────────────╯ │
// ╰───────────────────────────────────────────────────────────────────────╯

// import { checkTokens } from './token.checkout.mjs';


// ╭───────────────────────────────────────────────────────────────────╮
// │ Calls to each change on the localStorage to update the list pane. │
// ╰───────────────────────────────────────────────────────────────────╯
globalThis.onstorage = () => {
	displayCub();
	displayAirCub();
	countWorks();
};

globalThis.onload = () => {
	const color = localStorage.getItem("mode");

	browserStoragePrepare();
	color === null ? localStorage.setItem("mode", "light") : false;
	setCheckRadio();
	setTimeout(loadingPage, 1500);
};

// globalThis.onbeforeunload = checkTokens();


// ╭────────────────────────────────────────────────────────╮
// │ Defines the measure of the works selected by the user. │
// ╰────────────────────────────────────────────────────────╯
if (!localStorage.getItem("metrica")) {
	const metrica = document.getElementById("cm").value;
	localStorage.setItem("metrica", metrica);
}


function setUnit() {
	const measure = localStorage.getItem("metrica");
	const check =	confirm(
		"Attention! You are going to change the measurement of the works."
	);

	if (!measure || measure === undefined) {
		localStorage.setItem("metrica",
			document.getElementById("cm").value
		);
	// This is the trigger to the "create" and clear button.
	}
	else if (check) {
		const storage = localStorage.getItem('metrica');

		storage === 'cm - centimeters' ?
			localStorage.setItem("metrica", "in - inches") :
			localStorage.setItem("metrica", "cm - centimeters");
		return;
	}
	setCheckRadio();
}

// ╭──────────────────────────────────────────────────────╮
// │ This is the trigger to the "crate" and clear button. │
// ╰──────────────────────────────────────────────────────╯
const crate = () => {
	browserStoragePrepare();
	crate$1();
	const element = document.querySelector(".result");

	if (sessionStorage.getItem('codes')) {
		element.ariaHidden === 'true' ? openCloseDisplay([element]) : false;
		setTimeout(
			() => globalThis.scroll({ top: 300, behavior: "smooth" }), 1000
		);
	}};


const clearAll = () => {
	const clear = confirm("Do you really want to delete the whole list?");
	const mode = localStorage.getItem("mode");
	const unit = localStorage.getItem("metrica");
	const element = document.querySelector(".result");
	const plotter = document.getElementById('layers');
	const menu = document.querySelector(".plotter__menu");

	if (clear === true) {
		countWorks() && displayAirCub() && displayCub();
		localStorage.clear();
		sessionStorage.clear();
		sessionStorage.setItem("clean", "eraser");
		localStorage.setItem("mode", mode);
		localStorage.setItem("metrica", unit);
		globalThis.document.getElementById("input_estimate").value = "";
		openCloseDisplay([element, plotter, menu]);
	}
	cleanInputs();
	document.getElementById("input_estimate").select();
};


function loadingPage() {
	const animation = document.querySelector(".loading");
	const pageApp = document.querySelector(".app");
	const footer = document.querySelector(".footer-content");

	animation.style.display = "none";
	animation.setAttribute("aria-hidden", true);
	pageApp.setAttribute("aria-hidden", false);
	footer.setAttribute("aria-hidden", false);
}

function browserStoragePrepare() {
	const ref = localStorage.getItem("refNumb");

	if (ref)
		document.getElementById("input_estimate").value = ref;
		createDB();
	return (displayCub() && displayAirCub() && countWorks());
}

function setCheckRadio() {
	const measure = localStorage.getItem("metrica");
	const color = localStorage.getItem("mode");
	const body = document.body;

	switch (measure) {
		case 'cm - centimeters':
			document.getElementById('cm').checked = true;
			break;
		case 'in - inches':
			document.getElementById('in').checked = true;
			break;
	}
	switch (color) {
		case ('light' ):
			document.getElementById('light-mode').checked = true;
			body.classList.remove("dark-mode");
			body.classList.toggle("light-mode");
			break;
		case 'dark':
			document.getElementById('dark-mode').checked = true;
			body.classList.remove("light-mode");
			body.classList.toggle("dark-mode");
			break;
	}
}

// ╭──────────────────────────────────────────────────────────╮
// │ ╭──────────────────────────────────────────────────────╮ │
// │ │ INFO: Here you are goint to find the copy functions: │ │
// │ │                    charRemover()                     │ │
// │ │                 findCratesAndWorks()                 │ │
// │ │                     findCrates()                     │ │
// │ │                formatterClipBoard();                 │ │
// │ ╰──────────────────────────────────────────────────────╯ │
// ╰──────────────────────────────────────────────────────────╯


function extractWorksLayers({ works }) {
	let arts = [];
	const AUX = Array.isArray(works[0][0]) ? works[0] : works;
	
	AUX?.map(data => {
		let layer;

		if (Array.isArray(data))
			return(arts.push(data));
		for (layer in data) {
			arts.push(layer);
			data[layer].length === 1 ? arts.push(data[layer][0]) :
				!Array.isArray(data[0]) ?
					data[layer].map(work => arts.push(work)) :
					data[layer][0].map(work => arts.push(work));
		}	});
	return(arts);
}

function findCratesAndWorks ({ crates }) {
	let polygons =	[];
	let key;
	let tmp;

	for (key in crates) {
		if (crates[key].hasOwnProperty('crates')) {
			crates[key].crates.map((info, j) => {
				switch (j % 2) {
					case 0 :
						polygons.push(info);
						break ;
					case 1 :
						tmp = extractWorksLayers(info);
						tmp.map(arts => polygons.push(arts));
						tmp = null;
						break ;
				}			}, 0);
		}	}
	sessionStorage.setItem("copy2", "done!");
	return(formatterClipBoard(polygons));
}

function findCrates ({ crates }) {
	sessionStorage.setItem("copy1", "done!");
	return(formatterClipBoard(crates.allCrates));
}

function formatterClipBoard(data) {
	if(!data)
		return("There is no crates. Please, try again!");
	const unit =		localStorage.getItem("metrica") === 'cm - centimeters'?
		'cm' : 'in';
	const formatted =	data.map(info => {
		let line;

		if (typeof(info) === 'string')
			return (`LAYER layer ${info?.at(-1)}:`);
		if (info.length >= 5) {
			line = `CODE: ${info[0]} - ${info[1]} x ${info[2]} x ${info[3]} - ${unit}`;
			return(line);
		}
		else if (info.length === 4) {
			line = `CRATE: ${info[0]} x ${info[1]} x ${info[2]} - ${unit}`;
			return(line);
		}	});
	const getString =		JSON.stringify(formatted);
	const copyFinished =	charRemover(getString, formatted.length);
	navigator.clipboard.writeText(copyFinished);
}

function charRemover(target, len) {
	while(len--) {
		target = target.replace('LAYER','\t');
		target = target.replace('CODE: ','\t\t');
		target = target.replace('"','');
		target = target.replace('"','');
		target = target.replace(',','\n');
	}
	target = target.replace('[','');
	target = target.replace(']','');
	return(target);
}

// ╭──────────────────────────────────────────────────────────────╮
// │ ╭──────────────────────────────────────────────────────────╮ │
// │ │   INFO: Here you are going to find the copy interface.   │ │
// │ ╰──────────────────────────────────────────────────────────╯ │
// ╰──────────────────────────────────────────────────────────────╯



function copyButton1 () {
	const crates =		new Worker(
		new URL('./panels/worker.IDB.crates.mjs', import.meta.url), { type: "module" }
	);
	const estimate =	document.getElementById("input_estimate").value;
	const checker =		sessionStorage.getItem(estimate);

	if (!checker)
		return(alert(`Please, press the \"Crate\" button if already added works.`));
	crates.postMessage(estimate);
	crates.onmessage = (test) => {
		return (Array.isArray(test.data.crates) ? findCrates(test.data): false);
	};
}

function copyButton2 () {
	const crates =		new Worker(
		new URL('./panels/worker.IDB.crates.mjs', import.meta.url), { type: "module" }
	);
	const estimate =	document.getElementById("input_estimate").value;
	const checker =		sessionStorage.getItem(estimate);

	if (!checker)
		return(alert(`Please, press the \"Crate\" button if already added works.`));
	crates.postMessage(estimate);
	crates.onmessage = (res) => {
		return(findCratesAndWorks(res.data));
	};
}

function switchMode(mode) {
	localStorage.setItem("mode", mode);
	changeMode(mode);
}

function changeMode (color) {
	const body = document.body.classList;

	body.remove("light-mode");
	body.remove("dark-mode");
	return (
		color === "dark" ?
			body.add("dark-mode"):
			body.add("light-mode")
	);
}

// ╭──────────────────────────────────────────────────────────╮
// │                     Accordion setup.                     │
// ╰──────────────────────────────────────────────────────────╯
function accordionController (event){
	const activePanel = event.target.closest(".accordion-panel");
	const menu =		document.querySelector(".accordion-panel");

	if (event.target.id === "body-app")
		return(closeMenu(menu));
	if (!activePanel)
		return;
	toggleAccordion(activePanel);
}

function closeMenu(element) {
	let menu;
	let buttons;
	let panel;

	for (menu in element) {
		buttons =	element.parentElement.querySelectorAll("button");
		panel =		element.parentElement.querySelectorAll(".menu__input");
		buttons.forEach(button => {
			button.setAttribute("aria-expanded", false);
		});
		panel.forEach(aria => {
			aria.setAttribute("aria-hidden", true);
		});
	}
}


function toggleAccordion(clicked) {
	const buttons =	clicked.parentElement.querySelectorAll("button");
	const panel =	clicked.parentElement.querySelectorAll(".menu__input");

	buttons.forEach(button => {
		button.setAttribute("aria-expanded", false);
	});
	panel.forEach(aria => {
		aria.setAttribute("aria-hidden", true);
	});
	openPanel(clicked);
}

function openPanel(panel) {
	panel.querySelector("button").setAttribute("aria-expanded", true);
	panel.querySelector(".menu__input").setAttribute("aria-hidden", false);
	globalThis.document.getElementById("estimate_getter").select();
}

// ╭──────────────────────────────────────────────────────────╮
// │                 Mobile side menu setup.                  │
// ╰──────────────────────────────────────────────────────────╯
function mobileMenu (selected, id) {
	if(selected.ariaHidden) {
		selected.setAttribute("aria-expanded", true);
		selected.setAttribute("aria-hidden", false);
	}	setTimeout(() => globalThis.scroll({top: 1000, behavior: "smooth"}), 200);
	setTimeout(document.getElementById(id).click(), 100);
}

function closeFan(menu) {
	menu.setAttribute("aria-expanded", false);
	menu.setAttribute("aria-hidden", true);
}


function optionToggle(id, option) {
	let menu;

	switch (id) {
		case "fetch-mob":
			menu =	document.querySelector(".get-estimate");
			mobileMenu(menu, 'search-btn');
			closeFan(option);
			break;
		case "currency-mob":
			menu =	document.querySelector(".exchange--content");
			mobileMenu(menu, 'exchange-btn');
			closeFan(option);
			setTimeout(() => {
				document.getElementById('exchange-header').click();
			}, 250);
			break;
		case "units-mob":
			menu =	document.querySelector(".units-conversion");
			mobileMenu(menu, 'units-btn');
			closeFan(option);
			break;
	}
}

globalThis.document.querySelector(".IO__press-mobile")
	.addEventListener("click", (element) => {
	const { id } =		element.target;
	const menuOpts =	document.querySelector(".fan-options");

	if (id === "menu-options" && menuOpts.ariaHidden) {
		menuOpts.setAttribute("aria-expanded", true);
		menuOpts.setAttribute("aria-hidden", false);
	}
	else {
		menuOpts.setAttribute("aria-expanded", false);
		menuOpts.setAttribute("aria-hidden", true);
	}
	optionToggle(id, menuOpts);
}, true);

// NOTE: reset the code changed by the data base in order to render on status panel.
function resetList(list) {
	const reseted = [];

	list.map(work => {
		const { code, x , z, y } = work;
		reseted.push({ code, x, z, y });
	});
	return(reseted);
}

// NOTE: the path is different with or without the bundle file.
async function checkBrowserDB(doc) {
	const workerDB =	new Worker(
		new URL('./panels/worker.IDB.crates.mjs', import.meta.url), { type: "module" }
	);
	const checkIDB =	await new Promise((resolve, reject) => {
		workerDB.postMessage(doc);
		workerDB.onmessage = (result => {
			result !== undefined ? resolve(result.data): reject(undefined);
		});
	});

	if (checkIDB) {
		document.getElementById("input_estimate").value = doc;
		sessionStorage.setItem("FETCHED", JSON.stringify(checkIDB));
	}
	else if (!checkIDB)
		return(fetchDB(doc));
}

function setDBFetched (result) {
	try {
		if (result){
			const { crates, works, reference_id } = result[0];
			const fetched = {
				crates,
				list : resetList(works.list),
				reference : reference_id
			};
			document.getElementById("input_estimate").value = reference_id;
			sessionStorage.setItem("FETCHED", JSON.stringify(fetched));
		}
		else
			throw new TypeError('Data not found!');
	}
	catch (err) {
		console.log(`ATTENTION: ${err}`);
		alert(`Document not found! Please, try again.`);
	}
}

async function fetchDB(doc) {
	const url =		`/estimates/${doc}`;
	const HEADER =	{
		'Content-Type': 'application/json; charset=UTF-8',
	};
	if (globalThis.navigator.onLine) {
		try {
			await fetch (url, {
				method: "GET",
				headers: HEADER,
			}).then(estimate => estimate.json())
			.then(setDBFetched)
			.catch(err => console.error(`ALERT ${err}`));
		}
		catch(err) {
			console.log(`ATTENTION: ${err}`);
			alert(`Document not found! Please, try again.`);
		}
	}
}


function regexChecker(data){
	const regex = /[^-a-z-A-Z-0-9]/g;

	switch(regex.test(data)) {
		case true:
			alert(`Found special character NOT allowed. Please, try again!`);
			return (true);
		case false:
			return (false);
	}}

function searchEstimate() {
	const docEstimate =	document.getElementById("estimate_getter").value;

	return(!regexChecker(docEstimate) ? checkBrowserDB(docEstimate): false);
}

// INFO: Closure test.
// function testClosure (num) {
// 	let count = num;
//
// 	const res = (() => {
// 		const num = 10;
//
// 		console.log(count * num);
// 		count += 10;
// 	});
// 	return (res);
// };
// const x = testClosure(3);
// x();
// x();
// x();

async function logout() {
	const url = '/logout';
	const cookies = "id=deleted; sessin=deleted; name=deleted; expires=Thu, 01 Jan 1970 00:00:00 GMT";

	if (confirm("Are you sure to logout?")) {
		globalThis.location.replace('/otto/login/');
		try {
			await fetch(url, {
				method: "GET",
				cookie: cookies,
				headers: { 'Content-Type': 'application/json; charset=UTF-8' },
			}).then(res => console.log(res))
			// }).then(res => globalThis.location.replace(res.url))
			.catch(err => console.error(`Alert ${err}`));
		}
		catch (err) {
			alert(`Attention: ${err}`);
		}	}
}

async function installer() {
	globalThis.hideInstallPromotion();
	globalThis.deferredPrompt.prompt();

	const { outcome } = await deferredPrompt.userChoice;
	console.log(`User response to the install prompt: ${outcome}`);
	globalThis.deferredPrompt = null;
}

globalThis.onkeydown = (push) => {
	const task1 = ((push.key === "Enter") && (push.ctrlKey === true));
	task1 ? crate() : false;
	const task2 = ((push.ctrlKey === true) && (push.key === "V"));
	task2 ? openDisplay() : false;
};


globalThis.document.getElementById('main-app')
	.addEventListener("click", (element => {
	
	// console.log(element.target.id);
	switch (element.target.id) {
		case "body-app" :
			accordionController(element);
			break;
		case "buttonInstall":
			installer();
			break;
		case "add-btn":
			catchWork();
			break;
		case "remove-btn":
			catchRemove();
			break;
		case "clear-btn":
			clearAll();
			break;
		case "crate-btn":
			crate();
			break;
		case "crate_btn":
			crate();
			break;
		case "copy-pane1":
			copyButton1();
			break;
		case "copy-pane2":
			copyButton2();
			break;
		case "logout":
			logout();
			break;
		case "logout-btn":
			logout();
			break;
		case "seek-btn":
			accordionController(element);
			break;
		case "search-header":
			accordionController(element);
			break;
		case "exchange-header":
			coins();
			exchangeHeader();
			accordionController(element);
			break;
		case "units-header":
			accordionController(element);
			break;
		case "button-seek":
			accordionController(element);
			break;
		case "search-btn":
			accordionController(element);
			break;
		case "ex-btn":
			coins();
			accordionController(element);
			break;
		case "exchange-btn":
			coins();
			accordionController(element);
			break;
		case "unit-btn":
			accordionController(element);
			break;
		case "units-btn":
			accordionController(element);
			break;
		case "fetch-btn":
			searchEstimate();
			break;
		case "crate-layers":
			openDisplay();
			break;
		case "layer-crate":
			openDisplay();
			break;
		case "previous":
			skipLayer(element);
			break;
		case "layer-prev":
			skipLayer(element);
			break;
		case "next":
			skipLayer(element);
			break;
		case "layer-next":
			skipLayer(element);
			break;
	}
}), true);


globalThis.document.getElementById('main-app')
	.addEventListener("change", (element => {

	// console.log(element.target.id);
	element.preventDefault();
	switch (element.target.id) {
		case "input_estimate":
			createDB();
			break;
		case "in":
			setUnit();
			break;
		case "cm":
			setUnit();
			break;
		case "dark-mode":
			switchMode('dark');
			break;
		case "light-mode":
			switchMode('light');
			break;
		case "coin1":
			coinInputOne();
			break;
		case "coin2":
			coinInputTwo();
			break;
		case "units1":
			setUnitOne();
			break;
		case "units2":
			setUnitTwo();
			break;
		case "selected-crate":
			layersNumber();
			changeCrateDisplay();
			break;
	}}), true);


globalThis.document.getElementById('main-app')
	.addEventListener("input", (element => {

	// console.log('Inputs', element);
	switch (element.target.id) {
		case "coin1-input":
			getInputOne();
			break;
		case "coin2-input":
			getInputTwo();
			break;
		case "input-unit1":
			getUnitOne();
			break;
		case "input-unit2":
			getUnitTwo();
			break;
	}}), true);


globalThis.onsubmit = (event) => {
	event.preventDefault();
};


globalThis.document.getElementById('estimate_getter')
	.addEventListener('keypress', (event) => {

	const BUTTON = globalThis.document.getElementById('fetch-btn');
	event.key === 'Enter' ? BUTTON.click() : false;
}, true);


globalThis.navigator.serviceWorker.register('./sw.mjs');


globalThis.addEventListener('beforeinstallprompt', (event) => {
	event.preventDefault();
	console.log('👍', 'beforeinstallprompt', event);
	globalThis.deferredPrompt = event;
	console.log(`'beforeinstallprompt' event was fired.`);
});
