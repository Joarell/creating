const express = require('express');
const uuid = require('uuid');
const take = require('../controllers/estimate.controller.js');
const valid = require('../middlewares/add.middleware.js');
const router = express.Router();


// Middleware that is specific to this router
// TODO: should send the home page when all be done.
router.use(express.static("./www/"));
router.use(express.json());


router.get("/search/users", take.getDataUsers);


router.get("/search/estimates", take.getDataEstimates);


router.get("/login", take.userLoginValidation);


router.post("/insert", valid.validationBodyEstimate, take.addResultToDataBase);


router.post("/insert/users", valid.validationBodyUserAdd, take.inserNewUser);


router.put("/estimates", valid.validationBodyEstimate, take.updateEstimate);


router.delete("/estimates/remove/:reference_id", take.removeEstimates);


// router.get("/login", (req, res, _err) => {
// 	const { username, password } = req.body;
// 	if (username && password !== 'admin')
// 		return res.status(401).send('Invalid Username or password');
// 	const sessionId = uuid.v4();
// 	const sessions = {};
//
// 	sessions[sessionId] = { username, userId: 1 };
// 	res.set('Set-Cookie', `session=${sessionId}`);
// 	res.send('Work done');
// });


router.get("/currency", async (_req, res) => {
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

module.exports = router;
