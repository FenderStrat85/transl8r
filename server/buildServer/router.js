"use strict";
var router = require('express').Router();
var authController = require('./controllers/authentication');
var jobsController = require('./controllers/jobs');
var imageController = require('./controllers/images');
var chatController = require('./controllers/chat');
var authMiddleware = require('./middlewares/auth');
var videoChatController = require('./controllers/videoChats');
// TODO: add correct codes for the status in all the controllers
// auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/isTokenValid', authController.isTokenValid);
// jobs routes
router.get('/getJobs/:status', authMiddleware, jobsController.getJobs);
router.get('/getAvailableJobs', authMiddleware, jobsController.getAvailableJobs);
router.post('/createJob/:type', authMiddleware, jobsController.createJob);
router.put('/acceptJob', authMiddleware, jobsController.acceptJob);
router.put('/changeStatus/:jobId/:status', authMiddleware, jobsController.changeStatus);
router.put('/setNotificationFalse', authMiddleware, jobsController.setNotificationToFalse);
router.delete('/deleteJob/:id', authMiddleware, jobsController.deleteJob);
// images router
router.get('/getImageUrl/:jobId', authMiddleware, imageController.getImageUrl);
router.put('/addTranslatedImage/:jobId', authMiddleware, imageController.uploadTranslatedImageUrl);
router.put('/addTranslatedTextOfImage/:jobId', authMiddleware, imageController.uploadTranslatedTextOfImage);
router.get('/fetchImageData/:jobId', authMiddleware, imageController.fetchImageData);
// chat router
router.post('/postMessage', authMiddleware, chatController.createMessage);
router.get('/getChatMessages/:jobId', authMiddleware, chatController.getChatMessages);
// videoChat router
router.post('/insertSocketId', authMiddleware, videoChatController.insertSocketId);
router.get('/retrieveSocketId/:jobId', authMiddleware, videoChatController.retrieveSocketId);
module.exports = router;