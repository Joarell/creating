/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

interface Env {
	ASSETS: Fetcher;
}

import { WorkerEntrypoint } from 'cloudflare:workers';
import workerApp from './worker.app';
import linkWorker from './link.worker';
import { z } from 'zod';

class link extends WorkerEntrypoint {
	async fetch(request: Request, env: Env, ctx): Promise<Response> {
		const url = new URL(request.url).pathname;
		const res = await fetch(request)

		switch (url) {
			case '/':
				return(new Response('ERROR!'));
				//return (new Response.redirect(request.url + "/app", 301));
			case '/otto' : return (new Response("HI THERE!")); case '/app' :
				console.log(`Request: ${res}`);
				return (env.ASSETS.fetch(new URL("http://localhost:8787/app")));
				//return (ctx.waitUntil(env.ASSETS.fetch(new URL("http://localhost:8787/app"))));
			default:
				return (new Response("Not found!", { status: 404 }));
		};
	};

	async otto(url: unknown): Promise<Response> {
		switch (url) {
			case "/otto":
				//return ('https://ottocratesolver.com');
				//return (new Response.redirect(await workerApp.fetch('http://localhost:34979')));
				return (new Response("HI FROM OTTO!", { status: 200 }));
			default :
				return fetch(`https://ottocratesolver.com`);
		};
	};
};


export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);

		switch (url.pathname) {
			case '/':
				return (new Response("HI From Otto!"));
			case '/app' :
				return (env.ASSETS.fetch(new URL("http://localhost:8787/app")));
			default :
				return (new Response(workerApp.fetch(request)));
		};
		new (Response('Not found!', 404));
	},
} satisfies ExportedHandler<Env>;
