// ╭─────────────────────────────────────────────────────────╮
// │                     Otto API Routs.                     │
// ╰─────────────────────────────────────────────────────────╯

import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { ControllerAPI } from './controller';
import { CloudFlareBindings } from '../worker-configuration';

const app = new Hono<{ Bindings: CloudFlareBindings }>();
app.use(logger());

app.use(async (req, next) => {
	//console.log(req);
	await next();
});

//app.post('/api/v1/private/check', (c) => { });

//app.post('/api/v1/private/auth', (c) => { });

app.post('/api/v1/login', async (c) => {
	const controller = new ControllerAPI(c);
	return(await controller.login);
});

app.post('/api/v1/newUser', async (c) => {
	const controller = new ControllerAPI(c);
	return(await controller.addingNewUser);
});

app.post('/api/v1/shift/tokens', async (c) => {
	const controller = new ControllerAPI(c);
	return(await controller.updateTokens);
});

app.post('/api/v1/newEstimate', async (c) => {
	const controller = new ControllerAPI(c)
	return(await controller.saveEstimateResult);
});

app.get('/', async (c) => {
	return (c.text('Hello from Hono!'));
	//const url: URL = new URL('http://localhost:8787/app');
	//return(c.redirect(url, 200));
	//await c.env.ASSETS.fetch(url);
});

//app.post('/api/v1/Checks/:session', async (c) => { });

app.get('/api/v1/logout', async (c) => {
	const controller = new ControllerAPI(c);
	return(await controller.logOut);
});

//app.get('/api/v1/takeLogins/:name', async (c) => { });

app.get('/api/v1/estimates/:ref_id', async (c) => {
	const controller = new ControllerAPI(c);
	return(await controller.searchEstimate);
});

app.get('/api/v1/currencys', async (c) => {
	const controller = new ControllerAPI(c);
	return(await controller.requestCurerncyAPI);
});

app.put('/api/v1/update/estimates', async (c) => {
	const controller = new ControllerAPI(c);
	return(await controller.updatePrevEstimate);
});

//app.get('/api/test', async (c) => {
//	return new Response(await new OttoDBHandler(c).test());
//});

export default app;
