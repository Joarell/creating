
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
]


export function artWorksList() {
	const works =	list.map(work => {
		return(new ArtWork(work[0], work[1], work[2], work[3]));
	});

	return(works);
};


export function lessSameSize() {
	const works =		artWorksList();
	const cubedList =	works.map(work => {
		const cub = work.arr();
		cub.push(work.cubed())
		return(cub);
	})
	
	return ({ cubedList });
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


export function artList() {
	return (list);
};
