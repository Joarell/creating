import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { beforeAll, afterAll,  describe, it, expect } from 'vitest';
import worker from '../src';
import { unstable_dev, UnstableDevWorker } from 'wrangler';

describe('request for message', () => {
	it('/ responds with "Hello Hono!" (unit style)', async () => {
		const request = new Request<unknown, IncomingRequestCfProperties>('http://localhost:8787');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(await response.text()).toMatchInlineSnapshot('"Hello Hono!"');
	});

	it('responds with "200" status code (integration style)', async () => {
		const request = new Request('http://localhost:8787/api');
		const response = await SELF.fetch(request);
		expect(await response.text()).toMatchInlineSnapshot('"Call /api/beverages to see everyone who works at Bs Beverages"');
	});

	it('TEST', async () => {
		const request = new Request('http://localhost:8787/api/test')<unknown, IncomingRequestCfProperties>;
		const ctx = createExecutionContext();
		const response = await worker.fetch(request,env, ctx);
		await waitOnExecutionContext(ctx);
		expect(response).toStrictEqual(new Response({}));
	});

	it('Error syntax', async () => {
		const request = new Request('http://localhost:8787/api/v1/new/user', {
			method: 'POST',
			body: "",
		})<unknown, IncomingRequestCfProperties>;
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		expect(response).toStrictEqual(new Response({}));
	});

	it('Test the api to add new user', async () => {
		const body = JSON.stringify({
			userName: "TESTER",
			passFrase: "TesterGetIN",
			email: "tester@testing.com",
			lastName: "Testing",
			companyName: "TESTER_CORP",
			birthDay: "01/01/2025",
			access: "FULL"
		});
		const request = new Request('http://localhost:8787/api/v1/new/user', {
			method: 'POST',
			body,
		})<unknown, IncomingRequestCfProperties>;
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		expect(response).toStrictEqual(true);
	});
});
