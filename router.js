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
const take		= require('./controllers/estimate.controller.js');
const valid		= require('./middlewares/add.middleware.js');
const extAPI	= require('./controllers/external.API.request.js');
const userSet	= require('./controllers/user.controller.js');
const router	= express.Router();
const path		= require('path');


// TODO: should send the home page when all be done.
router.use(express.json());
router.use(cors({origin: "http://localhost:80", Credential: true}));
router.use(express.static(path.join(__dirname)));


router.post('/__cspreport__', (req, res) => {
	console.log(req.body);
	// TODO: sotore the info on data base.
});


router.post('/private/auth',
	userSet.userTokenExpTime,
	(req, res) => {
		res.set({
			'Cache-Control': 'max-age=10; must-revalidate',
		});
		res.status(200).send("ok!");
	}
);


router.post("/start",
	userSet.userLoginValidation,
	take.newLogin
);


router.get("/", (req, res) => {
	res.status(200).redirect('./www/login/');
	console.log('Running');
});


// TODO: route not tested yet
router.get("/logout", userSet.userLoginValidation);


router.post("/estimate/:token",
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


router.get("/currency", extAPI.externalAPICurrency
);


router.get("/estimates/:token", take.getDataEstimates
);


router.put("/estimate/:token",
	userSet.userTokenExpTime,
	take.updateEstimate
);


router.delete("/delete/estimate/:reference_id",
	userSet.userTokenExpTime,
	take.removeEstimates
);

module.exports = router;
