
import Arranger from '../www/app/core2/Arranger.class.mjs';
import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as mock from './mock.artworks.mjs';
import ArrangerStarter from '../www/app/core2/Arranger.starter.class.mjs';
import ArrangerSameSize from '../www/app/core2/Arranger.same.size.class.mjs';
import ArrangerNoCanvas from '../www/app/core2/Arranger.no.canvas.mjs';
import ArrangerLargestCanvas from '../www/app/core2/Arranger.largest.works.mjs';


describe("These are tests to Arranger class module.", () => {
	it("TEST-1: returns error to empty data.", async () => {
		const current =		await new Arranger();
		const error =		`Please, provide a type of 'ArtWork' object.`;
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("TEST-2: returns error to not 'ArtWork' type.", async () => {
		const arr =			['11000', 100, 5, 100];
		const current =		await new Arranger(arr);
		const error =		`Some work is not of the type 'ArtWork' object.`;
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("TEST-3: returns error to string passed to the Arranger.", async () => {
		const current =		await new Arranger('test');
		const error =		`Please, provide a type of 'ArtWork' object.`;
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("TEST-4: returns error to empty array.", async () => {
		const current =		await new Arranger([]);
		const error =		`Please, provide a type of 'ArtWork' object.`;
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("TEST-5: returns error to string array.", async () => {
		const current =		await new Arranger(['Test']);
		const error =		`Some work is not of the type 'ArtWork' object.`;
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("TEST-6: returns error to empty array.", async () => {
		const current =		await new Arranger(['              ']);
		const error =		`Some work is not of the type 'ArtWork' object.`;
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("TEST-7: returns error to not 'ArtWork' type.", async () => {
		const current =		await new Arranger(' ')
		const error =		`Please, provide a type of 'ArtWork' object.`;
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("TEST-8: adds a list with cubed and sorted values", async () => {
		const mocked =		mock.artWorksList();
		const current =		await new ArrangerStarter(mocked);
		const expected =	mock.quickSortResult();
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("TEST-9: adds an object list with same size works.", async () => {
		const mocked =		mock.quickSortResult();
		const current =		await new ArrangerSameSize(mocked);
		const expected =	mock.lessSameSize();
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("TEST-10: adds an object list with no canvas elements.", async () => {
		const mocked =		mock.lessSameSize();
		const current =		await new ArrangerNoCanvas(mocked);
		const expected =	mock.noCanvasOut();
	
		assert.deepStrictEqual(current, expected);
	});
	
	it("TEST-11: adds an object with respective cub values", async () => {
		const mocked =		mock.noCanvasOut();
		const current =		await new ArrangerLargestCanvas(mocked);
		const expected =	mock.largestWorks();
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-12: adds an object with respective cub values", async () => {
		const mocked =		mock.artWorksList();
		const current =		await new Arranger(mocked);
		const expected =	mock.largestWorks();
	
		// console.log(current);
		assert.deepStrictEqual(current, expected);
	});
});
