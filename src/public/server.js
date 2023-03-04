const express	= require('express');
const router	= require('./routs/router.js');
const app		= express();
const port		= process.env.PORT || 3000;
const HOST		= 'localhost';


app.use(express.json());
app.use(router);
app.listen(port, () => {
	console.log(`App running and listening on port ${port}!`)
});
app.listen(port, HOST)

