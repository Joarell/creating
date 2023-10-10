

const express =	require('express');
const app =		express();
const port =	process.env.PORT1 || 3001;
const path =	require('path');

const bigShoulders =	'https://fonts.gstatic.com/s/bigshouldersstencildisplay/v28/6aeZ4LS6U6pR_bp5b_t2ugOhHWFcxSGP9ttD96KCb8xPytKb-oPRU-vkuLm_3E__L3bm.woff2';
const mitr1 =			'https://fonts.gstatic.com/s/mitr/v11/pxiLypw5ucZF-Tw4MQ.woff2';
const mitr2 =			'https://fonts.gstatic.com/s/mitr/v11/pxiEypw5ucZF8c8bJJfecg.woff2';
const saira1 =			'https://fonts.gstatic.com/s/sairasemicondensed/v13/U9MD6c-2-nnJkHxyCjRcnMHcWVWV1cWRRX8MaOY.woff2';
const saira2 =			'https://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXf_S_MRiXk.woff2';
const saira3 =			'https://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXf_S_MRiXk.woff2';
const nerdFont1 =		'https://www.nerdfonts.com/assets/css/webfont.css';
const nerdFont2 =		'https://www.nerdfonts.com/assets/fonts/Symbols-2048-em%20Nerd%20Font%20Complete.woff2';
const nerdFont3 =		'https://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXe3TfMRiXk.woff2';
const nerdFont4 =		'https://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXe3TfMRiXk.woff2';
const nerdFont5 =		'https://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXe3TfMRiXk.woff2';
const nerdFont6 =		'https://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXe3TfMRiXk.woff2';

app.use((req, res, next) => {
	res.setHeader(
		'Report-TO',
		'{"group":"csp-endpoint", "max_age":10886400, "endpoints":[{"url":"http://localhost:3000/__cspreport__"}], "include_subdomains":true}'
	);
	res.setHeader(
		'Content-Security-Policy-Report-Only',
		`default-src 'self';\
		font-src ${bigShoulders} ${mitr1} ${mitr2} ${saira1} ${saira2} ${saira3} ${nerdFont1} ${nerdFont2} ${nerdFont3} ${nerdFont4} ${nerdFont5} ${nerdFont6};\
		img-src 'self';\
		script-src 'self';\
		style-src ${nerdFont1} 'self';\
		frame-src 'self'`
	);
	res.setHeader('Accept', 'text/html, text/css, application/javascript');
	// res.setHeader('Cache-Control', 'public, max-age=2592000');
	next();
});

app.get('/app', (req, res) => {
	app.use('/app', express.static(__dirname + '/app'));
	res.status(200).sendFile(path.join(__dirname));
	console.log('App Actived!');
});

app.listen(port, () => {
	console.log(`App running and listening on port ${port}!`)
});
