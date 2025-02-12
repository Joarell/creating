// ╭─────────────────────────────────────────────────────────╮
// │                     Otto API Routs.                     │
// ╰─────────────────────────────────────────────────────────╯

import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { ControllerAPI } from './controller';
import { CloudflareBindings } from '../worker-configuration';
import { bearerAuth } from 'hono/bearer-auth';

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(logger());

app.use('/api/v1/new/*', (c, next) => {
	const checker = bearerAuth({ token: c.env.MASTER_KEY });
	return(checker(c, next));
});

app.post('/api/v1/login', async (c) => {
	const controller = new ControllerAPI(c);
	return(await controller.login);
});

app.post('/api/v1/boot/login', async (c) => {
	const controller = new ControllerAPI(c);
	return(await controller.login);
});

app.post('/api/v1/new/pass/phrase', async (c) => {
	const controller = new ControllerAPI(c);
	return(await controller.updateUserPass);
});

app.post('/api/v1/new/user', async (c) => {
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
});

app.post('/api/v1/logout', async (c) => {
	const controller = new ControllerAPI(c);
	return(await controller.logOut);
});

app.post('/api/v1/estimates/:ref_id', async (c) => {
	const controller = new ControllerAPI(c);
	return(await controller.searchEstimate);
});

app.post('/api/v1/currencies', async (c) => {
	const controller = new ControllerAPI(c);
	return(await controller.requestCurerncyAPI);
});

app.put('/api/v1/update/estimates', async (c) => {
	const controller = new ControllerAPI(c);
	return(await controller.updatePrevEstimate);
});

export default app;
