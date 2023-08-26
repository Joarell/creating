import ArtWork from '../www/app/core2/ArtWork.class.mjs'
import { describe, it } from 'node:test';
import assert from 'node:assert';


describe("Testing the Artwork class:", () => {
	it("Test-1: returns the artwork object.", () => {
		const art =			new ArtWork('001', 180, 5, 120);
		const current =		art instanceof ArtWork;
		const expected =	true;
	
		assert.strictEqual(current, expected);
	});
	
	it("Test-2: returns false when code value is passed through.", () => {
		const current =		new ArtWork(' ', "180", "5", "120");
		const error =		`Please, provide a valid code. Current:  `;
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("Test-3: returns false when none code value is passed through.", () => {
		const current =		new ArtWork('', "180", "5", "120");
		const error =		`Please, provide a valid code. Current: `;
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("Test-4: returns the array of the artwork.", () => {
		const art =			new ArtWork('001', "180", "5", "120");
		const current =		Array.isArray(art.arr);
		const expected =	true;
	
		assert.strictEqual(current, expected);
	});
	
	it("Test-5: returns cubed value as air company calculation.", () => {
		const art =			new ArtWork('001', "180", "5", "120");
		const current =		art.cAir;
		const expected =	18;
	
		assert.strictEqual(current, expected);
	});
	
	it("Test-6: returns undefined to cubed air company calculation.", () => {
		const art =			new ArtWork('001', "a", "5", "120");
		const current =		art.cAir;
		const error =		"Not a valid entry to RegexChecker!";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("Test-7: returns false to cubed air company calculation.", () => {
		const art =			new ArtWork('001', 180, "a", 120);
		const current =		art.cAir;
		const error =		"Not a valid entry to RegexChecker!";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("Test-8: returns false to cubed air company calculation.", () => {
		const art =			new ArtWork('001', "180", "5", "-");
		const current =		art.cAir;
		const error =		"Not a valid entry to RegexChecker!";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("Test-9: returns the cubic calculation.", () => {
		const art =			new ArtWork('001', 180, 5, 120);
		const current =		art.cubed;
		const expected =	0.108;
	
		assert.strictEqual(current, expected);
	});
	
	it("Test-10: returns an Error to cubic calculation.", () => {
		const art =			new ArtWork('001', "a", "5", "120");
		const current =		art.cubed;
		const error =		"Not a valid entry to RegexChecker!";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("Test-11: returns an Error to cubic calculation.", () => {
		const art =			new ArtWork('001', "180", "a", "120");
		const current =		art.cubed;
		const error =		"Not a valid entry to RegexChecker!";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("Test-12: returns an Error to cubic calculation.", () => {
		const art =			new ArtWork('001', 180, 5, "a");
		const current =		art.cubed;
		const error =		"Not a valid entry to RegexChecker!";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});

	it("Test-13: returns an object with art work data.", () => {
		const art =			new ArtWork('001', 180, 5, 100);
		const current =		art.data;
		const expected =	{ code : '001', x : 180, z : 5, y : 100 };
	
		assert.deepStrictEqual(current, expected);
	});

	it("Test-14: returns the unit convertion from in to cm.", () => {
		const current =		new ArtWork('001', 70.866, 1.968, 39.370).autoConvert;
		const expected =	[ '001', 180., 5, 100 ];
	
		assert.deepStrictEqual(current, expected);
	});
});
