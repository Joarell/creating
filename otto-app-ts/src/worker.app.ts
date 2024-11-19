interface Env {
	ASSETS: Fetcher;
};

export default {
	async fetch(request, env, ctx): Promise<Response> {
		return (new URL(request.url).pathname.startsWith('/') ?
			env.ASSETS.fetch(request):
			new Response("Not Founld!", 404)
		)
	},
} satisfies ExportedHandler<Env>;
