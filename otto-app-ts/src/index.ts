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

//import { WorkerEntrypoint } from 'cloudflare:workers';
//import workerApp from './worker.app';
//import linkWorker from './link.worker';

//export default class extends WorkerEntrypoint {
//	async fetch() {
//		return(new Response("Hello from Otto APP!"), { status: 200 });
//	}
//
//	async app(request: string): Promise<Response> {
//		console.log(request)
//		switch (request) {
//			case '/' :
//				return (new Response("HI THERE!"));
//			case '/app' :
//				return (new Response(env.ASSETS.fetch(request)));
//			default:
//				return (new Response("Not found!", { status: 404 }));
//		};
//	};
//
//	async otto(url: unknown): Promise<Response> {
//		switch (url) {
//			case "/otto":
//				//return ('https://ottocratesolver.com');
//				//return (new Response.redirect(await workerApp.fetch('http://localhost:34979')));
//				return (new Response("HI FROM OTTO!", { status: 200 }));
//			default :
//				return fetch(`https://ottocratesolver.com`);
//		};
//	};
//};


export default {
	async fetch(request, env, ctx): Promise<Response> {
		let res = await fetch(request);
		console.log(res)
		const url = new URL(request.url);

		switch (url.pathname) {
			case '/':
				return (new Response("HI From Otto!"));
			case '/app' :
				return (env.ASSETS.fetch(request));
			default :
				return (await new Response(workerApp.fetch(request)));
		};
		new (Response('Not found!', 404));
	},
} satisfies ExportedHandler<Env>;
