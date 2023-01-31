import express from 'express';
// import { router } from './router.mjs';
// import * as path from 'path';

const app = express();
const port = process.env.PORT || 3000;
const HOST = 'localhost';


app.use( express.static("./www"));


// app.route("/").get((req, res) => {
// 	res.render("./www/index.html");
// });

app.route("/").get((req, res) => {
	res.send("We are off-line. :(");
});


app.listen(port, () => {
	console.log(`App running and listening on port ${port}!`)
});

app.listen(port, HOST)
