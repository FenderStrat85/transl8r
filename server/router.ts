const router = require('express').Router();
const authController = require('./controllers/authentication');
const languagesController = require('./controllers/languages');
const jobsController = require('./controllers/jobs');

// auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// jobs routes
router.post('/createJob', jobsController.createJob);
router.post('/acceptJob', jobsController.acceptJob);

// languages routes
router.post('/addLang', languagesController.addLang);

export = router;
