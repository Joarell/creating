// ╭─────────────────────────────────────────────────────────╮
// │                     Otto API Routs.                     │
// ╰─────────────────────────────────────────────────────────╯

import { Hono } from 'hono';
import { OttoDBHandler } from './classes/Class.DB.Adapter';
import { getCurrency } from './currency.API';
import { serveStatic } from 'hono/serve-static';
import { logger } from 'hono/logger';

const app = new Hono<{ Bindings: CloudflareBindings }>();
app.use(logger());

app.use(async (req, next) => {
	//console.log(req);
	await next();
});

app.post('/api/v1/private/check', (c) => { });

app.post('/api/v1/private/auth', (c) => { });

app.post('/api/v1/login', async (c) => {
	console.log(await c.env.OTTO_USERS.get('TESTER'));
	return(await new OttoDBHandler(c).newLogin());
});

app.post('/api/v1/new/user', async (c) => {
	return(await new OttoDBHandler(c).addNewUser());
});

app.post('/api/v1/shift/tokens', async (c) => { });

app.post('/api/v1/newEstimate', async (c) => {
	return(await new OttoDBHandler(c).saveEstimate());
});

app.get('/', async (c) => {
	return (c.text('Hello from Hono!'));
	//const url: URL = new URL('http://localhost:8787/app');
	//return(c.redirect(url, 200));
	//await c.env.ASSETS.fetch(url);
});

app.post('/api/v1/Checks/:session', async (c) => { });

app.get('/api/v1/logout', async (c) => { });

app.get('/api/v1/takeLogins/:name', async (c) => { });

app.get('/api/v1/estimates/:ref_id', async (c) => { });

app.get('/api/v1/currencys', async (c) => {
	return(await getCurrency(c.env.API_KEY2));
});

app.put('/api/v1/update/estimates', async (c) => { });

app.get('/api/test', async (c) => {
	return new Response(await new OttoDBHandler(c).test());
});


export default app;
