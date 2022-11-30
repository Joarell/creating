import express from 'express';
import { router } from './router.mjs';
const app = express();
const port = 3000;


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

app.listen(port, () => {
	console.log(`App running and listening on port ${port}!`)
});
