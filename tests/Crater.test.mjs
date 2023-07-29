
import Crater from '../www/app/core2/Crater.class.mjs';
import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as mock from './mock.artworks.mjs';
import Arranger from '../www/app/core2/Arranger.class.mjs';
import CraterTube from '../www/app/core2/Crater.tube.crate.mjs';
import CraterPythagoras from '../www/app/core2/Crater.largest.canvas.mjs';


describe("These are test to Crater class.", () => {
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
		const largest =		mock.canvas4;
		const current =		new CraterPythagoras(largest);
		const expected =	mock.provideLargestCanvas(4);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-13: returns the Pythagoras crate to the list passed.", () => {
		const largest =		mock.canvas5;
		const current =		new CraterPythagoras(largest);
		const expected =	mock.provideLargestCanvas(5);
	
		console.log(current, 'and', expected);
		assert.deepStrictEqual(current, expected);
	});
});