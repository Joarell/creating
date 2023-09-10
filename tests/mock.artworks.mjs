
import ArtWork from '../www/app/core2/ArtWork.class.mjs';
import Arranger from '../www/app/core2/Arranger.class.mjs';
import CraterSameSize from '../www/app/core2/Crater.same.size.mjs';
import CraterStandard from '../www/app/core2/Crater.standard.crate.mjs';


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


// ╭─────────────╮
// │ Crater Mock │
// ╰─────────────╯
export const mockTest40 =	{
		crates: [ [ 153, 43, 78, 85.527 ], { works: [ [
				[ '38388', 130, 5, 50, 0.033 ],
				[ '18988', 130, 5, 50, 0.033 ],
				[ '34733', 130, 5, 50, 0.033, ' ' ],
				[ '75784', 130, 5, 50, 0.033 ]
			] ]
		} ],
		backUp: [
		[ 53, 33, 58, 16.907 ],
		{ works: [[[
				[ '1111', 30, 3, 30, 0.003 ],
				[ '71234', 30, 3, 30, 0.003 ],
				[ '8980', 30, 3, 30, 0.003 ],
				[ '2313', 30, 3, 30, 0.003 ]
			]]]
		},
		[ 153, 43, 78, 85.527 ],
		{ works: [
			[
				[ '38388', 130, 5, 50, 0.033 ],
				[ '18988', 130, 5, 50, 0.033 ],
				[ '34733', 130, 5, 50, 0.033 ],
				[ '75784', 130, 5, 50, 0.033 ]
			]
		]}
	]
};
	

export const mockTest41 =	{
	crates : [
		[ 203, 83, 188, 527.935 ],
		{
			works: [
				{ layer1: [ [ '1897', 180, 5, 100, 0.09 ] ] },
				{ layer2: [ [ '8877', 160, 5, 160, 0.128 ] ] },
				{
					layer3: [
						[ '5908', 150, 5, 90, 0.068 ],
						[ '1112', 60, 5, 90, 0.027, ' ' ],
						[ '777', 50, 3, 50, 0.007 ],
						[ '1111', 30, 3, 30, 0.003 ],
						[ '71234', 30, 3, 30, 0.003 ]
					]
				},
				{
					layer4: [
						[ '8745', 130, 5, 100, 0.065 ],
						[ '8980', 30, 3, 30, 0.003 ],
						[ '2313', 30, 3, 30, 0.003 ]
					]
				}
			]
		},
		[ 143, 96, 148, 338.624 ],
		{
			works: [
				{ layer1: [ [ '8899', 120, 3, 100, 0.036 ] ] },
				{ layer2: [ [ '9884', 100, 5, 120, 0.06 ] ] },
				{ layer3: [ [ '90909', 100, 5, 90, 0.045 ] ] },
				{ layer4: [ [ '12345', 89, 5, 88, 0.039 ] ] },
				{ layer5: [ [ '9897', 75, 5, 80, 0.03 ] ] }
			]
		}
	],
	backUp: [
		[ 203, 83, 188, 527.935 ],
		{
			works: [
				{ layer1: [ [ '1897', 180, 5, 100, 0.09 ] ] },
				{ layer2: [ [ '8877', 160, 5, 160, 0.128 ] ] },
				{
					layer3: [
						[ '5908', 150, 5, 90, 0.068 ],
						[ '1112', 60, 5, 90, 0.027, ' ' ],
						[ '777', 50, 3, 50, 0.007 ]
					]
				},
				{ layer4: [ [ '8745', 130, 5, 100, 0.065 ] ] }
			]
		},
		[ 143, 96, 148, 338.624 ],
		{
			works: [
				{ layer1: [ [ '8899', 120, 3, 100, 0.036 ] ] },
				{ layer2: [ [ '9884', 100, 5, 120, 0.06 ] ] },
				{ layer3: [ [ '90909', 100, 5, 90, 0.045 ] ] },
				{ layer4: [ [ '12345', 89, 5, 88, 0.039 ] ] },
				{ layer5: [ [ '9897', 75, 5, 80, 0.03 ] ] }
			]
		},
	]
};
	

export function mockOptios() {
	const BACKUP = true;
	const crates = {};
	const setCub = (sizes) => {
		const COORDINATES = 3;
		if (sizes === false)
			return ;
		if (Array.isArray(sizes) && sizes.length === COORDINATES) {
			const X =			sizes[0];
			const Z =			sizes[1];
			const Y =			sizes[2];
			const AIRCONST =	6000;
			const cubCrate =	+(X * Z *Y / AIRCONST).toFixed(3);

			sizes.push(cubCrate);
		};
	};
	
	crates.sameSizeCrate = new CraterSameSize(findTubesTest().sameSize, BACKUP);
	crates.standardCrate = new CraterStandard(findTubesTest().sorted, BACKUP);
	crates.sameSizeCrate.crates.map(setCub);
	crates.standardCrate.crates.map(setCub);
	crates.sameSizeCrate.backUp.map(setCub);
	crates.standardCrate.backUp.map(setCub);
	return({ crates });
};

