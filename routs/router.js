// ╭────────────────────────────────────────────────╮
// │ ╭────────────────────────────────────────────╮ │
// │ │ INFO: Here is the routes of the webcrater: │ │
// │ │               /__cspreport__               │ │
// │ │                 /new/login                 │ │
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


// TODO: should send the home page when all be done.
router.use(express.json());
router.use(cors({origin: "http://127.0.0.1:3000", Credential: true}));
router.use(express.static(path.join(__dirname)));


router.post('/__cspreport__', (req, res) => {
	// TODO: sotore the info on data base.zz
});


router.post("/start",
	userSet.userLoginValidation,
	take.newLogin
);


router.get("/login", (req, res) => {
	res.status(200).sendFile(path.join(__dirname + '/login/index.html'));
});


router.get("/app",
	userSet.userTokenExpTime,
	(req, res) => {
	res.redirect("http://localhost:3001/app");
});


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
