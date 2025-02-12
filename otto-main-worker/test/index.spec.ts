import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { beforeAll, afterEach, describe, it, expect, vi } from 'vitest';
import worker from '../src';
import { SolvedList } from '../src/domain/repository/models/EstimateType';
import { UserActiveData, UserDataRequest } from '../src/domain/repository/models/userData';

// TODO: test expired tokens and check table.
describe('request for message', async () => {
	beforeAll(async () => {
		await env.DB1.prepare(`
			CREATE TABLE IF NOT EXISTS users (
				id TEXT PRIMARY KEY NOT NULL,
				name TEXT NOT NULL,
				last_name TEXT NOT NULL,
				company_name TEXT NOT NULL,
				birth_date TEXT NOT NULL,
				email TEXT NOT NULL, pass_phrase TEXT NOT NULL, auth_token TEXT NOT NULL,
				refresh_token TEXT NOT NULL,
				created TEXT NOT NULL,
				active_session TEXT,
				grant_access TEXT
			);
		`).run();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers()
	})

	const result = {
		reference: "TEST",
		list: [ { code: "320809", x: 100, z: 10, y: 100 } ],
		crates: {
			standardCrate: { crates: [
				[ 123, 45.5, 128, 119.392 ],
				{
					works: [
						{ layer1: [ "320809", 100, 10, 100, 0.1 ] }
					]
				}
			] },
			allCrates: [ [ 123, 45.5, 128, 119.392 ] ],
			airCubTotal: 119.392,
			whichAirPort: [ { PAX: 1 }, { CARGO: 0 } ]
		}
	};

	const resultUpdated = {
		reference: "TEST",
		list: [
			{ code: "320809", x: 100, z: 10, y: 100 },
			{ code: "320810", x: 100, z: 10, y: 100 }
		],
		crates: {
			standardCrate: { crates: [
				[ 123, 55.5, 128, 145.632 ],
				{
					works: [
						{ layer1: [ "320809", 100, 10, 100, 0.1 ] },
						{ layer2: [ "320819", 100, 10, 100, 0.1 ] }
					]
				}
			] },
			allCrates: [ [ 123, 55.5, 128, 145.632 ] ],
			airCubTotal: 145.632,
			whichAirPort: [ { PAX: 1 }, { CARGO: 0 } ]
		}
	};

	const newUser = {
		userName: "TESTER",
		userLastName: "Testing",
		passPhrase: "TesterGetIN",
		birthday: "01/01/2025",
		email: "tester@testing.com",
		companyName: "TESTER_CORP",
		access: "FULL"
	};

	const newUserExt = {
		userName: "FOOTESTR",
		userLastName: "Bar",
		passPhrase: "FooBarBazFoo",
		birthday: "01/01/2020",
		email: "foo@barbaz.com",
		companyName: "FooBar",
		access: "BASIC"
	};

	it('TEST - 00 Testing add new user. (return error to not a valid berear token)', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ''`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		const responseA = await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer 'FooBar'`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		const responseB = await SELF.fetch(requestB);
		const requestC = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer '  FooBar    '`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		const responseC = await SELF.fetch(requestC);
		//
		expect(responseA.status).toMatchInlineSnapshot(`400`);
		expect(responseB.status).toMatchInlineSnapshot(`400`);
		expect(responseC.status).toMatchInlineSnapshot(`400`);
	});

	it('TEST - 01 adds a new user to DB', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		const responseA = await SELF.fetch(requestA);

		expect(responseA.status).toMatchInlineSnapshot(`200`);
	});

	it('TEST - 02 Executes user login tests after the user was added', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			body: JSON.stringify({
				userName: "TESTER",
				passPhrase: "TesterGetIN"
			})
		});
		const response = await SELF.fetch(requestB);

		expect(response.status).toMatchInlineSnapshot("200");
	});

	it('TEST - 03 Executes user login tests after the same user were logged in (not allowed)).', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				userName: "TESTER",
				passPhrase: "TesterGetIN"
			})
		});
		const requestC = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				userName: "TESTER",
				passPhrase: "TesterGetIN"
			})
		});
		const requestD = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				userName: "",
				passPhrase: "TesterGetIN"
			})
		});
		const requestE = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				userName: "TESTER",
				passPhrase: ""
			})
		});
		const requestF = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				userName: "",
				passPhrase: ""
			})
		});
		const response = await Promise.resolve(await SELF.fetch(requestB))
			.then(async () => await SELF.fetch(requestC))
			.catch(res => res);
		const responseD = await SELF.fetch(requestD);
		const responseE = await SELF.fetch(requestE);
		const responseF = await SELF.fetch(requestF);

		expect(response.status).toMatchInlineSnapshot(`401`);
		expect(await response.text()).toMatchInlineSnapshot(`"User not found!"`);
		expect(responseD.status).toMatchInlineSnapshot(`401`);
		expect(await responseD.text()).toMatchInlineSnapshot(`"User not found!"`);
		expect(responseE.status).toMatchInlineSnapshot(`401`);
		expect(await responseE.text()).toMatchInlineSnapshot(`"User not found!"`);
		expect(responseF.status).toMatchInlineSnapshot(`401`);
		expect(await responseF.text()).toMatchInlineSnapshot(`"User not found!"`);
	});

	it('TEST - 04 Executes user login tests after the same user were logged in (not allowed)).', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ userName: "TESTER", passPhrase: "TesterGetIN" })
		});
		const requestC = new Request('http://localhost:8787/api/v1/boot/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ userName: "TESTER", passPhrase: "TesterGetIN" })
		});
		const response = await Promise.resolve(await SELF.fetch(requestB))
			.then(async () => await SELF.fetch(requestC))
			.catch(res => res);

		expect(response.status).toMatchInlineSnapshot(`200`);
		expect(UserDataRequest.safeParse(await response.json()).success).toMatchInlineSnapshot(`true`);
	});

	it('TEST - 05 Testing the list parser.', async () => {
		const list = SolvedList.safeParse(result);
		expect(list.success).toMatchInlineSnapshot(`true`);
	});

	it('TEST - 06 Testing to save a solved list.', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				userName: "TESTER",
				passPhrase: "TesterGetIN"
			})
		});
		await SELF.fetch(requestA);
		const response = await Promise.resolve(await SELF.fetch(requestB))
			.then(async (res) => {
				const body = {
					result,
					user: await res.json()
				};
				const requestC = new Request('http://localhost:8787/api/v1/newEstimate', {
					method: "POST",
					body: JSON.stringify(body)
				});
				return(await SELF.fetch(requestC));
		}).catch(res => res);

		expect(response.status).toMatchInlineSnapshot(`200`);
		expect(await response.text()).toMatchInlineSnapshot(`"Success!"`);
	});

	it('TEST - 07 Testing to save a solved list. (return error for empty solved list)', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				userName: "TESTER",
				passPhrase: "TesterGetIN"
			})
		});
		await SELF.fetch(requestA);
		const response = await Promise.resolve(await SELF.fetch(requestB))
			.then(async () => {
				const requestC = new Request('http://localhost:8787/api/v1/newEstimate', {
					method: "POST",
					headers: new Headers({ 'Content-Type': 'application/json' }),
					body: JSON.stringify({})
				});
				return(await SELF.fetch(requestC));
			}).catch(res => res);

		expect(response.status).toMatchInlineSnapshot(`403`);
		expect(await response.text()).toMatchInlineSnapshot(`"Error!"`);
	});

	it('TEST - 08 Testing to save a solved list. (return error for not user logged in)', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({})
		});
		await SELF.fetch(requestA);
		const response = await Promise.resolve(await SELF.fetch(requestB))
			.then(async () => {
				const body = {
					result,
					user: ""
				};
				const requestC = new Request('http://localhost:8787/api/v1/newEstimate', {
					method: "POST",
					headers: new Headers({ 'Content-Type': 'application/json' }),
					body: JSON.stringify(body)
				});
				return(await SELF.fetch(requestC));
			}).catch(res => res);

		expect(response.status).toMatchInlineSnapshot(`403`);
		expect(await response.text()).toMatchInlineSnapshot(`"Error!"`);
	});

	it('TEST - 09 Testing to save a solved list. (rejected on empty solved list)', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				userName: "TESTER",
				passPhrase: "TesterGetIN"
			})
		});
		await SELF.fetch(requestA);
		const responseA = await Promise.resolve(await SELF.fetch(requestB))
			.then(async (res) => {
				const body = {
					result: "",
					user: await res.text()
				};
				const requestC = new Request('http://localhost:8787/api/v1/newEstimate', {
					method: "POST",
					headers: new Headers({ 'Content-Type': 'application/json' }),
					body: JSON.stringify(body)
				});
				return(await SELF.fetch(requestC));
		}).catch(res => res);

		expect(responseA.status).toMatchInlineSnapshot(`403`);
		expect(await responseA.text()).toMatchInlineSnapshot(`"Error!"`);
	});

	it('TEST - 10 Testing to save a solved list. (rejected on empty user)', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				userName: "TESTER",
				passPhrase: "TesterGetIN"
			})
		});
		await SELF.fetch(requestA);
		const responseA = await Promise.resolve(await SELF.fetch(requestB))
			.then(async () => {
				const body = {
					result,
					user: ""
				};
				const requestC = new Request('http://localhost:8787/api/v1/newEstimate', {
					method: "POST",
					headers: new Headers({ 'Content-Type': 'application/json' }),
					body: JSON.stringify(body)
				});
				return(await SELF.fetch(requestC));
		}).catch(res => res);

		expect(responseA.status).toMatchInlineSnapshot(`403`);
		expect(await responseA.text()).toMatchInlineSnapshot(`"Error!"`);
	});

	it('TEST - 11 Testing to save a solved list. (rejected on user null)', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				userName: "TESTER",
				passPhrase: "TesterGetIN"
			})
		});
		await SELF.fetch(requestA);
		const responseA = await Promise.resolve(await SELF.fetch(requestB))
			.then(async () => {
				const body = {
					result,
					user: null
				};
				const requestC = new Request('http://localhost:8787/api/v1/newEstimate', {
					method: "POST",
					headers: new Headers({ 'Content-Type': 'application/json' }),
					body: JSON.stringify(body)
				});
				return(await SELF.fetch(requestC));
		}).catch(res => res);

		expect(responseA.status).toMatchInlineSnapshot(`403`);
		expect(await responseA.text()).toMatchInlineSnapshot(`"Error!"`);
	});

	it('TEST - 12 Testing to save a solved list. (rejected to save the same estimate)', async () => {
		let user : string;
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				userName: "TESTER",
				passPhrase: "TesterGetIN"
			})
		});
		await SELF.fetch(requestA);
		const responseA = await Promise.resolve(await SELF.fetch(requestB))
			.then(async (res) => {
				user = await res.json();
				const body = {
					result,
					user
				};
				const requestC = new Request('http://localhost:8787/api/v1/newEstimate', {
					method: "POST",
					headers: new Headers({ 'Content-Type': 'application/json' }),
					body: JSON.stringify(body)
				});
				return(await SELF.fetch(requestC));
		}).then(async () => {
				const body = {
					result,
					user
				};
				const requestD = new Request('http://localhost:8787/api/v1/newEstimate', {
					method: "POST",
					headers: new Headers({ 'Content-Type': 'application/json' }),
					body: JSON.stringify(body)
				});
				return(await SELF.fetch(requestD));
		}).catch(res => res);

		expect(responseA.status).toMatchInlineSnapshot(`409`);
		expect(await responseA.text()).toMatchInlineSnapshot(`"Duplicated!"`);
	});

	it('TEST - 13 Executes user login tests after the same user were logged in (redirects to login path)).', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ userName: "TESTER", passPhrase: "TesterGetIN" })
		});
		let user1 = await SELF.fetch(requestB);
		user1 = await user1.json();
		const requestC = new Request('http://localhost:8787/api/v1/boot/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ userName: "TESTER", passPhrase: "TesterGetIN" })
		});
		const responseC = await SELF.fetch(requestC);
		const user = await responseC.json();
		const body = { result, user };
		const requestD = new Request('http://localhost:8787/api/v1/newEstimate', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(body)
		});
		const response =	await SELF.fetch(requestD);
		const results =		JSON.parse(await env.OTTO_USERS.get('ultimateSession'));

		expect(response.status).toMatchInlineSnapshot(`200`);
		expect(user1.session !== user.session).toMatchInlineSnapshot(`true`);
		expect(results[0] === user1.session).toMatchInlineSnapshot(`true`);
		expect(results[0] !== user.session).toMatchInlineSnapshot(`true`);
	});

	it('TEST - 14 Testing to searching an estimate.', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				userName: "TESTER",
				passPhrase: "TesterGetIN"
			})
		});
		const responseB =	await SELF.fetch(requestB);
		const user =		await responseB.json();
		const requestC =	new Request('http://localhost:8787/api/v1/newEstimate', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				result,
				user
			})
		});
		await SELF.fetch(requestC);
		const find = 'TEST';
		const requestD = new Request(`http://localhost:8787/api/v1/estimates/${find}`, {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({user})
		});
		const response = await SELF.fetch(requestD);

		expect(response.status).toMatchInlineSnapshot(`200`);
		expect(SolvedList.safeParse(await response.json()).success).toMatchInlineSnapshot(`true`);
	});

	it('TEST - 15 Testing to searching an estimate. (return error for not stored estimate)', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				userName: "TESTER",
				passPhrase: "TesterGetIN"
			})
		});
		const responseB =	await SELF.fetch(requestB);
		const user =		await responseB.json();
		const requestC =	new Request('http://localhost:8787/api/v1/newEstimate', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				result,
				user
			})
		});
		await SELF.fetch(requestC);
		const find = 'TESTT';
		const requestD = new Request(`http://localhost:8787/api/v1/estimates/${find}`, {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({user})
		});
		const response = await SELF.fetch(requestD);

		expect(response.status).toMatchInlineSnapshot(`404`);
		expect(await response.text()).toMatchInlineSnapshot(`"Not found!"`);
	});

	it('TEST - 16 Testing to searching an estimate. (return error for not correct user)', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				userName: "TESTER",
				passPhrase: "TesterGetIN"
			})
		});
		const responseB =	await SELF.fetch(requestB);
		const user =		await responseB.json();
		const requestC =	new Request('http://localhost:8787/api/v1/newEstimate', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				result,
				user
			})
		});
		await SELF.fetch(requestC);
		const find = 'TESTT';
		const requestD = new Request(`http://localhost:8787/api/v1/estimates/${find}`, {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({})
		});
		const response = await SELF.fetch(requestD);

		expect(response.status).toMatchInlineSnapshot(`403`);
		expect(await response.text()).toMatchInlineSnapshot(`"Error!"`);
	});

	it('TEST - 17 Testing to searching an estimate. (return error for not user logged in.)', async () => {
		const find = 'TESTT';
		const requestD = new Request(`http://localhost:8787/api/v1/estimates/${find}`, {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({})
		});
		const response = await SELF.fetch(requestD);

		expect(response.status).toMatchInlineSnapshot(`403`);
		expect(await response.text()).toMatchInlineSnapshot(`"Error!"`);
	});

	it('TEST - 18 Testing to update an estimate.', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				userName: "TESTER",
				passPhrase: "TesterGetIN"
			})
		});
		const responseB =	await SELF.fetch(requestB);
		const user =		await responseB.json();
		const requestC =	new Request('http://localhost:8787/api/v1/newEstimate', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				result,
				user
			})
		});
		await SELF.fetch(requestC);
		const requestD =	new Request('http://localhost:8787/api/v1/update/estimates', {
			method: "PUT",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				result: resultUpdated,
				user
			})
		});
		const response = await SELF.fetch(requestD);

		expect(response.status).toMatchInlineSnapshot(`200`);
		expect(await response.text()).toMatchInlineSnapshot(`"Success!"`);
	});

	it('TEST - 19 Testing to update an estimate. (return error for not user logged in)', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ userName: "TESTER", PassPhrase: "TesterGetIN"})
		});
		await SELF.fetch(requestB);
		const user =		{};
		const requestC =	new Request('http://localhost:8787/api/v1/newEstimate', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				result,
				user
			})
		});
		await SELF.fetch(requestC);
		const requestD =	new Request('http://localhost:8787/api/v1/update/estimates', {
			method: "PUT",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				result: resultUpdated,
				user
			})
		});
		const response = await SELF.fetch(requestD);

		expect(response.status).toMatchInlineSnapshot(`403`);
		expect(await response.text()).toMatchInlineSnapshot(`"Error!"`);
	});

	it('TEST - 20 Testing to update an estimate. (return error for empty solved list)', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				userName: "TESTER",
				passPhrase: "TesterGetIN"
			})
		});
		const responseB =	await SELF.fetch(requestB);
		const user =		await responseB.text();
		const requestC =	new Request('http://localhost:8787/api/v1/newEstimate', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				result,
				user
			})
		});
		await SELF.fetch(requestC);
		const requestD =	new Request('http://localhost:8787/api/v1/update/estimates', {
			method: "PUT",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				result: "",
				user
			})
		});
		const response = await SELF.fetch(requestD);

		expect(response.status).toMatchInlineSnapshot(`403`);
		expect(await response.text()).toMatchInlineSnapshot(`"Error!"`);
	});

	it('TEST - 21 Testing to update tokens.', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ userName: "TESTER", passPhrase: "TesterGetIN" })
		});
		const responseB =	await SELF.fetch(requestB);
		const user =		await responseB.json();
		const requestC =	new Request('http://localhost:8787/api/v1/shift/tokens', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ user })
		});
		const response = await SELF.fetch(requestC);

		expect(response.status).toMatchInlineSnapshot(`200`);
		expect(UserDataRequest.safeParse(await response.json()).success).toMatchInlineSnapshot(`true`);
	});

	it('TEST - 22 Testing to update tokens check the DB as well.', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ userName: "TESTER", passPhrase: "TesterGetIN" })
		});
		const responseB =	await SELF.fetch(requestB);
		const user =		await responseB.json();
		const requestC =	new Request('http://localhost:8787/api/v1/shift/tokens', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ user })
		});
		const response = await SELF.fetch(requestC);
		const { results } = await env.DB1.prepare(`SELECT * FROM users WHERE name = ?`)
			.bind(user.userName).run();
		const userUpTokens = await response.json();

		expect(response.status).toMatchInlineSnapshot(`200`);
		expect(userUpTokens.authToken === results[0].auth_token).toMatchInlineSnapshot(`true`);
		expect(user.refToken === results[0].refresh_token).toMatchInlineSnapshot(`true`);
	});

	it('TEST - 23 Testing to KV store.', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ userName: "TESTER", passPhrase: "TesterGetIN" })
		});
		const response =	await SELF.fetch(requestB);
		const user =		await response.json();
		const KV1 =			await env.OTTO_USERS.get(user.userName)
		const KV2 =			await env.OTTO_USERS.get(user.session)

		expect(response.status).toMatchInlineSnapshot(`200`);
		expect(KV1 === user.session).toMatchInlineSnapshot(`true`);
		//expect(UserActiveData.safeParse(JSON.parse(KV2)).success).toMatchInlineSnapshot(`true`);
	});

	it('TEST - 24 Testing log out and KV cleaning.', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ userName: "TESTER", passPhrase: "TesterGetIN" })
		});
		const responseB =	await SELF.fetch(requestB);
		const user =		await responseB.json();
		const requestC = new Request('http://localhost:8787/api/v1/logout', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ user })
		});
		const response =	await SELF.fetch(requestC);

		expect(response.status).toMatchInlineSnapshot(`200`);
	});

	it('TEST - 25 Testing the currency external API.', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ userName: "TESTER", passPhrase: "TesterGetIN" })
		});
		const responseB =	await SELF.fetch(requestB);
		const user =		await responseB.json();
		const requestC = new Request('http://localhost:8787/api/v1/currencies', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ user })
		});
		const response =	await SELF.fetch(requestC);

		expect(response.status).toMatchInlineSnapshot(`200`);
	});

	it('TEST - 26 Testing the currency external API.(return error for user not logged in)', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ userName: "TESTER", passPhrase: "TesterGetIN" })
		});
		const responseB =	await SELF.fetch(requestB);
		const requestC = new Request('http://localhost:8787/api/v1/currencies', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({})
		});
		const response =	await SELF.fetch(requestC);

		expect(response.status).toMatchInlineSnapshot(`403`);
	});

	it('TEST - 27 Testing update the user pass phrase.', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ userName: "TESTER", passPhrase: "TesterGetIN" })
		});
		const responseB =	await SELF.fetch(requestB);
		const user =		await responseB.json();
		const requestC = new Request('http://localhost:8787/api/v1/new/pass/phrase', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({ user, newPassPhrase: 'Infinity' })
		});
		const response =	await SELF.fetch(requestC);

		expect(response.status).toMatchInlineSnapshot(`200`);
		expect(await response.text()).toMatchInlineSnapshot(`"Success!"`);
	});

	it('TEST - 28 Testing update the user pass phrase. (return error to emtpy pass phrase)', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ userName: "TESTER", passPhrase: "TesterGetIN" })
		});
		const responseB =	await SELF.fetch(requestB);
		const user =		await responseB.json();
		const requestC = new Request('http://localhost:8787/api/v1/new/pass/phrase', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({ user, newPassPhrase: '' })
		});
		const response =	await SELF.fetch(requestC);

		expect(response.status).toMatchInlineSnapshot(`406`);
		expect(await response.text()).toMatchInlineSnapshot(`"Invalid data!"`);
	});

	it('TEST - 29 Testing update the user pass phrase. (return erro to empty user value)', async () => {
		const requestA = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ userName: "TESTER", passPhrase: "TesterGetIN" })
		});
		const responseB =	await SELF.fetch(requestB);
		const user =		{};
		const requestC = new Request('http://localhost:8787/api/v1/new/pass/phrase', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({ user, newPassPhrase: '  ' })
		});
		const response =	await SELF.fetch(requestC);

		expect(response.status).toMatchInlineSnapshot(`406`);
		expect(await response.text()).toMatchInlineSnapshot(`"Invalid data!"`);
	});

	it('TEST - 30 Testing update the user and check the expired token table.', async () => {
		const requestA1 = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		const requestA2 = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUserExt)
		});
		await SELF.fetch(requestA1);
		await SELF.fetch(requestA2);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ userName: "TESTER", passPhrase: "TesterGetIN" })
		});
		const responseB =	await SELF.fetch(requestB);
		const user =		await responseB.json();
		const requestC =	new Request('http://localhost:8787/api/v1/shift/tokens', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ user })
		});
		vi.setSystemTime(new Date().getHours() + 2);
		let response = await SELF.fetch(requestC);
		const userUpTokens = await response.json();
		const { results } = await env.DB1.prepare(
			`SELECT * FROM users WHERE name = '${newUser.userName}';`
		).all()

		expect(response.status).toMatchInlineSnapshot(`200`);
		expect(userUpTokens.refToken !== user.refToken).toMatchInlineSnapshot(`true`);
		expect(userUpTokens.refToken === results[0].refresh_token).toMatchInlineSnapshot(`true`);
	});

	it('TEST - 31 Testing token pairs for different users.', async () => {
		const requestA1 = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		const requestA2 = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUserExt)
		});
		await SELF.fetch(requestA1);
		await SELF.fetch(requestA2);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ userName: "TESTER", passPhrase: "TesterGetIN" })
		});
		const responseB =	await SELF.fetch(requestB);
		const user =		await responseB.json();
		const requestD =	new Request('http://localhost:8787/api/v1/shift/tokens', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ user })
		});
		const response = await SELF.fetch(requestD);

		expect(response.status).toMatchInlineSnapshot(`200`);
	});

	it('TEST - 32 Testing the expired auth token. (return error and store suspicious token)', async () => {
		const requestA1 = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA1);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ userName: "TESTER", passPhrase: "TesterGetIN" })
		});
		const responseB =	await SELF.fetch(requestB);
		const user =		await responseB.json();
		const requestC =	new Request('http://localhost:8787/api/v1/newEstimate', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ result, user })
		});
		vi.setSystemTime(~~(Date.now() / 1000) + 3600 * 9);
		const response =	await SELF.fetch(requestC);

		expect(response.status).toMatchInlineSnapshot(`403`);
	});

	it('TEST - 33 Testing the store suspicious expired auth token.', async () => {
		const requestA1 = new Request('http://localhost:8787/api/v1/new/user', {
			method: "POST",
			headers: new Headers({
				'Authorization': `Bearer ${ env.MASTER_KEY }`,
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(newUser)
		});
		await SELF.fetch(requestA1);
		const requestB = new Request('http://localhost:8787/api/v1/login', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ userName: "TESTER", passPhrase: "TesterGetIN" })
		});
		const responseB =	await SELF.fetch(requestB);
		const user =		await responseB.json();
		const requestC = new Request('http://localhost:8787/api/v1/newEstimate', {
			method: "POST",
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ result, user })
		});
		vi.setSystemTime(~~(Date.now() / 1000) + 3600 * 9);
		const response =	await SELF.fetch(requestC);
		const { results } = await env.DB1.prepare(`
			SELECT * FROM '${newUser.companyName}_suspicious_tokens' WHERE session = ?
		`).bind(user.session).run();

		expect(response.status).toMatchInlineSnapshot(`403`);
		expect(user.session === results[0].session).toMatchInlineSnapshot(`true`);
	});

});
