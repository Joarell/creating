import ArtWork from '../www/app/core2/ArtWork.class.mjs'
import Pipedo from '../www/app/core2/Pipedo.class.mjs'
import { describe, it } from 'node:test';
import assert from 'node:assert';


describe("Testing the Artwork class:", () => {
	it("Test-1: returns the artwork object.", () => {
		const pipedo =		new Pipedo("180", "5", "120");
		const art =			new ArtWork('001', pipedo);
		const current =		art instanceof ArtWork;
		const expected =	true;

		assert.strictEqual(current, expected);
	});

	it("Test-2: returns false to none Pipedo value is passed through.", () => {
		const pipedo =		new Pipedo();
		const current =		new ArtWork('001', pipedo);
		const error =		"Please, provide a correct Pipedo class object.";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("Test-3: returns false when code value is passed through.", () => {
		const pipedo =		new Pipedo("180", "5", "120");
		const current =		new ArtWork(' ', pipedo);
		const error =		`Please, provide a valid code. Current:  `;
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("Test-4: returns false when none code value is passed through.", () => {
		const pipedo =		new Pipedo("180", "5", "120");
		const current =		new ArtWork('', pipedo);
		const error =		`Please, provide a valid code. Current: `;
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("Test-5: returns the array of the artwork.", () => {
		const pipedo =		new Pipedo("180", "5", "120");
		const art =			new ArtWork('001', pipedo);
		const current =		Array.isArray(art.arr);
		const expected =	true;
	
		assert.strictEqual(current, expected);
	});
	
	it("Test-6: returns cubed value as air company calculation.", () => {
		const pipedo =		new Pipedo("180", "5", "120");
		const art =			new ArtWork('001', pipedo);
		const current =		art.cAir;
		const expected =	18;
	
		assert.strictEqual(current, expected);
	});
	
	it("Test-7: returns undefined to cubed air company calculation.", () => {
		const pipedo =		new Pipedo("a", "5", "120");
		const art =			new ArtWork('001', pipedo);
		const current =		art.cAir;
		const expected =	undefined;
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("Test-8: returns false to cubed air company calculation.", () => {
		const pipedo =		new Pipedo("100", "a", "120");
		const art =			new ArtWork('001', pipedo);
		const current =		art.cAir;
		const expected =	undefined;
	
		assert.strictEqual(current, expected);
	});
	
	it("Test-9: returns false to cubed air company calculation.", () => {
		const pipedo =		new Pipedo("100", "5", "-");
		const art =			new ArtWork('001', pipedo);
		const current =		art.cAir;
		const expected =	undefined;
	
		assert.strictEqual(current, expected);
	});
	
	it("Test-10: returns the cubic calculation.", () => {
		const pipedo =		new Pipedo("180", "5", "120");
		const art =			new ArtWork('001', pipedo);
		const current =		art.cubed;
		const expected =	0.108;
	
		assert.strictEqual(current, expected);
	});
	
	it("Test-11: returns false to cubic calculation.", () => {
		const pipedo =		new Pipedo("a", "5", "120");
		const art =			new ArtWork('001', pipedo);
		const current =		art.cubed;
		const expected =	undefined;
	
		assert.strictEqual(current, expected);
	});
	
	it("Test-12: returns false to cubic calculation.", () => {
		const pipedo =		new Pipedo("180", "a", "120");
		const art =			new ArtWork('001', pipedo);
		const current =		art.cubed;
		const expected =	undefined;
	
		assert.strictEqual(current, expected);
	});
	
	it("Test-13: returns false to cubic calculation.", () => {
		const pipedo =		new Pipedo("180", "5", "a");
		const art =			new ArtWork('001', pipedo);
		const current =		art.cubed;
		const expected =	undefined;
	
		assert.strictEqual(current, expected);
	});
});
