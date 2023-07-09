"use strict"

// impmort { describe, it, before, beforeEach, after, afterEach } from 'node:test';
import ArtWork from '../www/app/front-modules/Art.class.def.mjs';
import { describe, it } from 'node:test';
import assert from 'node:assert'


describe("Testing display cub calc property from the class Artwork", () => {
	it("TEST-1: it should return the cub calc of the work.", () => {
		const tWork = [];
		tWork.push(new ArtWork("00001", "100", "3", "100"));
		const expected = 0.03;
		const current = tWork[0].cub;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-2: it should return false.", () => {
		const tWork = [];
		tWork.push(new ArtWork("00001", "", "3", "100"));
		const expected = false;
		const current = tWork[0].cub;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-3: it should return false.", () => {
		const tWork = [];
		tWork.push(new ArtWork("00001", "", "", "100"));
		const expected = false;
		const current = tWork[0].cub;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-4: it should return false.", () => {
		const tWork = [];
		tWork.push(new ArtWork("00001", "", "", ""));
		const expected = false;
		const current = tWork[0].cub;

		assert.deepStrictEqual(current, expected);
	});
	
	it("TEST-5: it should return the cub calc.", () => {
		const tWork = [];
		tWork.push(new ArtWork("00001", "100", "3", "100"));
		const expected = 5;
		const current = tWork[0].cubeAir;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-6: it should return false.", () => {
		const tWork = [];
		tWork.push(new ArtWork("00001", "", "03", "100"));
		const expected = false;
		const current = tWork[0].cubeAir;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-7: it should return false.", () => {
		const tWork = [];
		tWork.push(new ArtWork("00001", "", "", "100"));
		const expected = false;
		const current = tWork[0].cubeAir;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-8: it should return false.", () => {
		const tWork = [];
		tWork.push(new ArtWork("00001", "", "", ""));
		const expected = false;
		const current = tWork[0].cubeAir;

		assert.deepStrictEqual(current, expected);
	});
});
