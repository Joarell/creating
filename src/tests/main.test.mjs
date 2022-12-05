import { regValid, intParser, checkWork } from '../public/main.mjs';
import { describe, it } from 'node:test'
import assert from 'node:assert';
import ArtWork from '../public/front-modules/classes.def.mjs';

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

	it("Test-7: it should return 1 to parse string to int.", () => {
		let sizes = [1, 2, 3];
		sizes = regValid(sizes) ;
		const current = sizes[0];
		const expected = 1;

		assert.strictEqual(current, expected);
	});

	it("Test-8: it should return 2 to parse string to int.", () => {
		let sizes = [1, 2, 3];
		sizes = regValid(sizes) ;
		const current = sizes[1];
		const expected = 2;

		assert.strictEqual(current, expected);
	});

	it("Test-9: it should return 3 to parse string to int.", () => {
		let sizes = [1, 2, 3];
		sizes = regValid(sizes) ;
		const current = sizes[2];
		const expected = 3;

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

	it("Test-13: it should return a ArtWork objectt.", () => {
		const current = checkWork(["1111", "10", "03", "10"]);
		const expected = new ArtWork( "1111", 10, 3, 10,);
		
		assert.deepStrictEqual(current, expected);
	});

	it("Test-14: it should return a false", () => {
		const current = checkWork(["1111", "a", "03", "10"]);
		const expected = false;
		
		assert.deepStrictEqual(current, expected);
	});

	it("Test-15: it should return a false", () => {
		const current = checkWork(["1111", "10", "b", "10"]);
		const expected = false;
		
		assert.deepStrictEqual(current, expected);
	});

	it("Test-16: it should return a false", () => {
		const current = checkWork(["1111", "10", "03", "c"]);
		const expected = false;
		
		assert.deepStrictEqual(current, expected);
	});

	it("Test-17: it should return a false", () => {
		const current = checkWork(["1111", "a", "b", "c"]);
		const expected = false;
		
		assert.deepStrictEqual(current, expected);
	});
});

