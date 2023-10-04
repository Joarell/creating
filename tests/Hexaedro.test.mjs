import Hexaedro from'../otto/app/core2/Hexaedro.class.mjs';
import { describe, it } from 'node:test';
import assert from 'node:assert';


describe("These are test to the Hexaedro class.", () => {
	it("Test-1: returns the paralellepiped object", () => {
		const hexa =		new Hexaedro("100", "5", "100");
		const current =		hexa instanceof Hexaedro;
		const expected =	true;

		assert.strictEqual(current, expected);
	});

	it("Test-2: returns an int to the 'x' measure.", () => {
		const hexa =		new Hexaedro("100", "5", "100");
		const current =		Number.isSafeInteger(hexa.x);
		const expected =	true;

		assert.strictEqual(current, expected);
	});

	it("Test-3: returns an int to the 'z' measure.", () => {
		const hexa =		new Hexaedro("100", "5", "100");
		const current =		Number.isSafeInteger(hexa.z);
		const expected =	true;
	
		assert.strictEqual(current, expected);
	});
	
	it("Test-4: returns an int to the 'y' measure.", () => {
		const hexa =		new Hexaedro("100", "5", "100");
		const current =		Number.isSafeInteger(hexa.y);
		const expected =	true;
	
		assert.strictEqual(current, expected);
	});
	
	it("Test-5: returns false when pass empty data to the class.", () => {
		const current =		new Hexaedro(" ");
		const error =		"Please, provide a correct x, z or y value.";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("Test-6: returns false when pass only x to Hexaedro class.", () => {
		const current =		new Hexaedro("100");
		const error =		"Please, provide a correct x, z or y value.";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("Test-7: returns false when pass only one value.", () => {
		const current =		new Hexaedro("100", "5");
		const error =		"Please, provide a correct x, z or y value.";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("Test-8: returns false when pass only 2 values.", () => {
		const current =		new Hexaedro("100", "5");
		const error =		"Please, provide a correct x, z or y value.";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
})
