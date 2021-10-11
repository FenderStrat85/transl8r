const router = require('express').Router();
const authController = require('./controllers/authentication');
const languagesController = require('./controllers/languages');
const jobsController = require('./controllers/jobs');
const authMiddleware = require('./middlewares/auth');

// TODO: add correct codes for the status in all the controllers

// auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// jobs routes
router.post('/createJob', authMiddleware, jobsController.createJob);
router.put('/acceptJob', authMiddleware, jobsController.acceptJob);
router.get('/getJobs/:id/:role', authMiddleware, jobsController.getJobs);
router.get(
  '/getAvailableJobs/:id',
  authMiddleware,
  jobsController.getAvailableJobs,
);

// languages routes
router.post('/addLang', languagesController.addLang);

export = router;
