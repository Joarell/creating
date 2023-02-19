const express = require('express');
const uuid = require('uuid');
const take = require('../controllers/estimate.controller.js');
const valid = require('../middlewares/add.middleware.js');
const router = express.Router();


// Middleware that is specific to this router
// TODO: should send the home page when all be done.
router.use(express.static("./www/"));
router.use(express.json());


router.get("/login", take.userLoginValidation, );


router.post("/insert",
	valid.validationBodyEstimate,
	valid.userTokenCheckOut,
	take.addResultToDataBase
);


router.post("/insert/users", valid.validationBodyUserAdd, take.inserNewUser);


router.post('/token', (req, res) => {

});


router.get("/currency", valid.userTokenCheckOut, take.externalAPICurrency);


// router.get("/search/users", take.getDataUsers);


router.get("/search/estimates",
	valid.userTokenCheckOut,
	take.getDataEstimates );


router.put("/estimates",
	valid.validationBodyEstimate,
	valid.userTokenCheckOut,
	take.updateEstimate
);


router.delete("/estimates/remove/:reference_id", take.removeEstimates );


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
