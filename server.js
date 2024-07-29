
const log = require('debug')('server:back');
const express =	require('express');
const router=	require('./router.js');
const app =		express();
const port =	process.env.PORT || 3004;

app.use(router);
app.use((req, res, next) => {
	log('app running and listening on port:', req.body)
	return(next());
}).listen(port, () => {
	console.log(`App running and listening on port ${port}!`)
});
