export interface Env {
	DB: D1Database;
}

export default {
	async fetch (request, env ): Promise<Response> {
		const { pathname } = new URL(request.url)

		if (pathname === "/api/beverages") {
			const { results } = await env.DB.prepare(
				"SELECT * FROM Customers WHERE CompanyName = ?",
			).bind("Bs Beverages").all();
			return (Response.json(results));
		}
		return (new Response(
			"Call /api/beverages to see everyone who whorks at Bs Beverages",
		));
	},
} satisfies ExportedHandler<Env>;
