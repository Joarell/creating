
const express =	require('express');
const router=	require('./router.js');
const app =		express();
const port =	process.env.PORT || 3000;

app.use(router);
app.listen(port, () => {
	console.log(`App running and listening on port ${port}!`)
});
