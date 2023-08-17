
import Crater from '../www/app/core2/Crater.class.mjs';
import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as mock from './mock.artworks.mjs';
import Arranger from '../www/app/core2/Arranger.class.mjs';
import CraterTube from '../www/app/core2/Crater.tube.crate.mjs';
import CraterPythagoras from '../www/app/core2/Crater.largest.canvas.mjs';
import CraterSameSize from '../www/app/core2/Crater.same.size.mjs';
import CraterNotCanvas from '../www/app/core2/Crater.no.canvas.mjs';
import CraterStandard from '../www/app/core2/Crater.standard.crate.mjs';


describe("These are test to Crater class.", () => {
	it("TEST-1: returns false to no tube list.", () => {
		const current =		new CraterTube();
		const expected =	{ tube: false };

		assert.deepStrictEqual(current, expected);
	});
	
	it("TEST-2: returns the crate to one rolled work.", () => {
		const works =		mock.caseTube1;
		const current =		new CraterTube(works);
		const expected =	mock.provideTubeCrate(1);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-3: returns the crate to two rolled works.", () => {
		const works =		mock.caseTube2;
		const current =		new CraterTube(works);
		const expected =	mock.provideTubeCrate(2);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-4: returns the crate to three rolled works.", () => {
		const works =		mock.caseTube3;
		const current =		new CraterTube(works);
		const expected =	mock.provideTubeCrate(3);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-5: returns the crate to four rolled works.", () => {
		const works =		mock.caseTube4;
		const current =		new CraterTube(works);
		const expected =	mock.provideTubeCrate(4);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-6: returns the crate to more then 4 rolled works.", () => {
		const works =		mock.caseTube5;
		const current =		new CraterTube(works);
		const expected =	mock.provideTubeCrate(5);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-7: returns the crate to huge diameter rolled works.", () => {
		const works =		mock.caseTube6;
		const current =		new CraterTube(works);
		const expected =	mock.provideTubeCrate(6);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-8: returns false object to no list passe to the class.", () => {
		const current =		new CraterPythagoras();
		const expected =	{ largest: false };
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-9: returns the Pythagoras crate to the list passed.", () => {
		const largest =		mock.canvas1;
		const current =		new CraterPythagoras(largest);
		const expected =	mock.provideLargestCanvas(1);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-10: returns the Pythagoras crate to the list passed.", () => {
		const largest =		mock.canvas2;
		const current =		new CraterPythagoras(largest);
		const expected =	mock.provideLargestCanvas(2);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-11: returns the Pythagoras crate to the list passed.", () => {
		const largest =		mock.canvas3;
		const current =		new CraterPythagoras(largest);
		const expected =	mock.provideLargestCanvas(3);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-12: returns the Pythagoras crate to the list passed.", () => {
		const largest =		mock.canvas1;
		const current =		new CraterPythagoras(largest);
		const expected =	mock.provideLargestCanvas(1);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-13: returns the Pythagoras crate to the list passed.", () => {
		const largest =		mock.canvas5;
		const current =		new CraterPythagoras(largest);
		const expected =	mock.provideLargestCanvas(5);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-14: returns false object to no list passe to the class.", () => {
		const current =		new CraterSameSize();
		const expected =	{ sameSize: false };
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-15: returns the same size crate to the list passed.", () => {
		const same =		mock.sameMeasure1;
		const current =		new CraterSameSize(same);
		const expected =	mock.provideSameSizeCanvas(1);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-16: returns the same size crate to the list passed.", () => {
		const same =		mock.sameMeasure2;
		const current =		new CraterSameSize(same);
		const expected =	mock.provideSameSizeCanvas(2);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-17: returns the same size crate to the list passed.", () => {
		const same =		mock.sameMeasure3;
		const current =		new CraterSameSize(same);
		const expected =	mock.provideSameSizeCanvas(3);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-18: returns the Pythagoras crate to the list passed.", () => {
		const same =		mock.sameMeasure5;
		const current =		new CraterSameSize(same);
		const expected =	mock.provideSameSizeCanvas(5);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-19: returns false object to no list passe to the class.", () => {
		const current =		new CraterNotCanvas();
		const expected =	{ noCanvas: false };
		
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-20: returns one crate assuming 4 sculptures provided.", () => {
		const same =		mock.furniture1;
		const current =		new CraterNotCanvas(same);
		const expected =	mock.provideNoCanvas(1);
		
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-21: returns one crate assuming 6 sculptures provided.", () => {
		const same =		mock.furniture2;
		const current =		new CraterNotCanvas(same);
		const expected =	mock.provideNoCanvas(2);
		
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-22: returns the crate assumin 12 sculptures provided.", () => {
		const same =		mock.furniture3;
		const current =		new CraterNotCanvas(same);
		const expected =	mock.provideNoCanvas(3);
		
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-23: returns false object to no list passe to the class.", () => {
		const same =		mock.furniture4;
		const current =		new CraterNotCanvas(same);
		const expected =	mock.provideNoCanvas(4);
		
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-24: returns false object to no list passe to the class.", () => {
		const same =		mock.furniture5;
		const current =		new CraterNotCanvas(same);
		const expected =	mock.provideNoCanvas(5);
		
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-25: returns false object to no list passe to the class.", () => {
		const current =		new CraterStandard();
		const expected =	{ standard: false };
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-26: returns 3 crates as a result of the list passed.", () => {
		const sorted  =		mock.standard1;
		const current =		new CraterStandard(sorted);
		const expected =	mock.conventionalWorks(1);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-27: returns 1 crate with 5 layers.", () => {
		const sorted  =		mock.standard2;
		const current =		new CraterStandard(sorted);
		const expected =	mock.conventionalWorks(2);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-28: returns 2 crates as result to the list passed.", () => {
		const sorted  =		mock.standard3;
		const current =		new CraterStandard(sorted);
		const expected =	mock.conventionalWorks(3);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-29: returns 1 crates as result to the list passed.", () => {
		const sorted  =		mock.standard4;
		const current =		new CraterStandard(sorted);
		const expected =	mock.conventionalWorks(4);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-30: returns 3 crates as a result of the sorted list.", () => {
		const { sorted } =	mock.largestWorks();
		const current =		new CraterStandard(sorted);
		const expected =	mock.conventionalWorks(5);
	
		assert.deepStrictEqual(current, expected);
	});

	it("TEST-31: returns 1 crates as result to the list passed.", () => {
		const sorted  =		mock.standard4;
		const current =		new CraterStandard(sorted);
		const expected =	mock.conventionalWorks(4);
	
		console.log(current, 'and', expected);
		assert.deepStrictEqual(current, expected);
	});
});