export function fakeCrater(works) {
	const crates =		['crates ahead'];
	const TOTALCUB =	3864.145;
	const PAX =			6;
	const CARGO =		2;
	
	crates.sameSizeCrate = new CraterSameSize(findTubesTest(works).sameSize);
	crates.standardCrate = new CraterStandard(findTubesTest(works).sorted);
	crates.airCubTotal = TOTALCUB;
	crates.wichAirPort = [{ PAX }, { CARGO }];

	return({ crates });
};

// ╭────────────────╮
// │ Standard Works │
// ╰────────────────╯
export const standard1 = [
	[ '2313', 30, 3, 30, 0.003 ],
	[ '1111', 30, 3, 30, 0.003 ],
	[ '777', 50, 3, 50, 0.007 ],
	[ '909', 100, 5, 20, 0.01 ],
	[ '1112', 60, 5, 90, 0.027 ],
	[ '8899', 120, 3, 100, 0.036 ],
	[ '123', 100, 5, 100, 0.05 ],
	[ '8980', 130, 3, 130, 0.051 ],
	[ '3231', 180, 3, 110, 0.059 ],
	[ '1298', 120, 5, 100, 0.06 ],
	[ '71234', 180, 3, 120, 0.065 ],
	[ '5908', 150, 5, 90, 0.068 ],
	[ '8383', 180, 3, 130, 0.07 ],
	[ '230202', 170, 7, 70, 0.083 ],
	[ '88800', 170, 7, 70, 0.083 ]
];

export const standard2 = [
	[ '71234', 180, 3, 120, 0.065 ],
	[ '5908', 150, 5, 90, 0.068 ],
	[ '8383', 180, 3, 130, 0.07 ],
	[ '230202', 170, 7, 70, 0.083 ],
	[ '88800', 170, 7, 70, 0.083 ]
];

export const standard3 = [
	[ '8899', 120, 3, 100, 0.036 ],
	[ '123', 100, 5, 100, 0.05 ],
	[ '136', 140, 5, 100, 0.07 ],
	[ '8980', 130, 3, 130, 0.051 ],
	[ '3231', 180, 3, 110, 0.059 ],
	[ '1298', 120, 5, 100, 0.06 ],
];

export const standard4 = [
	[ '8899', 120, 3, 100, 0.036 ],
	[ '123', 100, 5, 100, 0.05 ],
	[ '136', 140, 5, 100, 0.07 ],
	[ '8980', 130, 3, 130, 0.051 ],
];

const common1 = [
	[ '2313', 30, 3, 30, 0.003 ],
	[ '1111', 30, 3, 30, 0.003 ],
	[ '777', 50, 3, 50, 0.007 ],
	[ '909', 100, 5, 20, 0.01 ],
	[ '1112', 60, 5, 90, 0.027 ],
	[ '8899', 120, 3, 100, 0.036 ],
	[ '123', 100, 5, 100, 0.05 ],
	[ '8980', 130, 3, 130, 0.051 ],
	[ '3231', 180, 3, 110, 0.059 ],
	[ '1298', 120, 5, 100, 0.06 ],
	[ '71234', 180, 3, 120, 0.065 ],
	[ '5908', 150, 5, 90, 0.068 ],
	[ '8383', 180, 3, 130, 0.07 ],
	[ '230202', 170, 7, 70, 0.083 ],
	[ '88800', 170, 7, 70, 0.083 ]
];

const common2 = [
	[ '71234', 180, 3, 120, 0.065 ],
	[ '5908', 150, 5, 90, 0.068 ],
	[ '8383', 180, 3, 130, 0.07 ],
	[ '230202', 170, 7, 70, 0.083 ],
	[ '88800', 170, 7, 70, 0.083 ]
];

const common3 = [
	[ '8899', 120, 3, 100, 0.036 ],
	[ '123', 100, 5, 100, 0.05 ],
	[ '136', 140, 5, 100, 0.07 ],
	[ '8980', 130, 3, 130, 0.051 ],
	[ '3231', 180, 3, 110, 0.059 ],
	[ '1298', 120, 5, 100, 0.06 ],
];

const common4 = [
	[ '8899', 120, 3, 100, 0.036 ],
	[ '123', 100, 5, 100, 0.05 ],
	[ '136', 140, 5, 100, 0.07 ],
	[ '8980', 130, 3, 130, 0.051 ],
];

// ╭───────────────────────────────────╮
// │ Sorted list - Conventional crate. │
// ╰───────────────────────────────────╯

