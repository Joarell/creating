import { WorkerEntrypoint } from 'cloudflare:workers';
import workerApp from './worker.app';

export default class extends WorkerEntrypoint {
//class Tester extends WorkerEntrypoint {
	async fetch(request) {
		return (new Response(await workerApp.fetch(request)));
	};

	otto(url: unknown): Promise<Response> {
		switch (url) {
			case "/otto":
				return (new Response.redirect(workerApp.fetch(request)));
				//return('https://ottocratesolver.com');
			default :
				return(new URL('https://ottocratesolver.com'));
		};
	};
};
