
import ArtWork from '../www/app/front-modules/Art.class.def.mjs';


const list = [
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


export function artList() {
	return (list);
};


export function artWorksList() {
	const works =	list.map(work => {
		return(new ArtWork(work[0], work[1], work[2], work[3]));
	});

	return(works);
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