//						 crate[0]
//			   ╭──────────────────────────╮
//			   │                          │
//			   │                          │
//			   │                          │
//	  crate[5] │                          │ crate[2]
//			   │                          │
//			   │                          │
//			   │                          │
//			   ╰──────────────────────────╯
//						crate[3]

function defineExternalSize(innerSize, works) {
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
	};
	return([X, z, Y]);
};


function crateReduceSize(layer, art) {
	const x1 = layer[0];
	const y1 = layer[2];
	const x2 = layer[3];
	const y2 = layer[5];

	art[0] <= x2 ? layer[3] = x2 - art[0] : false;
	art[1] <= y2 && layer[3] !== x2 ? layer[5] = y2 - art[1]: false;

	x1 !== layer[0] && x1 === art[0] ? layer[2] = y2 - art[1] : false;
	y1 > y2 && layer[3] === 0 ? layer[2] = y1 - art[1] : false;
	y2 === 0 && y1 > 0 ? layer[0] = x1 - art[0] : false;

	y2 <= x1 && layer[3] === x2 ?
		layer[0] = x1 - art[0]:
		layer[5] = y2 - art[1];
	x1 !== layer[0] && layer[0] <= layer[3] ? layer[5] = y2 - art[1] : false;

	x2 === art[0] ? layer[2] = y1 - art[1] : false;
	y2 === art[1] ? layer[0] = x1 - art[0] : false;
};


function matchCanvasInLayer(matched, layer, arts, len) {
	if(layer[0] === 0 && layer[2] === 0 || len < 0)
		return ;
	const SPIN =	6
	let i =			0;
	let x =			arts[len][1];
	let y =			arts[len][3];
	let check1;
	let check2;
	let check3;

	while (i++ < 2) {
		check1 = x <= layer[0] && y <= layer[5];
		check2 = x <= layer[3] && y <= layer[2];
		check3 = x <= layer[0] && y <= layer[2] && layer[3] === 0;

		if (check1 || check2 || check3) {
			crateReduceSize(layer, [x, y]);
			if (i === 2 && arts[len].length < SPIN)
				arts[len].push(" ");
			else if (arts[len].lenght === SPIN)
				arts[len].pop();
			matched.push(arts[len]);
			return (matchCanvasInLayer(matched, layer, arts, len - 1));
		};
		[x, y] = [y, x];
	};
	return (matchCanvasInLayer(matched, layer, arts, len - 1));
};


function setLayer(crate, works) {
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
	}
};


function hugeCanvasFirst(crate, list, layer) {
	let countLayer =	0;
	const GETCANVAS =	[];

	list.map(art => art[1] === layer[0] ? GETCANVAS.push(art) : false);
	GETCANVAS.map(canvas => {
		countLayer++;
		setLayer.call(countLayer, crate, [canvas]);
		list.splice(list.indexOf(canvas), 1);
	});
	return(countLayer);
};


function fillCrate(size, list) {
	const MAXLAYER =	4;
	let crate =			[];
	let greb =			[];
	let checkLen =		false;
	let i =				hugeCanvasFirst(crate, list, size);


	while (i++ < MAXLAYER || checkLen && list.length) {
		matchCanvasInLayer(greb, [...size,...size], list, list.length - 1);
		if (greb.length > 0) {
			greb.map(art => list.splice(list.indexOf(art), 1));
			setLayer.call(i, crate, greb);
			greb =		null;
			greb =		[];
		};
		checkLen =	list.length === 1 && i === MAXLAYER;
	};
	return(crate);
};


function defineSizeCrate(list) {
	const MAXX =	250;
	const MAXY =	132;
	let len =		list.length;
	let x =			0;
	let z =			0;
	let y =			0;

	while(len--) {
		(x + x + list[len][1]) <= MAXX ? x += list[len][1]: 
			x < list[len][1] && list[len][1] <= MAXX ?
				x = list[len][1]:
			list[len][1] > MAXX ? x = list[len][3] : false;
	
		z = list[len][2] ?? z;

		(y + y + list[len][3]) <= MAXY ? y += list[len][3]: 
			y < list[len][3] && list[len][3] <= MAXY ? y = list[len][3]:
			list[len][3] > MAXY ? y = list[len][3] : false;
	};
	return([x, z, y]);
};


function solveList(artList, crate) {
	if (!artList.length)
		return ;
	const size =		defineSizeCrate(artList);
	const crateFilled =	fillCrate(size, artList);
	const crateDone =	defineExternalSize(size, crateFilled);

	crate.push(crateDone);
	crate.push({ works: crateFilled });
	return (solveList(artList, crate));
};


export function addCub(list) {
	list.map(work => {
		const X =		work[1];
		const Z =		work[2];
		const Y =		work[3];
		const CMTOM =	1_000_000;

		work.push(+(X * Z * Y / CMTOM).toFixed(3));
	})
};


