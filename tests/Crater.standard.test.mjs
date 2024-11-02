import { describe, it } from 'node:test';
import assert from 'node:assert';
import CraterStandard from '../otto/app/core2/Crater.standard.crate.mjs';
import * as mock from './mock.artworks.mjs';

describe("The are test to Standard Crate solver.", () => {
	it("TEST-01: returns false object to no list input to the class.", () => {
		const current =		new CraterStandard();
		const expected =	{ standard: false };

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-02: returns 2 crates as a result array with length of 4.", () => {
		const current =		new CraterStandard(structuredClone(mock.standard1), true, 4).crates.length;
		const expected =	4;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-03: returns 1 crate with 5 layers.", () => {
		const current =		new CraterStandard(structuredClone(mock.standard2), true, 4).crates[1].works.length;
		const expected =	5;

		console.log(current.crates)
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-04: returns 1 crates as result an array with length of 2.", () => {
		const current =		new CraterStandard(mock.standard3, true, 4).crates.length;
		const expected =	2

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-05: returns 1 crates as result an array length of 2.", () => {
		const current =		new CraterStandard(structuredClone(mock.standard4), true).crates.length;
		const expected =	2;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-06: returns 3 crates as a result an array with length 6.", () => {
		const { sorted } =	mock.findTubesTest();
		const current =		new CraterStandard(sorted, true, 4).crates.length;
		const expected =	6;

		assert.deepStrictEqual(current, expected);
	});
});
