// ╭────────────────────────────────────────────────╮
// │ ╭────────────────────────────────────────────╮ │
// │ │ INFO: Here is the routes of the webcrater: │ │
// │ │               /__cspreport__               │ │
// │ │                 /new/login                 │ │
// │ │                    /otto                   │ │
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


const express =		require('express');
const compression =	require('compression');
const cors =		require('cors');
const take =		require('./controllers/estimate.controller.js');
const valid =		require('./middlewares/add.middleware.js');
const extAPI =		require('./controllers/external.API.request.js');
const userSet =		require('./controllers/user.controller.js');
const router =		express.Router();
const path =		require('path');
const log =			require('debug')('server:back');


// TODO: should send the home page when all be done.
router.use(express.json());
router.use(cors({origin: "http://localhost:83", Credential: true}));
router.use(express.static(path.join(__dirname)));
router.use(compression());

router.use((req, res, next) => {
	log(req.body, `Running: ${new Date().toISOString()}`);
	return(next());
});

router.post('/__cspreport__', (req, res) => {
	console.log(req.body);
	// TODO: sotore the info on data base.
});


router.post('/private/auth',
	userSet.userTokenMatch, userSet.userTokenExpTime,
	(req, res) => {
		res.status(200).json({ 'status' : 'active' });
});


router.post("/start", userSet.userLoginValidation, take.newLogin);


router.get("/", (req, res) => {
	res.status(200).redirect('/app');
});


router.post("/new/users",
	// (req, res) => res.redirect('/'),
	valid.validationBodyUserAdd,
	valid.dataUserChecker,
	userSet.insertNewUser
);


router.post("/shift/tokens", take.shiftTokens);


router.post("/new/estimate",
	valid.userDataValidation,
	valid.validationBodyEstimate,
	valid.dataEstimateChecker,
	take.addResultToDataBase
);


router.get("/logout", (req, res) => res.status(200).redirect('./otto/login/'));


router.get("/estimates/:ref_id", take.getDataEstimates);


router.put("/update/estimate", take.updateEstimate);


router.delete("/delete/estimate/:ref_id", take.removeEstimates);


router.get("/currency", extAPI.externalAPICurrency);

module.exports = router;