export function conventionalWorks (opt) {
	const list =		largestWorks();
	const { sorted } =	list;
	const innerCrate =	[];
	const backUp =	[];
	let works;
	let innerCopy;

	switch(opt) {
		case 1:
			works = common1;
			break ;
		case 2:
			works = common2;
			break ;
		case 3:
			works = common3;
			break ;
		case 4:
			works = common4;
			break ;
		case 5:
			works = sorted;
			break ;
	};

	innerCopy = [...works];
	solveList(works, innerCrate);
	solveList(innerCopy, backUp);
	return({ crates: innerCrate, backUp : backUp });
};

// addCub(standard4);
// conventionalWorks(5);

// ╭───────────────────────────╮
// │ Lergest canvas variables. │
// ╰───────────────────────────╯
export const canvas1 = [
	['22222', 260, 10, 260],
];

const largest1 = [
	['22222', 260, 10, 260],
];

export const canvas2 = [
	['22222', 260, 10, 260],
	['22207', 260, 10, 260],
];

const largest2 = [
	['22222', 260, 10, 260],
	['22207', 260, 10, 260],
];

export const canvas3 = [
	['22222', 260, 10, 260],
	['22207', 260, 10, 260],
	['22172', 260, 10, 260],
];

const largest3 = [
	['22222', 260, 10, 260],
	['22207', 260, 10, 260],
	['22172', 260, 10, 260],
];

export const canvas4 = [
	['22222', 260, 10, 300],
	['22207', 260, 10, 300],
	['22172', 260, 10, 300],
	['22172', 260, 10, 260],
];

const largest4 = [
	['22222', 260, 10, 300],
	['22207', 260, 10, 300],
	['22172', 260, 10, 300],
	['22172', 260, 10, 260],
];

export const canvas5 = [
	['22222', 360, 10, 300],
	['22207', 360, 10, 300],
	['22172', 360, 10, 300],
	['22222', 360, 10, 300],
	['22207', 260, 10, 300],
	['22172', 260, 10, 300],
	['22172', 260, 10, 260],
];

const largest5 = [
	['22222', 360, 10, 300],
	['22207', 360, 10, 300],
	['22172', 360, 10, 300],
	['22222', 360, 10, 300],
	['22207', 260, 10, 300],
	['22172', 260, 10, 300],
	['22172', 260, 10, 260],
];

// ╭─────────────────╮
// │ Tube variables. │
// ╰─────────────────╯
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

// ╭────────────╮
// │ No canvas. │
// ╰────────────╯
// ╭──────────────────────╮
// │ No canvas variables. │
// ╰──────────────────────╯
export const furniture0 = [
	['22126', 80, 80, 100],
];

export const furniture1 = [
	['22222', 80, 80, 100],
	['22207', 80, 80, 100],
	['22126', 80, 80, 100],
];

const sculptore0 = [
	['22126', 80, 80, 100],
];

const sculptore1 = [
	['22222', 80, 80, 100],
	['22207', 80, 80, 100],
	['22126', 80, 80, 100],
];

export const furniture2 = [
	['22222', 80, 80, 100],
	['22207', 80, 80, 100],
	['22126', 80, 80, 100],
	['22145', 80, 80, 70],
	['22314', 80, 80, 70],
	['22296', 80, 80, 70],
];

const sculptore2 = [
	['22222', 80, 80, 100],
	['22207', 80, 80, 100],
	['22126', 80, 80, 100],
	['22145', 80, 80, 70],
	['22314', 80, 80, 70],
	['22296', 80, 80, 70],
];

export const furniture3 = [
	['22222', 80, 80, 100],
	['22207', 80, 80, 100],
	['22126', 80, 80, 100],
	['22120', 80, 80, 100],
	['22206', 80, 80, 100],
	['22124', 80, 80, 100],
	['22145', 80, 80, 70],
	['22314', 80, 80, 70],
	['22296', 80, 80, 70],
	['22141', 80, 80, 70],
	['22309', 80, 80, 70],
	['22290', 80, 80, 70],
];

const sculptore3 = [
	['22222', 80, 80, 100],
	['22207', 80, 80, 100],
	['22126', 80, 80, 100],
	['22120', 80, 80, 100],
	['22206', 80, 80, 100],
	['22124', 80, 80, 100],
	['22145', 80, 80, 70],
	['22314', 80, 80, 70],
	['22296', 80, 80, 70],
	['22141', 80, 80, 70],
	['22309', 80, 80, 70],
	['22290', 80, 80, 70],
];

export const furniture4 = [
	['22222', 280, 180, 100],
	['22207', 280, 180, 100],
	['22126', 280, 180, 100],
];

const sculptore4 = [
	['22222', 280, 180, 100],
	['22207', 280, 180, 100],
	['22126', 280, 180, 100],
];

