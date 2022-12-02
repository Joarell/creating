import { intParser, regValid } from '../public/main.mjs';
import { describe, it } from 'node:test'
import assert from 'node:assert';

describe ("Main tests to call all other functions in the front end", () => {
	it("Test-1: it should return true to parse string to int.", () => {
		let sizes = ["1", "2", "3"];
		sizes = intParser(sizes);
		const current = Number.isSafeInteger(sizes[0]);
		const expected = true;

		assert.strictEqual(current, expected);
	});

	it("Test-2: it should return true to parse string to int.", () => {
		let sizes = ["1", "2", "3"];
		sizes = intParser(sizes);
		const current = Number.isSafeInteger(sizes[1]);
		const expected = true;

		assert.strictEqual(current, expected);
	});

	it("Test-3: it should return true to parse string to int.", () => {
		let sizes = ["1", "2", "3"];
		sizes = intParser(sizes);
		const current = Number.isSafeInteger(sizes[2]);
		const expected = true;

		assert.strictEqual(current, expected);
	});

	it("Test-4: it should return true to parse string to int.", () => {
		let sizes = ["a", "b", "c"];
		sizes = intParser(sizes);
		const current = Number.isSafeInteger(sizes[0]);
		const expected = false;

		assert.strictEqual(current, expected);
	});

	it("Test-5: it should return false to parse string to int.", () => {
		let sizes = ["a", "b", "c"];
		sizes = intParser(sizes);
		const current = Number.isSafeInteger(sizes[1]);
		const expected = false;

		assert.strictEqual(current, expected);
	});

	it("Test-6: it should return false to parse string to int.", () => {
		let sizes = ["a", "b", "c"];
		sizes = intParser(sizes);
		const current = Number.isSafeInteger(sizes[2]);
		const expected = false;

		assert.strictEqual(current, expected);
	});

	it("Test-7: it should return true to parse string to int.", () => {
		let sizes = [1, 2, 3];
		sizes = regValid(sizes) ;
		const current = sizes[0];
		const expected = true;

		assert.strictEqual(current, expected);
	});

	it("Test-8: it should return true to parse string to int.", () => {
		let sizes = [1, 2, 3];
		sizes = regValid(sizes) ;
		const current = sizes[1];
		const expected = true;

		assert.strictEqual(current, expected);
	});

	it("Test-9: it should return true to parse string to int.", () => {
		let sizes = [1, 2, 3];
		sizes = regValid(sizes) ;
		const current = sizes[2];
		const expected = true;

		assert.strictEqual(current, expected);
	});

	it("Test-10: it should return false to parse string to int.", () => {
		let sizes = ["a", 2, 3];
		const current = regValid(sizes);
		const expected = false;

		assert.strictEqual(current, expected);
	});

	it("Test-11: it should return false to parse string to int.", () => {
		let sizes = [1, "b", 3];
		const current = regValid(sizes);
		const expected = false;

		assert.strictEqual(current, expected);
	});

	it("Test-12: it should return false to parse string to int.", () => {
		let sizes = [1, 2, "c"];
		const current = regValid(sizes);
		const expected = false;

		assert.strictEqual(current, expected);
	});
});

