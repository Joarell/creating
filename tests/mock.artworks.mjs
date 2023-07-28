
import ArtWork from '../www/app/front-modules/Art.class.def.mjs';


const list = [
	['909', 100, 20, 20],
	['8383', 180, 30, 30],
	['3231', 180, 30, 30],
	['88800', 70, 70, 70],
	['230202', 70, 70, 70],
	['1298', 200, 5, 100],
	['123', 100, 5, 100],
	['5908', 150, 5, 90],
	['8899', 120, 3, 100],
	['777', 50, 3, 50],
	['8980', 30, 3, 30],
	['71234', 30, 3, 30],
	['1111', 30, 3, 30],
	['2313', 30, 3, 30],
	['1112', 60, 5, 90],
	['1897', 180, 5, 100],
	['9897', 75, 5, 80],
	['9884', 100, 5, 120],
	['8745', 130, 5, 100],
	['8877', 160, 5, 160],
	['34733', 130, 5, 50],
	['18988', 130, 5, 50],
	['38388', 130, 5, 50],
	['75784', 130, 5, 50],
	['90909', 100, 5, 90],
	['12345', 89, 5, 88],
	['98099', 120, 3, 100],
	['44444', 60, 5, 60],
	['98239', 40, 5, 50],
	['23984', 40, 5, 50],
	['999299', 40, 5, 50],
	['134144', 40, 5, 50],
	['121231', 50, 5, 50],
	['19023', 50, 5, 50],
	['9898', 50, 5, 50],
	['98888', 50, 5, 50],
	['11111', 60, 5, 60],
	['22222', 60, 5, 60],
	['33333', 60, 5, 60],
	['LJ-10298', 220, 10, 300],
	['LJ-298', 300, 10, 300],
]

export const caseTube1 = [
	['22222', 260, 20, 20],
];

const tube1 = [
	['22222', 260, 20, 20],
];

export const caseTube2 = [
	['98888', 100, 30, 30],
	['22222', 260, 20, 20],
];

const tube2 = [
	['98888', 100, 30, 30],
	['22222', 260, 20, 20],
];

export const caseTube3 = [
	['98888', 100, 30, 30],
	['22222', 260, 20, 20],
	['33332', 260, 20, 20],
];

const tube3 = [
	['98888', 100, 30, 30],
	['22222', 260, 20, 20],
	['33332', 260, 20, 20],
];

export const caseTube4 = [
	['98888', 100, 30, 30],
	['11111', 260, 20, 20],
	['22222', 260, 20, 20],
	['33333', 260, 20, 20],
];

const tube4 = [
	['98888', 100, 30, 30],
	['11111', 260, 20, 20],
	['22222', 260, 20, 20],
	['33333', 260, 20, 20],
];

export const caseTube5 = [
	['98888', 100, 30, 30],
	['11111', 260, 20, 20],
	['22222', 260, 20, 20],
	['33330', 260, 20, 20],
	['33331', 90, 20, 20],
	['33328', 120, 40, 40],
	['33319', 60, 20, 20],
	['33319', 60, 20, 20],
	['33269', 190, 35, 35],
];

const tube5 = [
	['98888', 100, 30, 30],
	['11111', 260, 20, 20],
	['22222', 260, 20, 20],
	['33330', 260, 20, 20],
	['33331', 90, 20, 20],
	['33328', 120, 40, 40],
	['33319', 60, 20, 20],
	['33319', 60, 20, 20],
	['33269', 190, 35, 35],
];

export const caseTube6 = [
	['98888', 100, 60, 60],
	['11111', 260, 60, 60],
	['22222', 260, 60, 60],
	['33330', 260, 60, 60],
	['33331', 190, 50, 50],
	['33328', 120, 50, 50],
	['33319', 200, 50, 50],
	['33319', 200, 50, 50],
	['33269', 280, 60, 60],
];

const tube6 = [
	['98888', 100, 60, 60],
	['11111', 260, 60, 60],
	['22222', 260, 60, 60],
	['33330', 260, 60, 60],
	['33331', 190, 50, 50],
	['33328', 120, 50, 50],
	['33319', 200, 50, 50],
	['33319', 200, 50, 50],
	['33269', 280, 60, 60],
];