export const furniture5 = [
	['22222', 280, 180, 100],
	['22124', 80, 80, 100],
	['22145', 80, 80, 70],
	['22124', 80, 70, 90],
	['22145', 55, 80, 85],
];

const sculptore5 = [
	['22222', 280, 180, 100],
	['22124', 80, 80, 100],
	['22145', 80, 80, 70],
	['22124', 80, 70, 90],
	['22145', 55, 80, 85],
];


function defCrate(peces) {
	const LENLIMIT =	277;
	const PAD =			peces.length * 10;
	let x =				PAD;
	let z =				0;
	let y =				0;

	peces.map(item => {
		x +=	item[1];
		z =		item[2] > z ? item[2] : z;
		y =		item[3] > y ? item[3] : y;
	});
	if (x > LENLIMIT && peces.length % 2 === 0) {
		x /= 2;
		z *= 2;
	};
	return (setPad([x, z, y]));
};


function validationComp(val1, val2) {
	const MAXLEN =		277;
	const MAXDEPTH =	177;
	const MAXHEIGHT =	132;
	const compareX =	val1[1] === val2[1] && val1[1] < MAXLEN;
	const compareZ =	val1[2] === val2[2] && val1[2] < MAXDEPTH;
	const compareY =	val1[3] <= MAXHEIGHT;

	return (compareX && compareZ && compareY ? true : false);
};


function defineMaxWorks(items) {
	const PAD =			10;
	const MAXLEN =		554;
	const MAXDEPTH =	177;
	let x =				PAD * items.length;
	let z =				0;
	let equals =		0;

	items.map(art => {
		const compare =	validationComp(art, items[0]);
		const check1 =	art[2] - items[0][2];
		const check2 =	items[0][2] - art[2];
		
		if (compare === true)
			equals++;
		else if((check1 > 0 && check1 <= PAD) || (check2 > 0 && check2 <= PAD))
			equals++;
		x += art[1];
		z += art[3];
	});
	if (x < MAXLEN && z < MAXDEPTH)
		return(items.length);
	else if(items.length % 2 === 0) {
		if(x > MAXLEN && (z * 2) + PAD < MAXDEPTH)
			return(items.length);
		return(~~(MAXLEN / x * items.length));
	};
	return(equals === 0 || items[0][1] > MAXLEN ? 1 : equals);
};


function noCanvasTrail(list) {
	const crate =	[];
	let peces;

	while(list.length) {
		peces =		defineMaxWorks(list);
		peces =		list.splice(0, peces);
		if (peces.length > 0) {
			crate.push(defCrate(peces));
			crate.push({ works: peces });
		}
		else {
			crate.push(defCrate(list.splice(0, 1)));
			crate.push({ works: peces });
		};
	};
	return (crate);
};


export function provideNoCanvas(opt) {
	let crate;
	let noCanvas;

	switch(opt) {
		case 0:
			noCanvas = sculptore0;
			break ;
		case 1:
			noCanvas = sculptore1;
			break ;
		case 2:
			noCanvas = sculptore2;
			break ;
		case 3:
			noCanvas = sculptore3;
			break ;
		case 4:
			noCanvas = sculptore4;
			break ;
		case 5:
			noCanvas = sculptore5;
			break ;
	};
	crate =		{ crates: noCanvasTrail(noCanvas) };
	return (crate);
};

// provideNoCanvas(3);

// ╭───────────────────╮
// │ Same size canvas. │
// ╰───────────────────╯
// ╭──────────────────────╮
// │ Same size variables. │
// ╰──────────────────────╯

export const sameMeasure1 = [
	['22222', 80, 5, 50],
	['22207', 80, 5, 50],
	['22126', 80, 5, 50],
	['22172', 80, 5, 50],
];

const sameSize1 = [
	['22222', 80, 5, 50],
	['22207', 80, 5, 50],
	['22126', 80, 5, 50],
	['22172', 80, 5, 50],
];

export const sameMeasure2 = [
	['22222', 60, 5, 50],
	['22207', 60, 5, 50],
	['22172', 60, 5, 50],
	['22222', 60, 5, 50],
	['22207', 60, 5, 50],
	['22161', 60, 5, 50],
	['22172', 60, 5, 50],
	['22125', 60, 5, 50],
];

const sameSize2 = [
	['22222', 60, 5, 50],
	['22207', 60, 5, 50],
	['22172', 60, 5, 50],
	['22222', 60, 5, 50],
	['22207', 60, 5, 50],
	['22161', 60, 5, 50],
	['22172', 60, 5, 50],
	['22125', 60, 5, 50],
];

export const sameMeasure3 = [
	['22207', 90, 5, 80],
	['22155', 90, 5, 80],
	['22170', 90, 5, 80],
	['22163', 90, 5, 80],
	['22222', 90, 5, 70],
	['22207', 90, 5, 70],
	['22172', 90, 5, 70],
	['22222', 90, 5, 70],
];

