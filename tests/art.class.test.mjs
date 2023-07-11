import ArtWork from "../www/app/front-modules/Art.class.def.mjs";
import { describe, it } from 'node:test';
import assert from 'node:assert';


describe("Art work class tests to verify all methods implemented", () => {
	it("Test-1: returns a artwork object class.", () => {
		const art =			new ArtWork("098", "50", "5", "50");
		const current =		typeof(art);
		const expected =	'object';

		assert.deepEqual(current, expected);
	});

	it("Test-2: converts the string sizes to integers - x.", () => {
		const art =			new ArtWork("098", "50", "5", "50");
		const current =		Number.isSafeInteger(art.x);
		const expected =	true;

		assert.strictEqual(current, expected);
	});

	it("Test-3: converts the string sizes to integers - z.", () => {
		const art =			new ArtWork("098", "50", "5", "50");
		const current =		Number.isSafeInteger(art.z);
		const expected =	true;

		assert.strictEqual(current, expected);
	});

	it("Test-4: converts the string sizes to integers - y.", () => {
		const art =			new ArtWork("098", "50", "5", "50");
		const current =		Number.isSafeInteger(art.y);
		const expected =	true;

		assert.strictEqual(current, expected);
	});

	it("Test-5: returns the cubic air calculation.", () => {
		const art =			new ArtWork("098", "50", "5", "50");
		const current =		art.cAir();
		const expected =	2.083;

		assert.strictEqual(current, expected);
	});

	it("Test-6: returns the cubic calculation.", () => {
		const art =			new ArtWork("098", "50", "5", "50");
		const current =		art.cubed();
		const expected =	0.013;

		assert.strictEqual(current, expected);
	});

	it("Test-7: returns the conversion sizes - cm to in.", () => {
		const art =			new ArtWork("098", "50", "5", "50");
		const current =		art.conversion("in");
		const expected =	[127, 12.7, 127];

		assert.deepEqual(current, expected);
	});
	
	it("Test-8: returns the conversion sizes - in to cm.", () => {
		const art =			new ArtWork("098", "127", "12.7", "127");
		const current =		art.conversion("cm");
		const expected =	[50, 5, 50];

		assert.deepEqual(current, expected);
	});

	it("Test-9: returns the inch conversion sizes.", () => {
		const art =			new ArtWork("098", "127", "12.7", "127");
		const current =		art.conversion();
		const expected =	false;

		assert.deepEqual(current, expected);
	});

	it("Test-10: returns the array sizes.", () => {
		const art =			new ArtWork("098", "50", "5", "50");
		const current =		art.arr();
		const expected =	['098', 50, 5, 50];

		assert.deepEqual(current, expected);
	});

	it("Test-11: returns the array sizes.", () => {
		const art =			new ArtWork("098", "127", "12.7", "127");
		const current =		art.arr();
		const expected =	['098', 127, 12.7, 127];

		assert.deepEqual(current, expected);
	});
});
