
import ArtWork from "../www/app/front-modules/Art.class.def.mjs";
import { describe, it } from 'node:test';
import assert from 'node:assert';


describe("Art work class tests to verify all methods implemented", () => {
	it("Test-1: returns the cubic calculation made by air companies.", () => {
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