const sameSize3 = [
	['22207', 90, 5, 80],
	['22155', 90, 5, 80],
	['22170', 90, 5, 80],
	['22163', 90, 5, 80],
	['22222', 90, 5, 70],
	['22207', 90, 5, 70],
	['22172', 90, 5, 70],
	['22222', 90, 5, 70],
];

export const sameMeasure4 = [
	['22207', 40, 5, 50],
	['22155', 40, 5, 50],
	['22170', 40, 5, 50],
	['22163', 40, 5, 50],
	['22198', 40, 5, 50],
	['22110', 40, 5, 50],
	['22129', 40, 5, 50],
	['22162', 40, 5, 50],
	['22222', 20, 5, 70],
	['22207', 20, 5, 70],
	['22172', 20, 5, 70],
	['22222', 20, 5, 70],
	['22218', 20, 5, 70],
	['22202', 20, 5, 70],
	['22167', 20, 5, 70],
	['22153', 20, 5, 70],
];

const sameSize4 = [
	['22207', 40, 5, 50],
	['22155', 40, 5, 50],
	['22170', 40, 5, 50],
	['22163', 40, 5, 50],
	['22198', 40, 5, 50],
	['22110', 40, 5, 50],
	['22129', 40, 5, 50],
	['22162', 40, 5, 50],
	['22222', 20, 5, 70],
	['22207', 20, 5, 70],
	['22172', 20, 5, 70],
	['22222', 20, 5, 70],
	['22218', 20, 5, 70],
	['22202', 20, 5, 70],
	['22167', 20, 5, 70],
	['22153', 20, 5, 70],
];

export const sameMeasure5 = [
	['22222', 50, 5, 50],
	['22169', 50, 5, 50],
	['22164', 50, 5, 50],
	['22138', 50, 5, 50],
	['22105', 50, 5, 50],
	['22131', 50, 5, 50],
	['22127', 50, 5, 50],
	['22001', 50, 5, 50],
	['22212', 50, 5, 50],
	['22163', 50, 5, 50],
	['22096', 50, 5, 50],
	['22138', 50, 5, 50],
	['22019', 50, 5, 50],
	['22083', 50, 5, 50],
	['22047', 50, 5, 50],
	['21992', 50, 5, 50],
];

const sameSize5 = [
	['22222', 50, 5, 50],
	['22169', 50, 5, 50],
	['22164', 50, 5, 50],
	['22138', 50, 5, 50],
	['22105', 50, 5, 50],
	['22131', 50, 5, 50],
	['22127', 50, 5, 50],
	['22001', 50, 5, 50],
	['22212', 50, 5, 50],
	['22163', 50, 5, 50],
	['22096', 50, 5, 50],
	['22138', 50, 5, 50],
	['22019', 50, 5, 50],
	['22083', 50, 5, 50],
	['22047', 50, 5, 50],
	['21992', 50, 5, 50],
];

function setPad(innerCrate) {
	const PAD =		23;
	const HIGHPAD =	28;
	const X =		innerCrate[0] + PAD;
	const Z =		innerCrate[1] + PAD;
	const Y =		innerCrate[2] + HIGHPAD;

	return([X, Z, Y]);
};


function checkComp(getter, test, baseLayer) {
	const checker =	getter.map(value => {
		const checkX = (value[0] + test[0]) <= baseLayer[0];
		const checkZ = (value[1] + test[1]) <= baseLayer[1];
		const checkY = (value[2] + test[2]) <= baseLayer[2];
		
		if (checkX && checkZ && checkY)
			return(value);
		return
	});

	if(checker[0] !== undefined)
		checker.map(size => getter.splice(getter.indexOf(size), 1));
	return(checker[0] !== undefined);
};


function tryComposeLayer(baseSize, list) {
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
			if(checkComp(getter, size, baseSize))
				return(size);
		}
		else
			getter.push(size);
	});
	return(compLayer[0] !== undefined);
};


function orderSizes(base, art) {
	const STACK =		base.shift();
	const PACKAGECM =	5;
	const LEN =			art.length === 1 ? art[0].length : art.length;
	let DEPTH;
	let x;
	let z;
	let y;

	if (STACK) {
		DEPTH =	(LEN % 2) + (LEN / 2);
		x =		base[0][0];
		z =		DEPTH * PACKAGECM;
		y =		base[0][2];
	}
	else {
		DEPTH =	(LEN % 2) + LEN;
		x =		base[0][0];
		z =		DEPTH * PACKAGECM;
		y =		base[0][2];
	};
	return (setPad([x, z, y]));
};


