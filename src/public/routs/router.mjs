import express from 'express';
import * as uuid from 'uuid';
export const router = express.Router();
router.use(express.json());


// Middleware that is specific to this router
// TODO: should send the home page when all be done.
router.use(express.static("./www/"));
router.use(express.static("./www/loggin"));


// define the home page route
router.get("/", (req, res) => {
	res.status(200).send("On-line!");
});


router.post("/login", (req, res, err) => {
	const { username, password } = req.body;
	if (username && password !== 'admin')
		return res.status(401).send('Invalid Username or password');
	const sessionId = uuid.v4();
	const sessions = {};

	sessions[sessionId] = { username, userId: 1 };
	res.set('Set-Cookie', `session=${sessionId}`);
	res.send('Work done');
});


router.get("/currency", async (req, res) => {
	let header = new Headers();
	header.append("apikey", process.env.API_KEY);
	const getterOptions = {
		method: 'GET',
		headers: header,
		redirect: 'follow'
	};
	const url = `https://api.freecurrencyapi.com/v1/latest?apikey=
	${process.env.API_KEY}`;
	const result = await fetch(url, getterOptions)
	.then(response => response.json())
	.catch(error => (console.error("warning", error)));
	console.log(result.data);

	res.status(200).send(result.data);
});
