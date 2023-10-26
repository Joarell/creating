
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
	// it("TEST-48: returns the number of crate to PAX or Cargo airport.", () => {
	// 	const works =		new Arranger(mock.artWorksList());
	// 	const test =		new Crater(works);
	// 	const current =		new Crater(works).crates.wichAirPort;
	// 	const expected =	mock.fakeCrater().crates.wichAirPort;
	//
	// 	assert.deepStrictEqual(current, expected);
	// });

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
		const expected =	217.792;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-1: returns false to no tube list.", () => {
		const current =		new CraterTube();
		const expected =	{ tube: false };

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-2: returns the crate to one rolled work.", () => {
		const works =		mock.caseTube1;
		const current =		new CraterTube(works);
		const expected =	mock.provideTubeCrate(1);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-3: returns the crate to two rolled works.", () => {
		const works =		mock.caseTube2;
		const current =		new CraterTube(works);
		const expected =	mock.provideTubeCrate(2);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-4: returns the crate to three rolled works.", () => {
		const works =		mock.caseTube3;
		const current =		new CraterTube(works);
		const expected =	mock.provideTubeCrate(3);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-5: returns the crate to four rolled works.", () => {
		const works =		mock.caseTube4;
		const current =		new CraterTube(works);
		const expected =	mock.provideTubeCrate(4);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-6: returns the crate to more then 4 rolled works.", () => {
		const works =		mock.caseTube5;
		const current =		new CraterTube(works);
		const expected =	mock.provideTubeCrate(5);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-7: returns the crate to huge diameter rolled works.", () => {
		const works =		mock.caseTube6;
		const current =		new CraterTube(works);
		const expected =	mock.provideTubeCrate(6);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-8: returns false object to no list passe to the class.", () => {
		const current =		new CraterPythagoras();
		const expected =	{ largest: false };

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-9: returns the Pythagoras crate to the list passed.", () => {
		const largest =		mock.canvas1;
		const current =		new CraterPythagoras(largest);
		const expected =	mock.provideLargestCanvas(1);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-10: returns the Pythagoras crate to the list passed.", () => {
		const largest =		mock.canvas2;
		const current =		new CraterPythagoras(largest);
		const expected =	mock.provideLargestCanvas(2);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-11: returns the Pythagoras crate to the list passed.", () => {
		const largest =		mock.canvas3;
		const current =		new CraterPythagoras(largest);
		const expected =	mock.provideLargestCanvas(3);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-12: returns the Pythagoras crate to the list passed.", () => {
		const largest =		mock.canvas5;
		const current =		new CraterPythagoras(largest);
		const expected =	mock.provideLargestCanvas(5);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-13: returns false object to no list passe to the class.", () => {
		const current =		new CraterSameSize();
		const expected =	{ sameSize: false };

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-14: returns the same size crate to the list passed.", () => {
		const same =		mock.sameMeasure1;
		const current =		new CraterSameSize(same);
		const expected =	mock.provideSameSizeCanvas(1);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-15: returns the same size crate to the list passed.", () => {
		const same =		mock.sameMeasure2;
		const current =		new CraterSameSize(same);
		const expected =	mock.provideSameSizeCanvas(2);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-16: returns the same size crate to the list passed.", () => {
		const same =		mock.sameMeasure3;
		const current =		new CraterSameSize(same);
		const expected =	mock.provideSameSizeCanvas(3);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-17: returns the Pythagoras crate to the list passed.", () => {
		const same =		mock.sameMeasure5;
		const current =		new CraterSameSize(same);
		const expected =	mock.provideSameSizeCanvas(5);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-18: returns false object to no list passe to the class.", () => {
		const current =		new CraterNotCanvas();
		const expected =	{ noCanvas: false };

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-19: returns one crate assuming 1 sculptures provided.", () => {
		const same =		mock.furniture0;
		const current =		new CraterNotCanvas(same);
		const expected =	mock.provideNoCanvas(0);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-20: returns one crate assuming 4 sculptures provided.", () => {
		const same =		mock.furniture1;
		const current =		new CraterNotCanvas(same);
		const expected =	mock.provideNoCanvas(1);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-21: returns one crate assuming 6 sculptures provided.", () => {
		const same =		mock.furniture2;
		const current =		new CraterNotCanvas(same);
		const expected =	mock.provideNoCanvas(2);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-22: returns the crate assumin 12 sculptures provided.", () => {
		const same =		mock.furniture3;
		const current =		new CraterNotCanvas(same);
		const expected =	mock.provideNoCanvas(3);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-23: returns false object to no list input to the class.", () => {
		const same =		mock.furniture4;
		const current =		new CraterNotCanvas(same);
		const expected =	mock.provideNoCanvas(4);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-24: returns false object to no list input to the class.", () => {
		const same =		mock.furniture5;
		const current =		new CraterNotCanvas(same);
		const expected =	mock.provideNoCanvas(5);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-25: returns false object to no list input to the class.", () => {
		const current =		new CraterStandard();
		const expected =	{ standard: false };

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-26: returns 3 crates as a result of the list passed.", () => {
		const BACKUP =		true;
		const current =		new CraterStandard(mock.standard1, BACKUP);
		const expected =	mock.conventionalWorks(1);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-27: returns 1 crate with 5 layers.", () => {
		const BACKUP =		true;
		const current =		new CraterStandard(mock.standard2, BACKUP);
		const expected =	mock.conventionalWorks(2);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-28: returns 2 crates as result to the list passed.", () => {
		const BACKUP =		true;
		const current =		new CraterStandard(mock.standard3, BACKUP);
		const expected =	mock.conventionalWorks(3);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-29: returns 1 crates as result to the list passed.", () => {
		const BACKUP =		true;
		const current =		new CraterStandard(mock.standard4, BACKUP);
		const expected =	mock.conventionalWorks(4);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-30: returns 3 crates as a result of the sorted list.", () => {
		const BACKUP =		true;
		const { sorted } =	mock.findTubesTest();
		const current =		new CraterStandard(sorted, BACKUP);
		const expected =	mock.conventionalWorks(5);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-31: returns false to empty list.", () => {
		const current =		new Crater();
		let expected =		{ crater: false };

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-32: returns the Crater assign object.", () => {
		const works  =		new Arranger(mock.artWorksList());
		const test =		new Crater(works);
		const current =		test === Crater;
		let expected =		true;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-33: returns less sameSizeCrates and adds to the standards", () => {
		const works =		new Arranger(mock.artWorksList());
		const current =		new Crater(works).crates.sameSizeCrate;
		const expected =	mock.fakeCrater().crates.sameSizeCrate;

		assert.notEqual(current, expected);
	});

	it("TEST-34: returns less sameSizeCrates and adds to the standards", () => {
		const works =		new Arranger(mock.artWorksList());
		const current =		new Crater(works)
		const expected =	mock.mockOptios().crates.sameSizeCrate;

		assert.notEqual(current, expected);
	});

	it("TEST-35: returns the sameSizeCrate backUp.", () => {
		const works =		new Arranger(mock.artWorksList());
		const current =		new Crater(works).crates.sameSizeCrate.backUp;
		const expected =	mock.mockOptios().crates.sameSizeCrate.backUp;

		assert.deepEqual(current, expected);
	});

	it("TEST-36: returns the standardCrate backUp.", () => {
		const works =		new Arranger(mock.artWorksList());
		const current =		new Crater(works).crates.standardCrate.backUp;
		const expected =	mock.mockOptios().crates.standardCrate.backUp;

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

	it("TEST-42: returns 2 crates to passed list.", () => {
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
		const current =		new Crater(works).crates.standardCrate;
		const expected =	mock.mockTest41;

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
		const expected =	826.706;

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
		const expected =	826.706;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-46: returns the wich air port setup to the backUp crates.", () => {
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
		const current =		new Crater(works).crates.wichAirPortBackUp;
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
		const current =		new Crater(works).crates.wichAirPort;
		const expected =	mock.fakeCrater().crates.wichAirPort;

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
		const current =		new Crater(works).crates.sameSizeCrate.crates;
		const expected =	[];

		assert.deepStrictEqual(current, expected);
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

	it("TEST-51: returns the backUp airport crates to sameSize crate.", () => {
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
		const current =		new Crater(works).crates.wichAirPortBackUp;
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
		const expected =	178.432;

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
		const expected =	178.432;

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
		const expected =	178.432;

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
		const expected =	347.285;

		assert.deepStrictEqual(current, expected);
	});

});
