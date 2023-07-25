
import Arranger from '../www/app/core2/Arranger.class.mjs';
import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as mock from './mock.artworks.mjs';


describe("These are tests to Arranger class module.", () => {
	it("TEST-1: returns error to empty data.", async () => {
		const current =		await new Arranger().solveTheList;
		const expected =	`Please, provide a type of 'ArtWork' object.`;
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("TEST-2: returns error to not 'ArtWork' type.", async () => {
		const current =		await new Arranger(['11000', 100, 5, 100]).solveTheList;
		const expected =	`Some work is not of the type 'ArtWork' object.`;
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("TEST-3: returns error to string passed to the Arranger.", async () => {
		const current =		await new Arranger('test').solveTheList;
		const expected =	`Please, provide a type of 'ArtWork' object.`;
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("TEST-4: returns error to empty array.", async () => {
		const current =		await new Arranger([]).solveTheList;
		const expected =	`Please, provide a type of 'ArtWork' object.`;
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("TEST-5: returns error to string array.", async () => {
		const current =		await new Arranger(['Test']).solveTheList;
		const expected =	`Some work is not of the type 'ArtWork' object.`;
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-6: returns error to empty array.", async () => {
		const current =		await new Arranger(['              ']).solveTheList;
		const expected =	`Some work is not of the type 'ArtWork' object.`;
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-7: returns error to not 'ArtWork' type.", async () => {
		const current =		await new Arranger(' ').solveTheList;
		const expected =	`Please, provide a type of 'ArtWork' object.`;
	
		assert.deepStrictEqual(current, expected);
	});
	
	// it("TEST-8: returns the works with respective cub values", async () => {
	// 	const test =		mock.artWorksList();
	// 	const current =		await new Arranger(test).solveTheList;
	// 	const expected =	mock.artWorksCubed();
	//
	// 	assert.deepStrictEqual(current, expected);
	// });

	it("TEST-9: returns the works with respective cub values", async () => {
		const test =		mock.artWorksList();
		const current =		await new Arranger(test).solveTheList;
		const expected =	mock.quickSortResult();
	
		assert.deepStrictEqual(current, expected);
	});
});
