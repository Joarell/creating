import Crater from '../otto/app/core2/Crater.class.mjs';
import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as mock from './mock.artworks.mjs';
import CraterTube from '../otto/app/core2/Crater.tube.crate.mjs';
import CraterPythagoras from '../otto/app/core2/Crater.largest.canvas.mjs';
import CraterSameSize from '../otto/app/core2/Crater.same.size.mjs';
import CraterNotCanvas from '../otto/app/core2/Crater.no.canvas.mjs';
import CraterStandard from '../otto/app/core2/Crater.standard.crate.mjs';
import Arranger from '../otto/app/core2/Arranger.class.mjs';

describe("These are tests to Crater class.", () => {
	it("TEST-1: returns false to no tube list.", () => {
		const current =		new CraterTube();
		const expected =	{ tube: false };

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-2: returns the crate to one rolled work.", () => {
		const current =		new CraterTube(structuredClone(mock.caseTube1));
		const expected =	mock.provideTubeCrate(structuredClone(mock.caseTube1));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-3: returns the crate to two rolled works.", () => {
		const current =		new CraterTube(structuredClone(mock.caseTube2));
		const expected =	mock.provideTubeCrate(structuredClone(mock.caseTube2));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-4: returns the crate to three rolled works.", () => {
		const current =		new CraterTube(structuredClone(mock.caseTube3));
		const expected =	mock.provideTubeCrate(structuredClone(mock.caseTube3));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-5: returns the crate to four rolled works.", () => {
		const current =		new CraterTube(structuredClone(mock.caseTube4));
		const expected =	mock.provideTubeCrate(structuredClone(mock.caseTube4));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-6: returns the crate to more then 4 rolled works.", () => {
		const current =		new CraterTube(structuredClone(mock.caseTube5));
		const expected =	mock.provideTubeCrate(structuredClone(mock.caseTube5));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-7: returns the crate to huge diameter rolled works.", () => {
		const current =		new CraterTube(structuredClone(mock.caseTube6));
		const expected =	mock.provideTubeCrate(structuredClone(mock.caseTube6));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-8: returns false object to no list passe to the class.", () => {
		const current =		new CraterPythagoras();
		const expected =	{ largest: false };

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-9: returns the Pythagoras crate to the list passed.", () => {
		const current =		new CraterPythagoras(structuredClone(mock.canvas1));
		const expected =	mock.provideLargestCanvas(structuredClone(mock.canvas1));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-10: returns the Pythagoras crate to the list passed.", () => {
		const current =		new CraterPythagoras(structuredClone(mock.canvas2));
		const expected =	mock.provideLargestCanvas(structuredClone(mock.canvas2));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-11: returns the Pythagoras crate to the list passed.", () => {
		const current =		new CraterPythagoras(structuredClone(mock.canvas3));
		const expected =	mock.provideLargestCanvas(structuredClone(mock.canvas3));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-12: returns the Pythagoras crate to the list passed.", () => {
		const current =		new CraterPythagoras(structuredClone(mock.canvas4));
		const expected =	mock.provideLargestCanvas(structuredClone(mock.canvas4));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-13: returns false object to no list passe to the class.", () => {
		const current =		new CraterSameSize();
		const expected =	{ sameSize: false };

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-14: returns the same size crate to the list passed.", () => {
		const current =		new CraterSameSize(structuredClone(mock.sameMeasure1));
		const expected =	mock.provideSameSizeCanvas(structuredClone(mock.sameMeasure1));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-15: returns the same size crate to the list passed.", () => {
		const current =		new CraterSameSize(structuredClone(mock.sameMeasure2));
		const expected =	mock.provideSameSizeCanvas(structuredClone(mock.sameMeasure2));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-16: returns the same size crate to the list passed.", () => {
		const current =		new CraterSameSize(structuredClone(mock.sameMeasure3));
		const expected =	mock.provideSameSizeCanvas(structuredClone(mock.sameMeasure3));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-17: returns the same size crate to the list passed.", () => {
		const current =		new CraterSameSize(structuredClone(mock.sameMeasure4));
		const expected =	mock.provideSameSizeCanvas(structuredClone(mock.sameMeasure4));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-18: returns false object to no list passe to the class.", () => {
		const current =		new CraterNotCanvas();
		const expected =	{ noCanvas: false };

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-19: returns one crate assuming 1 sculptures provided.", () => {
		const current =		new CraterNotCanvas(structuredClone(mock.furniture0));
		const expected =	mock.provideNoCanvas(structuredClone(mock.furniture0));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-20: returns one crate assuming 3 sculptures provided.", () => {
		const current =		new CraterNotCanvas(structuredClone(mock.furniture1));
		const expected =	mock.provideNoCanvas(structuredClone(mock.furniture1));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-21: returns one crate assuming 6 sculptures provided.", () => {
		const current =		new CraterNotCanvas(structuredClone(mock.furniture2));
		const expected =	mock.provideNoCanvas(structuredClone(mock.furniture2));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-22: returns the crate assuming 12 sculptures provided.", () => {
		const current =		new CraterNotCanvas(structuredClone(mock.furniture3));
		const expected =	mock.provideNoCanvas(structuredClone(mock.furniture3));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-23: returns the crate assuming huge sculptures provided.", () => {
		const current =		new CraterNotCanvas(structuredClone(mock.furniture4));
		const expected =	mock.provideNoCanvas(structuredClone(mock.furniture4));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-24: returns false object to mix sculptures input to the class.", () => {
		const current =		new CraterNotCanvas(structuredClone(mock.furniture5));
		const expected =	mock.provideNoCanvas(structuredClone(mock.furniture5));

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-25: returns false object to no list input to the class.", () => {
		const current =		new CraterStandard();
		const expected =	{ standard: false };

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-31: returns false to empty list.", () => {
		const current =		new Crater();
		let expected =		{ crater: false };

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-32: returns the Crater assign object.", () => {
		const works  =	new Arranger(mock.artWorksList());
		const current =	new Crater(works);

		assert.deepStrictEqual(current, Crater);
	});

	it("TEST-33: returns less sameSizeCrates and adds to the standards", () => {
		const works =		new Arranger(mock.artWorksList());
		const current =		new Crater(works).crates.sameSizeCrate;
		const expected =	mock.fakeCrater().crates.sameSizeCrate;

		assert.notEqual(current, expected);
	});

	it("TEST-34: returns only one sameSizeCrates and adds to the standards", () => {
		const works =		new Arranger(mock.artWorksList());
		const current =		new Crater(works)
		const expected =	mock.mockOptions().crates.sameSizeCrate;

		assert.notEqual(current, expected);
	});

	it("TEST-35: returns the sameSizeCrate backUp.", () => {
		const works =		new Arranger(mock.artWorksList());
		const current =		new Crater(works).crates.sameSizeCrate.backUp;
		const expected =	mock.mockOptions().crates.sameSizeCrate.backUp;

		assert.deepEqual(current, expected);
	});

	it("TEST-36: returns the standardCrate backUp.", () => {
		const works =		new Arranger(mock.artWorksList());
		const current =		new Crater(works).crates.standardCrate.backUp;
		const expected =	mock.mockOptions().crates.standardCrate.backUp;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-37: returns less 6 sameSizeCrates and adds to the standards", () => {
		const works =		new Arranger(mock.artWorksList());
		const current =		new Crater(works).crates.standardCrate;
		const expected =	mock.fakeCrater().crates.standardCrate;

		assert.notEqual(current, expected);
	});

	it("TEST-38: returns less 2 sameSizeCrates and adds to the standards.", () => {
		const list =	[
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
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works);
		const expected =	mock.fakeCrater().crates.standardCrate;

		assert.notEqual(current, expected);
	});

	it("TEST-39: returns tube undifined to the input list.", () => {
		const list =	[
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
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.tubeCrate;
		const expected =	undefined;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-40: returns largest undefined to the input list.", () => {
		const list =	[
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
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.largestCrate;
		const expected =	undefined;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-41: returns sameSizeCrate crates backup.", () => {
		const list =	[
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
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.sameSizeCrate;
		const expected =	mock.mockTest40;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-42: returns 2 crates to passed list as array length of 4.", () => {
		const list =	[
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
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.standardCrate.crates.length;
		const expected =	4;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-43: returns noCanvas undefined to the input list.", () => {
		const list =	[
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
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.noCanvasCrate;
		const expected =	undefined;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-44: returns the air cub total value.", () => {
		const list =	[
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
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.airCubTotal;
		const expected =	508.191;
		//const expected =	588.24;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-45: returns the air cub total value to the backUp crates.", () => {
		const list =	[
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
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.airCubTotalBackUp
		const expected =	508.191;
		//const expected =	588.24;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-46: returns the which air port setup to the backUp crates.", () => {
		const list =	[
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
		];
		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.whichAirPortBackUp;
		const expected =	[{ PAX: 1 }, { CARGO: 1 }];

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-47: returns the total crates air cube calculation.", () => {
		const works =		new Arranger(mock.artWorksList());
		const current =		new Crater(works).crates.airCubTotal;
		const expected =	mock.fakeCrater().crates.airCubTotal;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-48: returns the number of crate to PAX or Cargo airport.", () => {
		const works =		new Arranger(mock.artWorksList());
		const current =		new Crater(works).crates.whichAirPort;
		const expected =	mock.fakeCrater().crates.whichAirPort;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-49: returns empty array case 'crates' object not stays the same.", async () => {
		const list =	[
			['5908', 150, 5, 90],
			['8899', 120, 3, 100],
			['777', 50, 3, 50],
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
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates;
		const expected =	[];

		assert.notDeepEqual(current, expected);
	});

	it("TEST-50: test not equal case 'crates' object not stays the same.", () => {
		const list =	[
			['5908', 150, 5, 90],
			['8899', 120, 3, 100],
			['777', 50, 3, 50],
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
		];

		const works =		new Arranger(mock.artWorksList(list));
		const result =		new Crater(works);
		const current =		result.crates.standardCrate.backUp;
		const expected =	result.crates.standardCrate.crates;

		assert.notEqual(current, expected);
	});

	it("TEST-51: returns 1 pax crate and 1 cargo crate. ", () => {
		const list =	[
			['5908', 150, 5, 90],
			['8899', 120, 3, 100],
			['777', 50, 3, 50],
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
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.whichAirPort;
		const expected =	[{ PAX : 1 }, { CARGO : 1 }];

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-52: excludes the 'allCubTotalBackUp' and returns undefined.", () => {
		const list =	[
			['5908', 150, 5, 90],
			['8899', 120, 3, 100],
			['777', 50, 3, 50],
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
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.allCubTotalBackUp;
		const expected =	undefined;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-53: returns all crates done.", () => {
		const list =	[
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
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.allCrates
		const expected =	[
			[ 153, 43, 78, 85.527 ],
			[ 203, 83, 188, 527.935 ],
			[ 143, 96, 148, 338.624 ]
		];

		assert.notEqual(current, expected);
	});

	it("TEST-54: returns all crates and backUp crates done.", () => {
		const list =	[
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
		];

		const works =		new Arranger(mock.artWorksList(list));
		const result =		new Crater(works).crates
		const current =		result.allCrates;
		const expected =	result.allCratesBackUp;

		assert.notEqual(current, expected);
	});

	it("TEST-55: returns all crates and backUp crates done.", () => {
		const list =	[
			['5908', 100, 5, 100],
			['8899', 50, 5, 50],
			['777', 50, 5, 50],
			['8980', 40, 5, 40],
			['71234', 30, 5, 50],
			['71214', 50, 5, 30],
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.airCubTotal;
		const expected =	119.392;
		//const expected =	171.125;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-56: returns all works crate with adaptations needed.", () => {
		const list =	[
			['5908', 100, 5, 100],
			['8899', 100, 5, 50],
			['777', 50, 5, 50],
			['782', 50, 5, 50],
			['71214', 80, 5, 100],
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.airCubTotal;
		const expected =	119.392;
		//const expected =	178.432;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-57: returns all works crate with adaptations needed.", () => {
		const list = [
			['5908', 100, 5, 100],
			['5901', 100, 5, 50],
			['71214', 50, 5, 100],
			['8899', 70, 5, 50],
			['777', 50, 5, 50],
			['886', 40, 5, 50],
			['71210', 50, 5, 10],
			['782', 50, 5, 30],
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.airCubTotal;
		const expected =	139.072;
		//const expected =	178.432;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-58: returns all works in one crate.", () => {
		const list = [
			['5908', 200, 10, 100],
			['5901', 100, 5, 100],
			['5901', 100, 5, 100],
			['71219', 50, 5, 50],
			['71262', 50, 5, 50],
			['71279', 50, 5, 50],
			['71149', 50, 5, 50],
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.airCubTotal;
		const expected =	275.925;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-59: returns all works in one crate.", () => {
		const list = [
			['5908', 100, 5, 100],
			['5901', 100, 5, 50],
			['5901', 100, 5, 100],
			['71219', 50, 5, 50],
			['71279', 100, 5, 70],
			['71149', 50, 5, 50],
			['048', 100, 5, 30],
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.airCubTotal;
		const expected =	139.072;
		//const expected =	217.792;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-60: returns all works in one crate.", () => {
		const list = [
			['SF', 160, 5, 160],
			['HU-1989-20', 130, 5, 100],
			['HU-1989-10', 60, 5, 60],
			['HU-1989-02', 60, 5, 60],
			['HU-1989-16', 50, 3, 50],
			['HU-1989-16', 30, 3, 30],
			['HU-1989-11', 30, 3, 30],
			['HU-1989-03', 30, 3, 30],
			['HU-1989-04', 30, 3, 30],
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.airCubTotal;
		const expected =	289.332;
		//const expected =	217.792;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-61: returns false to no tube list.", () => {
		const list = [
			['SF', 160, 5, 160],
			['HU-19-20', 150, 5, 90],
			['HU-1989-20', 120, 5, 100],
			['HU-1989-10', 60, 5, 60],
			['HU-1923-15', 50, 3, 50],
			['HU-1989-16', 40, 3, 50],
			['HU-1989-11', 40, 3, 50],
			['HU-1989-03', 40, 3, 50],
			['HU-1989-04', 40, 3, 50],
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.airCubTotal;
		const expected =	346.437;
		//const expected =	217.792;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-62: returns false to no tube list.", () => {
		const list = [
			['SF', 160, 5, 160],
			['HU-19-20', 130, 5, 100],
			['HU-1989-20', 50, 5, 50],
			['HU-1989-10', 50, 5, 50],
			['HU-1923-15', 50, 3, 50],
			['HU-1989-66', 30, 3, 30],
			['HU-1989-17', 30, 3, 30],
			['HU-1989-02', 30, 3, 30],
			['HU-1989-07', 30, 3, 30],
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.airCubTotal;
		const expected =	277.425;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-63: returns false to no tube list.", () => {
		const list = [
			['SF', 160, 5, 160],
			['HU-19-20', 120, 5, 100],
			['HU-1989-20', 50, 5, 50],
			['HU-1989-10', 60, 5, 60],
			['HU-1923-15', 40, 3, 50],
			['HU-1989-66', 40, 3, 50],
			['HU-1989-17', 40, 3, 50],
			['HU-1989-02', 30, 3, 30],
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.airCubTotal;
		const expected =	289.332;
		//const expected =	217.792;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-64: returns false to no tube list.", () => {
		const list = [
			['SF', 160, 5, 160],
			['HU-19-20', 130, 5, 100],
			['HU-1989-20', 60, 5, 60],
			['HU-198923-20', 60, 5, 60],
			['HU-1982399-20', 40, 5, 50],
			['HU-82399-20', 30, 5, 30],
			['HU-829-20', 30, 5, 30],
			['HU-820989-20', 30, 4, 30],
			['HU-8209-20', 30, 4, 30],
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.airCubTotal;
		const expected =	289.332;
		//const expected =	217.792;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-65: returns false to no tube list.", () => {
		const list = [
			['SF', 160, 5, 160],
			['HU-19-20', 150, 5, 90],
			['HU-1989-20', 130, 5, 50],
			['HU-198923-20', 60, 5, 90],
			['HU-1982399-20', 60, 5, 60],
			['HU-82399-20', 60, 5, 60],
			['HU-829-20', 60, 5, 60],
			['HU-820989-20', 60, 4, 60],
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.airCubTotal;
		const expected =	346.437;
		//const expected =	217.792;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-66: returns false to no tube list.", () => {
		const list = [
			['SF', 214, 5, 214],
			['HU-19-20', 190, 5, 180],
			['HU-1989-20', 67, 5, 30],
			['HU-198923-20', 52, 5, 34],
			['HU-1982399-20', 49, 5, 34],
			['HU-82399-20', 46, 5, 36],
			['HU-829-20', 35, 7, 26],
		];

		const works =		new Arranger(mock.artWorksList(list));
		const current =		new Crater(works).crates.airCubTotal;
		const expected =	454.053;
		//const expected =	217.792;

		assert.deepStrictEqual(current, expected);
	});

});