function increaseSizesStacking(base, newBase) {
	const extraSizes =	newBase.length > 3 ?
		[
			newBase[0][1],
			newBase[0][2],
			newBase[0][3],
		]:
		newBase;
	const LIMIT =		132;
	let x =				base[0][0];
	let z =				base[0][1];
	let y =				base[0][2] + extraSizes[2];
	let stack =			false;

	if (y > LIMIT && x < LIMIT) {
		[y, x] =	[x, y];
		stack =		true;
	}
	else if (y > base[0][2])
		stack =		true;
	return([stack, [x, z, y]]);
};


function compCrate(tracks) {
	const LIMITWORKS =	10;
	const crate =		[];
	let baseCrate;
	let comp;
	let works;

	while (tracks.length) {
		baseCrate =	tracks.splice(0, 1);
		works =		tracks.splice(0, tracks[0].length);
		tracks.length > 0 ? comp = tryComposeLayer(baseCrate, tracks) : false;
		if(comp) {
			baseCrate =	increaseSizesStacking(baseCrate, tracks.splice(0, 1));
			tracks[0].map(val => works[0][0].push(val));
			tracks.splice(0, tracks[0].length);
		}
		else {
			if(works[0].length > LIMITWORKS && (works[0].length % 2) === 0)
				baseCrate =	increaseSizesStacking(baseCrate, works[0]);
			else
				baseCrate.unshift(false);
		};
		crate.push(orderSizes(baseCrate, works));
		crate.push({ works: works });
	};
	return(crate);
};


function countWorks(peces) {
	let x =		peces[0][1];
	let z =		peces[0][2];
	let y =		peces[0][3];
	let sizes =	[[x, z, y]];
	let works =	[];

	peces.map(work => {
		if(work[1] !== x && work[3] !== y) {
			sizes.push([works]);
			x =	work[1];
			z =	work[2];
			y =	work[3];
			sizes.push([x, z, y]);
			works =	[];
		};
		works.push(work);
	});
	sizes.push(works);
	return(sizes);
};


function sameSizeTrail(list) {
	const countDiffSizes =	countWorks(list);
	const crateDone =		compCrate(countDiffSizes);

	return (crateDone);
};

export function provideSameSizeCanvas(opt) {
	let crate;
	let sameSize;
	let result;
	let backUp;
	let copy;

	switch(opt) {
		case 1:
			sameSize = sameSize1;
			break ;
		case 2:
			sameSize = sameSize2;
			break ;
		case 3:
			sameSize = sameSize3;
			break ;
		case 4:
			sameSize = sameSize4;
			break ;
		case 5:
			sameSize = sameSize5;
			break ;
	};
	copy =		[...sameSize];
	result =	sameSizeTrail(sameSize);
	backUp =	sameSizeTrail(copy);
	crate =		{ crates : result, backUp : backUp };
	sameSize =	null;
	copy =		null;
	return (crate);
};


// ╭─────────────────╮
// │ Largest canvas. │
// ╰─────────────────╯

function setPadding(innerCrate, layers) {
	const PAD =		23;
	const HIGHPAD =	28;
	const LAYER =	10;
	const X =		innerCrate[1] + PAD;
	const Z =		(innerCrate[2] + PAD) + (LAYER * layers);
	const Y =		innerCrate[3] + HIGHPAD;

	return ([X, Z, Y]);
};


function pitagorasTheorem(crate) {
	const MAXHEIGHT =	240;
	const a =			crate[2] ** 2;
	const b =			MAXHEIGHT ** 2;
	const c =			a > b ? a - b : b - a;
	const z =			~~(Math.sqrt(c) * 100) / 100;

	return ([crate[0], z, MAXHEIGHT]);
};


function defineCrate(canvas) {
	let biggestWork = canvas[0];
	let crate;

	canvas.map(work => {
		if (work[1] > biggestWork[1] && work[3] > biggestWork[3])
			biggestWork = work;
	});
	crate = setPadding(biggestWork, canvas.length);

	return(crate);
};


function crateInterface (opt, works) {
	let crate;
	let pitagorasCrate;

	switch (opt){
		case 1:
			crate =				defineCrate(works);
			pitagorasCrate =	pitagorasTheorem(crate);
			return(pitagorasCrate);
		case 2:
			crate =				defineCrate(works);
			pitagorasCrate =	pitagorasTheorem(crate);
			return(pitagorasCrate);
		case 3:
			crate =				defineCrate(works);
			pitagorasCrate =	pitagorasTheorem(crate);
			return(pitagorasCrate);
	};
};


function largestCrateTrail(list) {
	const MAXCANVAS =	3;
	let crates =		[];
	let canvas;

	while (list.length) {
		canvas = list.splice(0, MAXCANVAS);
		crates.push(crateInterface(canvas.length, canvas));
		crates.push({ works: canvas });
	};
	return(crates);
};


