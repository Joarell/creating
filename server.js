
const log = require('debug')('api:back-server');
const express =	require('express');
const router=	require('./router.js');
const app =		express();
const port =	process.env.PORT || 3000;

app.use(router);
app.listen(port, () => {
	log(`App running and listening on port ${port}!`)
});
