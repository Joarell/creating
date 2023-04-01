
const express	= require('express');
const router	= require('./routs/router.js');
const app		= express();
const port		= process.env.PORT || 3000;


app.use((req, res, next ) => {
	res.setHeader(
		'Report-TO',
		'{"group":"csp-endpoint", "max_age":10886400, "endpoints":[{"url":"http://localhost:3000/__cspreport__"}], "include_subdomains":true}'
	);
	res.setHeader(
		'Content-Security-Policy-Report-Only',
		"default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self' https://fonts.google.com"
	);
	next();
});

app.use(router);
app.listen(port, () => {
	console.log(`App running and listening on port ${port}!`)
});
