import Pipedo from'../www/app/core2/Pipedo.class.mjs';
import { describe, it } from 'node:test';
import assert from 'node:assert';


describe("These are test to the Pipedo class.", () => {
	it("Test-1: returns the paralellepiped object", () => {
		const pipedo =		new Pipedo("100", "5", "100");
		const current =		pipedo instanceof Pipedo;
		const expected =	true;

		assert.strictEqual(current, expected);
	});

	it("Test-2: returns an int to the 'x' measure.", () => {
		const pipedo =		new Pipedo("100", "5", "100");
		const current =		Number.isSafeInteger(pipedo.x);
		const expected =	true;

		assert.strictEqual(current, expected);
	});

	it("Test-3: returns an int to the 'z' measure.", () => {
		const pipedo =		new Pipedo("100", "5", "100");
		const current =		Number.isSafeInteger(pipedo.z);
		const expected =	true;

		assert.strictEqual(current, expected);
	});

	it("Test-4: returns an int to the 'y' measure.", () => {
		const pipedo =		new Pipedo("100", "5", "100");
		const current =		Number.isSafeInteger(pipedo.y);
		const expected =	true;

		assert.strictEqual(current, expected);
	});

	it("Test-5: returns false when pass empty data to the class.", () => {
		const current =		new Pipedo(" ");
		const error =		"Please, provide a correct x, z or y value.";
		const expected =	new TypeError(error);

		assert.deepStrictEqual(current, expected);
	});

	it("Test-6: returns false when pass only x to Pipedo class.", () => {
		const current =		new Pipedo("100");
		const error =		"Please, provide a correct x, z or y value.";
		const expected =	new TypeError(error);

		assert.deepStrictEqual(current, expected);
	});

	it("Test-7: returns false when pass only one value.", () => {
		const current =		new Pipedo("100", "5");
		const error =		"Please, provide a correct x, z or y value.";
		const expected =	new TypeError(error);

		assert.deepStrictEqual(current, expected);
	});

	it("Test-8: returns false when pass only 2 values.", () => {
		const current =		new Pipedo("100", "5");
		const error =		"Please, provide a correct x, z or y value.";
		const expected =	new TypeError(error);

		assert.deepStrictEqual(current, expected);
	});
})
