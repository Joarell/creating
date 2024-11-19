import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src';

describe('request for /message', () => {
	it('/ responds with "200" status code (unit style)', async () => {
		const request = new Request<unknown, IncomingRequestCfProperties>('http://localhost:8787/app');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(await response.status).toMatchInlineSnapshot('200');
	});

	it('responds with "200" status code (integration style)', async () => {
		const request = new Request('http://localhost:8787/app');
		const response = await SELF.fetch(request);
		expect(await response.status).toMatchInlineSnapshot('200');
	});

	it('responds with "HI From Otto!" (integration style)', async () => {
		const request = new Request('http://localhost:8787');
		const response = await worker.fetch(request);
		expect(await response.text()).toMatchInlineSnapshot('"HI From Otto!"');
	});
});
