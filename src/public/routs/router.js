// ╭────────────────────────────────────────────────╮
// │ ╭────────────────────────────────────────────╮ │
// │ │ INFO: Here is the routes of the webcrater: │ │
// │ │                    /www                    │ │
// │ │                   /login                   │ │
// │ │                  /logout                   │ │
// │ │              /insert/estimate              │ │
// │ │               /insert/users                │ │
// │ │                   /token                   │ │
// │ │                 /currency                  │ │
// │ │              /search/estimate              │ │
// │ │      /estimates/remove/:reference_id       │ │
// │ ╰────────────────────────────────────────────╯ │
// ╰────────────────────────────────────────────────╯


const express	= require('express');
const cors		= require('cors');
// const uuid		= require('uuid');
const take		= require('../controllers/estimate.controller.js');
const valid		= require('../middlewares/add.middleware.js');
const extAPI	= require('../controllers/external.API.request.js');
const userSet	= require('../controllers/user.controller.js');
const router	= express.Router();
const path		= require('path');


// Middleware that is specific to this router
// TODO: should send the home page when all be done.
router.use(express.static(path.join(__dirname, '../www/loggin/')));
router.use(express.json());
router.use(cors({origin: "http://127.0.0.1:3000", Credential: true}));


router.post("/login",
	userSet.userLoginValidation,
	take.newLogin
);


// TODO: route not tested yet
router.get("/logout", userSet.userLoginValidation);


router.post("/estimate",
	userSet.userTokenMatch,
	valid.userDataValidation,
	userSet.userTokenExpTime,
	valid.validationBodyEstimate,
	valid.dataEstimateChecker,
	take.addResultToDataBase
);


router.post("/new/users",
	valid.validationBodyUserAdd,
	valid.dataUserChecker,
	userSet.inserNewUser
);


router.post("/token",
	userSet.userTokenMatch,
	userSet.userTokenExpTime,
	take.shiftTokens,
);


router.get("/currency",
	userSet.userTokenExpTime,
	extAPI.externalAPICurrency
);


router.get("/estimates",
	userSet.userTokenExpTime,
	take.getDataEstimates
);


router.put("/estimates",
	userSet.userTokenExpTime,
	take.updateEstimate
);


router.delete("/estimatese/:reference_id",
	userSet.userTokenExpTime,
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
