import express from 'express';
// import { router } from './router.mjs';
// import * as path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1';
const port = 3001;


// app.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname, '/index.html'));
// });


app.use( express.static("."));


app.route("/").get((req, res) => {
	res.send("We are off-line. :(");
});


app.listen(PORT, () => {
	console.log(`App running and listening on port ${PORT}!`)
});


// app.listen(port, HOST)
app.listen(PORT, HOST)