// ╭────────────────────────────────────────────────────────────╮
// │ Bellow you will find the mock functions to 'Crater' class. │
// ╰────────────────────────────────────────────────────────────╯

function sizeComposer() {
	let X = this[0][1];
	let Z = this[0][2];
	let Y = this[0][3];
	
	this.map(tube => {
		X = tube[1] ?? X;
		Z = tube[2] ?? Z;
		Y = tube[3] ?? Y;
	});

	return([X, Z, Y]);
};


function setSizes(pad, highPad){
	const X = this[0] + pad;
	const Z = this[1] + pad;
	const Y = this[2] + highPad;

	return([X, Z, Y]);
};


function oneTubeCrate() {
	const DEFAULTPAD =	23;
	const HEIGHTPAD =	25;
	const X =			this[0][1] + DEFAULTPAD;
	const Z =			this[0][2] + DEFAULTPAD;
	const Y =			this[0][3] + HEIGHTPAD;

	return ([X, Z, Y]);
};

function TubeCrate(content) {
	const DEFAULTPAD =	15;
	const HEIGHTPAD =	25 * content;
	const baseSize =	sizeComposer.call(this);

	return (setSizes.call(baseSize, DEFAULTPAD, HEIGHTPAD));
};


function interfaceTubeCrates(opt, tubes) {
	switch(opt) {
		case 1:
			return(oneTubeCrate.call(tubes));
		case 2:
			return(TubeCrate.call(tubes, 2));
		case 3:
			return(TubeCrate.call(tubes, 3));
		case 4:
			return(TubeCrate.call(tubes, 4));
	};
};


function hugeTubes(huges) {
	const result =		[];
	const MAXCONTENT =	3;
	let getter;

	while(huges.length >= MAXCONTENT) {
		getter = huges.splice(0, MAXCONTENT);
		result.push(interfaceTubeCrates(getter.length, getter));
		result.push({ works: getter });
	};
	return (result);
};


function checkHugeTubes () {
	const DIAMETER =	40;
	const getter =		this.filter(tube => {
		if (tube[2] > DIAMETER)
			return (tube);
		return ;
	});
	getter.map(roll => {
		this.splice(this.indexOf(roll), 1);
	});
	return (getter);
};


function crateTubesOpt(tubes) {
	let reduce =		[];
	let crates =		[];
	const MAXCONTENT =	3;
	const biggest =		checkHugeTubes.call(tubes);

	if (biggest.length > 0 || biggest.length > MAXCONTENT)
		crates.push(hugeTubes(biggest));

	while(tubes.length >= MAXCONTENT) {
		reduce = tubes.splice(0, MAXCONTENT);
		crates.push(interfaceTubeCrates(reduce.length, reduce));
		crates.push({ works: reduce });
	};
	if(tubes.length >= 1) {
		crates.push(interfaceTubeCrates(tubes.length, tubes));
		crates.push({ works: tubes });
	}
	return ({ crates: crates });
};


export function provideTubeCrate(opt) {
	let tubes;
	let crate = [];

	switch(opt) {
		case 1:
			tubes = tube1;
			break ;
		case 2:
			tubes = tube2;
			break ;
		case 3:
			tubes = tube3;
			break ;
		case 4:
			tubes = tube4;
			break ;
		case 5:
			tubes = tube5;
			break ;
		case 6:
			tubes = tube6;
			break ;
	};

	if(tubes.length > 4) {
		return(crateTubesOpt(tubes));
	}
	else
		crate = crateTubesOpt(tubes); 
	return (crate);
};








// ╭──────────────────────────────────────────────────────────────╮
// │ Bellow you will find all mock functions to 'Arranger' class. │
// ╰──────────────────────────────────────────────────────────────╯

export function artList() {
	return (list);
};


export function artWorksList() {
	const works =	list.map(work => {
		return(new ArtWork(work[0], work[1], work[2], work[3]));
	});

	return(works);
};


