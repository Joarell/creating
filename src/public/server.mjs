import express from 'express';
import { router } from './router.mjs';
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';


// app.use(express.static("loggin"));
// app.use(express.static("public"));

// app.get("/", (req, res) => {
// 	res.send(
// 		"App is out at the moment. We are going return soon. \
// 		Thank you for you patience!"
// 	);
// });

app.use( express.static("."));

app.route("/").get((req, res) => {
	res.send("We are off-line. :(");
});

// app.listen(PORT, () => {
// 	console.log(`App running and listening on port ${PORT}!`)
// });

app.listen(PORT, HOST)
