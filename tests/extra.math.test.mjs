import { artWorksList, artList } from "./mock.artworks.mjs";
import * as extra from "../www/app/core/extras.math.mjs";
import { describe, it } from 'node:test';
import assert from 'node:assert';


describe ("Extra math tests to verify the correct returns", () => {
	it("Test-1: returns the \"a\" value in the pitagoras equation.", () => {
		let a =				0;
		let b =				100;
		let c =				90;
		const current =		extra.pitagoras(a, b, c);
		const expected =	134.53;
		
		assert.strictEqual(current, expected);
	});

	it("Test-2: returns the \"b\" value in the pitagoras equation.", () => {
		let a =				100;
		let b =				0;
		let c =				90;
		const current =		extra.pitagoras(a, b, c);
		const expected =	43.58;
		
		assert.strictEqual(current, expected);
	});

	it("Test-3: returns the \"c\" value in the pitagoras equation.", () => {
		let a =				100;
		let b =				90;
		let c =				0;
		const current =		extra.pitagoras(a, b, c);
		const expected =	43.58;

		assert.strictEqual(current, expected);
	});

	it("Test-4: returns the \"c\" value in the pitagoras equation.", () => {
		let a =				100;
		let b =				90;
		let c =				0;
		const current =		extra.pitagoras(a, b, c);
		const expected =	43.58;

		assert.strictEqual(current, expected);
	});

	it("Test-5: returns false from pitagoras equation.", () => {
		let a =				"100";
		let b =				90;
		let c =				0;
		const current =		extra.pitagoras(a, b, c);
		const expected =	false;

		assert.strictEqual(current, expected);
	});

	it("Test-6: returns false from pitagoras equation.", () => {
		let a =				100;
		let b =				"90";
		let c =				0;
		const current =		extra.pitagoras(a, b, c);
		const expected =	false;

		assert.strictEqual(current, expected);
	});

	it("Test-7: returns false from pitagoras equation.", () => {
		let a =				100;
		let b =				90;
		let c =				"0";
		const current =		extra.pitagoras(a, b, c);
		const expected =	false;

		assert.strictEqual(current, expected);
	});

	it("Test-8: returns false from pitagoras equation.", () => {
		let a =				"100";
		let b =				"90";
		let c =				"0";
		const current =		extra.pitagoras(a, b, c);
		const expected =	false;

		assert.strictEqual(current, expected);
	});

	it("Test-9: returns false from pitagoras equation.", () => {
		let a =				100;
		let b =				"90";
		let c =				"0";
		const current =		extra.pitagoras(a, b, c);
		const expected =	false;

		assert.strictEqual(current, expected);
	});

	it("Test-10: returns false from pitagoras equation.", () => {
		let a =				"100";
		let b =				90;
		let c =				"0";
		const current =		extra.pitagoras(a, b, c);
		const expected =	false;

		assert.strictEqual(current, expected);
	});

	it("Test-11: returns false from pitagoras equation.", () => {
		let a =				"100";
		let b =				"90";
		let c =				0;
		const current =		extra.pitagoras(a, b, c);
		const expected =	false;

		assert.strictEqual(current, expected);
	});

	it("Test-12: returns false from cubing.", () => {
		let a =				"100";
		let b =				"90";
		let c =				"0";
		const current =		extra.cubing(["code", a, b, c]);
		const expected =	false;

		assert.strictEqual(current, expected);
	});

	it("Test-13: returns false from cubing.", () => {
		let a =				100;
		let b =				"90";
		let c =				"0";
		const current =		extra.cubing(["code", a, b, c]);
		const expected =	false;

		assert.strictEqual(current, expected);
	});

	it("Test-14: returns false from cubing.", () => {
		let a =				"100";
		let b =				90;
		let c =				"0";
		const current =		extra.cubing(["code", a, b, c]);
		const expected =	false;

		assert.strictEqual(current, expected);
	});

	it("Test-15: returns false from cubing.", () => {
		let a =				"100";
		let b =				"90";
		let c =				0;
		const current =		extra.cubing(["code", a, b, c]);
		const expected =	false;

		assert.strictEqual(current, expected);
	});

	it("Test-16: returns false from cubing.", () => {
		let a =				100;
		let b =				5;
		let c =				100;
		const current =		extra.cubing(["code", a, b, c]);
		const expected =	0.05;

		assert.strictEqual(current, expected);
	});

	it("Test-17: returns the biggest work on the list.", () => {
		const current =		extra.big_work(artList()); 
		// ['88800', 70, 70, 70] || ['230202', 70, 70, 70]
		const expected =	0.343;

		assert.strictEqual(current, expected);
	});

	it("Test-18: returns false from bigWork.", () => {
		const current =		extra.big_work(""); 
		const expected =	false;

		assert.strictEqual(current, expected);
	});

	it("Test-19: returns false from bigWork.", () => {
		const current =		extra.big_work([["TEST"]]); 
		const expected =	false;

		assert.strictEqual(current, expected);
	});

	it("Test-20: returns false from bigWork.", () => {
		const current =		extra.big_work("TEST"); 
		const expected =	false;

		assert.strictEqual(current, expected);
	});
});
