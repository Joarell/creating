

const express	= require('express');
const app		= express();
const port		= process.env.PORT1 || 3001;
const path		= require('path');


app.use((req, res, next) => {
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

app.get('/app', (req, res) => {
	// app.use(express.static(path.join(__dirname)));
	app.use(express.static('/app'));
	res.status(200).sendFile(path.join(__dirname));
	console.log('passed');
});

app.listen(port, () => {
	console.log(`App running and listening on port ${port}!`)
});
