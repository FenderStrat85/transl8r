const router = require('express').Router();
const authController = require('./controllers/authentication');
const jobsController = require('./controllers/jobs');
const imageController = require('./controllers/images');
const chatController = require('./controllers/chat');
const authMiddleware = require('./middlewares/auth');

// TODO: add correct codes for the status in all the controllers

// auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// jobs routes
router.post('/createJob/:type', authMiddleware, jobsController.createJob);
router.put('/acceptJob', authMiddleware, jobsController.acceptJob);
router.put(
  '/changeStatus/:jobId/:status',
  authMiddleware,
  jobsController.changeStatus,
);
router.get('/getJobs/:status', authMiddleware, jobsController.getJobs);
router.get(
  '/getAvailableJobs',
  authMiddleware,
  jobsController.getAvailableJobs,
);

// images router
router.get('/getImageUrl/:jobId', authMiddleware, imageController.getImageUrl);
router.put(
  '/addTranslatedImage/:jobId',
  authMiddleware,
  imageController.uploadTranslatedImageUrl,
);
router.put(
  '/addTranslatedTextOfImage/:jobId',
  authMiddleware,
  imageController.uploadTranslatedTextOfImage,
);
router.get(
  '/fetchImageData/:jobId',
  authMiddleware,
  imageController.fetchImageData,
);

// chat router
router.post('/postMessage', authMiddleware, chatController.createMessage);
router.get(
  '/getChatMessages/:jobId',
  authMiddleware,
  chatController.getChatMessages,
);

export = router;