export function findTubesClassTest () {
	const list =			largestWorks();
	const { noCanvas } =	list;
	const tubes =			noCanvas.filter(pece => {
		if(pece[1] !== pece[2] && pece[2] === pece[3])
			return(pece);
		return
	})

	tubes.map(art => list.noCanvas.splice(list.noCanvas.indexOf(art), 1));
	list.tubes = tubes

	return ( list );
};


export function findTubes () {
	const list =			largestWorks();
	const { noCanvas } =	list;
	const tubes =			noCanvas.filter(pece => {
		if(pece[1] !== pece[2] && pece[2] === pece[3])
			return(pece);
		return
	})

	tubes.map(art => list.noCanvas.splice(list.noCanvas.indexOf(art), 1));
	list.tubes = tubes

	return ({ list });
};


export function largestWorks () {
	const list =			noCanvasOut();
	const { sorted } =		list;
	const largestCanvas =	sorted.filter(work => {
		const MAXHEIGHT = 220;
		if (work[1] > MAXHEIGHT || work[3] > MAXHEIGHT)
			return (work);
		return ;
	});

	largestCanvas.map(canvas => {
		list.sorted.splice(list.sorted.indexOf(canvas), 1);
	});
	list.largest = largestCanvas;
	return(list);
}


export function noCanvasOut () {
	const list =					lessSameSize();
	const { sorted, sameSize } =	list;
	const MAXDEPTH =				10;
	const noCanvas =				sorted.filter(work => work[2] > MAXDEPTH);

	sameSize.filter(work => {
		if(work[2] > MAXDEPTH)
			noCanvas.push(work);
	});
	noCanvas.map(art => {
		const index = list.sorted.indexOf(art);
		list.sorted.splice(index, 1);
	});

	list.noCanvas = noCanvas;
	return (list);
};


export function lessSameSize() {
	const sortedWorks =	quickSortResult();
	const { sorted } =	sortedWorks;
	const trialOne =	firstTrialWorks.call(sorted);
	const trialTwo =	secondTrialWorks.call(trialOne);

	trialTwo.map(art => {
		sorted.splice(sorted.indexOf(art), 1);
	});

	return({sorted: sorted, sameSize: trialTwo});
};


function firstTrialWorks() {
	const getter =	[];
	const checker = (a, b) => a[4] === b[4] && a[0] !== b[0];
	this.map(work => {
		let i =	0;

		for(i in this)
			if (!getter.includes(this[i]) && checker(this[i], work))
				getter.push(this[i])
	});
	
	return(getter);
};


function secondTrialWorks() {
	const sameSizeList = [];
	this.map(work => {
		let getter =	[];
		const x =		work[1];
		const y =		work[3];
		const cub =		work[4];
		let i =		0;
		const check = (art) => art[1] === x && art[3] === y && art[4] === cub;

		for(i in this) {
			if (check(this[i]) && !sameSizeList.includes(this[i]))
				getter.push(this[i]);	
		};
		if (getter.length >= 4)
			getter.map(element => {
				sameSizeList.push(element);
			});
		getter = null;
	});

	return(sameSizeList);
};


export function quickSortResult() {
	const gc =				new WeakSet();
	const CUBEDVALUE =		4;
	const cubedList =		artWorksCubed();
	const result =			quickSort(cubedList, CUBEDVALUE)

	gc.add(cubedList);
	return ({sorted: result});
};


function quickSort(list, pos) {
	if (list.length <= 1)
		return (list);

	const left =	[];
	const pivot =	list.splice(0, 1)
	const right =	[];
	let i =			0;

	for (i in list)
		list[i][pos] <= pivot[0][pos] ? left.push(list[i]): right.push(list[i]);
	return(quickSort(left, pos).concat(pivot, quickSort(right, pos)));
};


export function artWorksCubed() {
	const gc =			new WeakSet();
	const works =		artWorksList();
	const cubedList =	works.map(work => {
		const cub = work.arr();
		cub.push(work.cubed())
		return(cub);
	})
	
	gc.add(works);
	return (cubedList);
};