export function provideLargestCanvas(opt) {
	let largest;
	let crate = [];

	switch(opt) {
		case 1:
			largest = largest1;
			break ;
		case 2:
			largest = largest2;
			break ;
		case 3:
			largest = largest3;
			break ;
		case 4:
			largest = largest4;
			break ;
		case 5:
			largest = largest5;
			break ;
	};
	crate = { crates: largestCrateTrail(largest) };
	largest = null;
	return (crate);
};


// ╭──────────────╮
// │ Tube crater. │
// ╰──────────────╯
function sizeComposer() {
	let x = this[0][1];
	let z = this[0][2];
	let y = 0;
	
	this.map(tube => {
		x = tube[1] > x ? tube[1] : x;
		z = tube[2] > z ? tube[2] : z;
		y += tube[3];
	});
	return([x, z, y]);
};


function setSizes(pad, highPad){
	const X = this[0] + pad;
	const Z = this[1] + pad;
	const Y = this[2] + highPad;

	return([X, Z, Y]);
};


function oneTubeCrate() {
	const DEFAULTPAD =	18;
	const HEIGHTPAD =	25;
	const X =			this[0][1] + DEFAULTPAD;
	const Z =			this[0][2] + DEFAULTPAD;
	const Y =			this[0][3] + HEIGHTPAD;

	return ([X, Z, Y]);
};

function TubeCrate() {
	const DEFAULTPAD =	18;
	const HEIGHTPAD =	25;
	const baseSize =	sizeComposer.call(this);

	return (setSizes.call(baseSize, DEFAULTPAD, HEIGHTPAD));
};


function interfaceTubeCrates(opt, tubes) {
	switch(opt) {
		case 1:
			return(oneTubeCrate.call(tubes));
		case 2:
			return(TubeCrate.call(tubes));
		case 3:
			return(TubeCrate.call(tubes));
		case 4:
			return(TubeCrate.call(tubes));
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

	if(tubes.length > 4)
		return(crateTubesOpt(tubes));
	else
		crate = crateTubesOpt(tubes); 
	tubes = null;
	return (crate);
};


// ╭──────────────────────────────────────────────────────────────╮
// │ Bellow you will find all mock functions to 'Arranger' class. │
// ╰──────────────────────────────────────────────────────────────╯

export function artList() {
	return (list);
};


export function artWorksList(works) {
	const arts =	works ?? list;
	const artList =	arts.map(work => {
		return(new ArtWork(work[0], work[1], work[2], work[3]));
	});

	return(artList);
};


export function findTubesTest (works) {
	const list =			largestWorks(works);
	const { noCanvas } =	list;
	const tubes =			noCanvas.filter(pece => {
		if(pece[1] !== pece[2] && pece[2] === pece[3])
			return(pece);
		return;
	})

	tubes.map(art => list.noCanvas.splice(list.noCanvas.indexOf(art), 1));
	list.tubes = tubes;
	return (list);
};


export function findTubes (works) {
	const list =			largestWorks(works);
	const { noCanvas } =	list;
	const tubes =			noCanvas.filter(pece => {
		if(pece[1] !== pece[2] && pece[2] === pece[3])
			return(pece);
		return;
	})

	tubes.map(art => list.noCanvas.splice(list.noCanvas.indexOf(art), 1));
	list.tubes = tubes;
	return (Object.assign(Arranger, { list }));
};


export function largestWorks (works) {
	const list =			noCanvasOut(works);
	const { sorted } =		list;
	const MAXHEIGHT = 220;
	const largestCanvas =	sorted.filter(work => {
		if (work[1] > MAXHEIGHT || work[3] > MAXHEIGHT)
			return (work);
		return ;
	});

	largestCanvas.map(canvas => {
		list.sorted.splice(list.sorted.indexOf(canvas), 1);
	});
	list.largest = largestCanvas;
	return(list);
};


export function noCanvasOut (works) {
	const list =					lessSameSize(works);
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


export function lessSameSize(works) {
	const sortedWorks =	quickSortResult(works);
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


export function quickSortResult(works) {
	const gc =			new WeakSet();
	const CUBEDVALUE =	4;
	const cubedList =	artWorksCubed(works);
	const result =		quickSort(cubedList, CUBEDVALUE);

	gc.add(cubedList);
	return ({sorted: result});
};


function quickSort(list, pos) {
	if (list.length <= 1)
		return (list);

	const left =	[];
	const pivot =	list.splice(0, 1);
	const right =	[];
	let i =			0;

	for (i in list)
		list[i][pos] <= pivot[0][pos] ? left.push(list[i]): right.push(list[i]);
	return(quickSort(left, pos).concat(pivot, quickSort(right, pos)));
};


export function artWorksCubed(works) {
	const arts =		works ?? artWorksList();
	const cubedList =	arts.map(work => {
		const cub = work.arr;
		cub.push(work.cubed)
		return(cub);
	})
	
	return (cubedList);
};
