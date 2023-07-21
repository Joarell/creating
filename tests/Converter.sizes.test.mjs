import Converter from '../www/app/core2/Converter.class.mjs';
import { describe, it } from 'node:test';
import assert from 'node:assert';


describe("These are teste to the converte measures class:", () => {
	it ("TEST-1: Returns the centimeter conversion.", () => {
		const current =		new Converter(100, 5, 120).cmConvert;
		const expected =	[39.37, 1.969, 47.244];
	
		assert.deepStrictEqual(current, expected);
	});
	
	it ("TEST-2: Returns the centimeter conversion to string values.", () => {
		const current =		new Converter("100", "5", "120").cmConvert;
		const expected =	[39.37, 1.969, 47.244];
	
		assert.deepStrictEqual(current, expected);
	});
	
	it ("TEST-3: Returns undefined for none value passed.", () => {
		const current =		new Converter().cmConvert;
		const error =		"Please, provide a value to be converted.";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it ("TEST-4: Returns undefined to empty string.", () => {
		const current =		new Converter("").cmConvert;
		const error =		"Please, provide a value to be converted.";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it ("TEST-5: Returns undefined to empty string.", () => {
		const current =		new Converter(" ").cmConvert;
		const error =		"Please, provide a value to be converted.";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it ("TEST-6: Returns the converter type", () => {
		const current =		new Converter("     ").cmConvert;
		const error =		"Please, provide a value to be converted.";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it ("TEST-7: Returns the  inch conversion value", () => {
		const current =		new Converter(39.37, 1.969, 47.244).inConvert;
		const expected =	[100, 5, 120];
	
		assert.deepStrictEqual(current, expected);
	});

	it ("TEST-8: Returns undefined for none value passed.", () => {
		const current =		new Converter().inConvert;
		const error =		"Please, provide a value to be converted.";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it ("TEST-9: Returns undefined to empty string.", () => {
		const current =		new Converter("").inConvert;
		const error =		"Please, provide a value to be converted.";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it ("TEST-10: Returns undefined to empty string.", () => {
		const current =		new Converter(" ").inConvert;
		const error =		"Please, provide a value to be converted.";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
	
	it ("TEST-11: Returns the converter type", () => {
		const current =		new Converter("     ").inConvert;
		const error =		"Please, provide a value to be converted.";
		const expected =	new TypeError(error);
	
		assert.deepStrictEqual(current, expected);
	});
});
