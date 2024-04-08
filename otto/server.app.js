

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

const iframe1 =			'https://ottocratesolver.com/app/panels/status_panel.html'
const iframe2 =			'https://ottocratesolver.com/app/panels/pane1_crates.html'
const iframe3 =			'https://ottocratesolver.com/app/panels/pane2_crates.html'

// const script1 =			'https://*/panels/status.panel.mjs'
// const script2 =			'https://*/panels/pane1.module.mjs'
// const script3 =			'https://*/panels/pane2.module.mjs'

app.use((req, res, next) => {
	res.setHeader(
		'Report-TO',
		'{"group":"csp-endpoint", "max_age":10886400, "endpoints":[{"url":"https://ottocratesolver.com/__cspreport__"}], "include_subdomains":true}'
		// '{"group":"csp-endpoint", "max_age":10886400, "endpoints":[{"url":"http://localhost:3000/__cspreport__"}], "include_subdomains":true}'
	);
	res.setHeader(
		'Content-Security-Policy',
		`default-src 'self';\
		font-src 'self' ${bigShoulders} ${mitr1} ${mitr2} ${saira1} ${saira2} ${saira3} ${nerdFont1} ${nerdFont2} ${nerdFont3} ${nerdFont4} ${nerdFont5} ${nerdFont6};\
		img-src 'self';\
		script-src 'self';\
		style-src 'self' ${nerdFont1};\
		frame-src 'self' ${iframe1} ${iframe2} ${iframe3};\
		connect-src 'self' ${bigShoulders} ${mitr1} ${mitr2} ${saira1} ${saira2} ${saira3} ${nerdFont1} ${nerdFont2} ${nerdFont3} ${nerdFont4} ${nerdFont5} ${nerdFont6};\
	`);
	res.setHeader('Accept', 'text/html, text/css, image/x-icon, image/png application/javascript');
	// res.setHeader('Cache-Control', 'public, max-age=2592000');
	next();
});

app.get('/app', (req, res) => {
	app.use('/app', express.static(__dirname + '/app'));
	res.status(200).sendFile(path.join(__dirname));
	console.log('App Activated!');
});

app.listen(port, () => {
	console.log(`App running and listening on port ${port}!`)
});
