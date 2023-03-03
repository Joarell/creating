

const express = require('express');
const uuid = require('uuid');
const take = require('../controllers/estimate.controller.js');
const valid = require('../middlewares/add.middleware.js');
const router = express.Router();
const extAPI = require('../controllers/external.API.request.js');
const userSet = require('../controllers/user.controller.js');


// Middleware that is specific to this router
// TODO: should send the home page when all be done.
router.use(express.static("./www/"));
router.use(express.json());


router.get("/login", userSet.userLoginValidation, );


router.get("/logout", userSet.userLoginValidation, );


// FIX: provide the access on the request body
router.post("/insert/estimate",
	valid.validationBodyEstimate,
	// userSet.userTokenCheckOut,
	take.addResultToDataBase
);


router.post("/insert/users", valid.validationBodyUserAdd, userSet.inserNewUser);


router.post('/token', userSet.newAccessToken);


router.get("/currency", valid.userTokenCheckOut, extAPI.externalAPICurrency);


router.get("/search/estimates", valid.userTokenCheckOut, take.getDataEstimates);


router.put("/update/estimates", valid.userTokenCheckOut, take.updateEstimate);


router.delete("/estimates/remove/:reference_id",
	valid.userTokenCheckOut,
	take.removeEstimates
);


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

module.exports = router;
