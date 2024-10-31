
import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as mock from './mock.artworks.mjs';
import UnitAdapter from '../otto/app/core2/Unit.Adapter.class.mjs';


describe("Testing the Unit Adapter class:", () => {
	it("TEST-1: returns an Error to nowArtWorks input list.", async () => {
		const current =		await new UnitAdapter('', 'cm');
		const error =		`Please, provide a valid list.`;
		const expected =	new TypeError(error);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-2: returns a Promise.", () => {
		const current =		new UnitAdapter().constructor.name;
		const expected =	'Promise';

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-3: returns a Promise TypeError to no valid list.", () => {
		const current =		new UnitAdapter('', 'cm');
		const error =		`Please, provide a type of 'ArtWork' object list.`;
		const expected =	Promise.resolve(new TypeError(error));

		assert.deepEqual(current, expected);
	});

	it("TEST-4: returns a Promise TypeError to no valid unit.", async () => {
		const list =	[
			['5908', 150, 5, 90],
			['8899', 120, 3, 100],
			['777', 50, 3, 50],
			['1112', 60, 5, 90],
			['1897', 180, 5, 100],
			['9897', 75, 5, 80],
			['9884', 100, 5, 120],
			['8745', 130, 5, 100],
			['8877', 160, 5, 160],
			['75784', 130, 5, 50],
			['90909', 100, 5, 90],
			['12345', 89, 5, 88],
		];
		const current =		await new UnitAdapter(list)
		const error =		`Please, provide a type of 'ArtWork' object list.`
		const expected =	new TypeError(error);

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-5: returns one crate to sculpture passed.", async () => {
		const list =	[
			['5908', 50.3, 50.3, 33.9],
		];
		const work =		mock.artWorksList(list);
		const result =		await new UnitAdapter(work, 'in')
		const current =		result.noCanvasCrate.hasOwnProperty('crates');
		const expected =	true;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-6: returns the solved list passed then true.", async () => {
		const list =	[
			['5908', 150, 5, 90],
			['8899', 120, 3, 100],
			['777', 50, 3, 50],
			['1112', 60, 5, 90],
			['1897', 180, 5, 100],
			['9897', 75, 5, 80],
			['9884', 100, 5, 120],
			['8745', 130, 5, 100],
			['8877', 160, 5, 160],
			['75784', 130, 5, 50],
			['90909', 100, 5, 90],
			['12345', 89, 5, 88],
		];

		const works =		mock.artWorksList(list);
		const result =		await new UnitAdapter(works, 'cm');
		const current =		result.hasOwnProperty('allCrates');
		const expected =	true;

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-7: returns solved list with inches values.", async () => {
		let list =	[
			[ '5908', 59.055, 1.969, 35.433 ],
			[ '8899', 47.244, 1.181, 39.37 ],
			[ '777', 19.685, 1.181, 19.685 ],
			[ '1112', 23.622, 1.969, 35.433 ],
			[ '1897', 70.866, 1.969, 39.37 ],
			[ '9897', 29.528, 1.969, 31.496 ],
			[ '9884', 39.37, 1.969, 47.244 ],
			[ '8745', 51.181, 1.969, 39.37 ],
			[ '8877', 62.992, 1.969, 62.992 ],
			[ '75784', 51.181, 1.969, 19.685 ],
			[ '90909', 39.37, 1.969, 35.433 ],
			[ '12345', 35.039, 1.969, 34.646 ]
		];

		const works =		mock.artWorksList(list);
		const current =		await new UnitAdapter(works, 'in');
		const expected =	await new UnitAdapter(works, 'cm');

		assert.notEqual(current, expected);
	});

	it("TEST-8: returns solved list with one inches sized. ", async () => {
		let list =	[
			[ '5908', 59.055, 1.969, 35.433 ],
		];

		const works =		mock.artWorksList(list);
		const result =		await new UnitAdapter(works, 'in');
		const current =		result.standardCrate.crates;
		const expected =	[ [ 68.11, 12.008, 46.457, 6.332 ],
			{
				works : [
					{ layer1: [[ '5908', 59.055, 1.969, 35.433, 5.492 ]] }
				]
			}
		];

		assert.deepStrictEqual(current, expected);
	});

	it("TEST-9: returns solved list with inches values including backUps.", async () => {
		let list =	[
			[ '5908', 59.055, 1.969, 35.433 ],
			[ '8899', 47.244, 1.181, 39.37 ],
			[ '777', 19.685, 1.181, 19.685 ],
			[ '8980', 11.811, 1.181, 11.811 ],
			[ '71234', 11.811, 1.181, 11.811 ],
			[ '1111', 11.811, 1.181, 11.811 ],
			[ '2313', 11.811, 1.181, 11.811 ],
			[ '1112', 23.622, 1.969, 35.433 ],
			[ '1897', 70.866, 1.969, 39.37 ],
			[ '9897', 29.528, 1.969, 31.496 ],
			[ '9884', 39.37, 1.969, 47.244 ],
			[ '8745', 51.181, 1.969, 39.37 ],
			[ '8877', 62.992, 1.969, 62.992 ],
			[ '34733', 51.181, 1.969, 19.685 ],
			[ '18988', 51.181, 1.969, 19.685 ],
			[ '38388', 51.181, 1.969, 19.685 ],
			[ '75784', 51.181, 1.969, 19.685 ],
			[ '90909', 39.37, 1.969, 35.433 ],
			[ '12345', 35.039, 1.969, 34.646 ]
		];

		const works =		mock.artWorksList(list);
		const result =		await new UnitAdapter(works, 'in');
		const current =		result.allCrates;
		const expected =	[
			[ 107.48, 20.079, 74.016, 26.622 ],
			[ 79.921, 17.913, 50.394, 12.024 ],
		];

		assert.deepStrictEqual(current, expected);
	});
});
