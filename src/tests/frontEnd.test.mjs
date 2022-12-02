"use strict"

// impmort { describe, it, before, beforeEach, after, afterEach } from 'node:test';
import ArtWork from '../public/front-modules/classes.def.mjs';
import { describe, it } from 'node:test';
import assert from 'node:assert'


describe("Testing display cub calc property from the class Artwork", () => {
	it("It Should return the cub calc of the work with the value 0.03 variable value: ArtWork \"00001\", \"100\", \"3\", \"100\"", () => {
		const tWork = [];
		tWork.push(new ArtWork("00001", "100", "3", "100"));
		const expected = 0.03;
		const current = tWork[0].cub;
		assert.deepStrictEqual(current, expected);
	});
	console.log("Done!");
	it("It Should return false variable value: ArtWork \"00001\", \"\", \"3\", \"100\"", () => {
		const tWork = [];
		tWork.push(new ArtWork("00001", "", "3", "100"));
		const expected = false;
		const current = tWork[0].cub;
		assert.deepStrictEqual(current, expected);
	});

	it("It Should return false variable value: ArtWork \"00001\", \"\", \"\", \"100\"", () => {
		const tWork = [];
		tWork.push(new ArtWork("00001", "", "", "100"));
		const expected = false;
		const current = tWork[0].cub;
		assert.deepStrictEqual(current, expected);
	});

	it("It Should return false variable value: ArtWork \"00001\", \"\", \"\", \"\"", () => {
		const tWork = [];
		tWork.push(new ArtWork("00001", "", "", ""));
		const expected = false;
		const current = tWork[0].cub;
		assert.deepStrictEqual(current, expected);
	});
	
	it("It Should return the cub calc of the work with the value 0.03 variable value: ArtWork \"00001\", \"100\", \"3\", \"100\"", () => {
		const tWork = [];
		tWork.push(new ArtWork("00001", "100", "3", "100"));
		const expected = 5;
		const current = tWork[0].cubeAir;
		assert.deepStrictEqual(current, expected);
	});

	it("It Should return false variable value: ArtWork \"00001\", \"\", \"3\", \"100\"", () => {
		const tWork = [];
		tWork.push(new ArtWork("00001", "", "03", "100"));
		const expected = false;
		const current = tWork[0].cubeAir;
		assert.deepStrictEqual(current, expected);
	});

	it("It Should return false variable value: ArtWork \"00001\", \"\", \"\", \"100\"", () => {
		const tWork = [];
		tWork.push(new ArtWork("00001", "", "", "100"));
		const expected = false;
		const current = tWork[0].cubeAir;
		assert.deepStrictEqual(current, expected);
	});

	it("It Should return false variable value: ArtWork \"00001\", \"\", \"\", \"\"", () => {
		const tWork = [];
		tWork.push(new ArtWork("00001", "", "", ""));
		const expected = false;
		const current = tWork[0].cubeAir;
		assert.deepStrictEqual(current, expected);
	});
});
