
import Crater from '../www/app/core2/Crater.class.mjs';
import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as mock from './mock.artworks.mjs';
import Arranger from '../www/app/core2/Arranger.class.mjs';
import CraterTube from '../www/app/core2/Crater.tube.crate.mjs';


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
	
		console.log(current, 'and', expected);
		assert.deepStrictEqual(current, expected);
	});
});
