const router = require('express').Router();
const authController = require('./controllers/authentication');
const languagesController = require('./controllers/languages');
const jobsController = require('./controllers/jobs');

// auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// job routes
router.post('/createJob', jobsController.createJob);

// languages routes
router.post('/addLang', languagesController.addLang);

export = router;
