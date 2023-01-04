import * as extra from "../public/core/extras.math.mjs";
import { describe, it } from 'node:test';
import assert from 'node:assert';
import ArtWork from "../public/front-modules/classes.def.mjs";


describe ("Extra math tests to verify the correct returns", () => {
	it("Test-1: returns the \"a\" value in the pitagoras equation.", () => {
		let a = 0;
		let b = 100;
		let c = 90;
		const current = extra.pitagoras(a, b, c);
		const expected = 134.53;
		
		assert.strictEqual(current, expected);
	});

	it("Test-2: returns the \"b\" value in the pitagoras equation.", () => {
		let a = 100;
		let b = 0;
		let c = 90;
		const current = extra.pitagoras(a, b, c);
		const expected = 43.58;
		
		assert.strictEqual(current, expected);
	});

	it("Test-3: returns the \"c\" value in the pitagoras equation.", () => {
		let a = 100;
		let b = 90;
		let c = 0;
		const current = extra.pitagoras(a, b, c);
		const expected = 43.58;

		assert.strictEqual(current, expected);
	});

	it("Test-4: converts the centimeters sizes to inches.", () => {
		const current = extra.convertCmToIn(
			[new ArtWork("000111", "100", "10", "100")]
		);
		const expected = [new ArtWork("000111", "39", "3.9", "39")];

		assert.strict(current, expected);
	});

	it("Test-5: converts the iches sizes to centimeters.", () => {
		const current = extra.convertInToCm(
			[new ArtWork("000111", "39", "3.9", "39")]
		);
		const expected = [new ArtWork("000111", "100", "10", "100")];

		assert.strict(current, expected);
	});
});
