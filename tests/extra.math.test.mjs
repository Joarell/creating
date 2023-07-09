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
		let b = 			0;
		let c = 			90;
		const current =		extra.pitagoras(a, b, c);
		const expected =	43.58;
		
		assert.strictEqual(current, expected);
	});

	it("Test-3: returns the \"c\" value in the pitagoras equation.", () => {
		let a =				100;
		let b = 			90;
		let c = 			0;
		const current =		extra.pitagoras(a, b, c);
		const expected =	43.58;

		assert.strictEqual(current, expected);
	});

	it("Test-4: returns error sending a string to pitagoras.", () => {
		let a =				"100";
		let b = 			90;
		let c = 			0;
		const current =		extra.pitagoras(a, b, c);
		const expected =	false;

		assert.strictEqual(current, expected);
	});

	it("Test-5: returns error sending a string to pitagoras.", () => {
		let a =				100;
		let b = 			"90";
		let c = 			0;
		const current =		extra.pitagoras(a, b, c);
		const expected =	false;

		assert.strictEqual(current, expected);
	});

	it("Test-6: returns error sending a string to pitagoras.", () => {
		let a =				100;
		let b = 			90;
		let c = 			"0";
		const current =		extra.pitagoras(a, b, c);
		const expected =	false;

		assert.strictEqual(current, expected);
	});

	it("Test-7: returns error sending a string to pitagoras.", () => {
		let a =				"100";
		let b = 			"90";
		let c = 			"0";
		const current =		extra.pitagoras(a, b, c);
		const expected =	false;

		assert.strictEqual(current, expected);
	});
});

