import { describe, it } from 'node:test';
import assert from 'node:assert';
import CraterStandard from '../otto/app/core2/Crater.standard.crate.mjs';
import * as mock from './mock.artworks.mjs';
import Arranger from '../otto/app/core2/Arranger.class.mjs';

describe("The are test to Standard Crate solver.", () => {
	it("TEST-01: returns false object to no list input to the class.", () => {
		const current =		new CraterStandard();
		const expected =	{ standard: false };

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-02: returns 3 crates as a result array with length of 6.", () => {
		const current =		new CraterStandard(structuredClone(mock.standard1), true, 4, false).crates.length;
		const expected =	6;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-03: returns 1 crate with 5 layers.", () => {
		const current =		new CraterStandard(structuredClone(mock.standard2), true, 4, false).crates[1].works.length;
		const expected =	5;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-04: returns 1 crates as result an array with length of 2.", () => {
		const current =		new CraterStandard(mock.standard3, true, 4, false).crates.length;
		const expected =	2

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-05: returns 1 crates as result an array length of 2.", () => {
		const current =		new CraterStandard(structuredClone(mock.standard4), true, 4, false).crates.length;
		const expected =	2;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-06: returns 3 crates as a result an array with length 6.", () => {
		const { sorted } =	mock.findTubesTest();
		const current =		new CraterStandard(sorted, true, 4, false).crates.length;
		const expected =	6;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-07: .", () => {
		const { list } =	new Arranger(mock.artWorksList(mock.standard6));
		const current =		new CraterStandard(list.sorted, true, 4, false).crates[0];
		const expected =	[123, 65.5, 128];

		console.log(current)
		assert.deepStrictEqual(current, expected);
	});
});
