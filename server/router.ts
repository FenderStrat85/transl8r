const router = require('express').Router();
const authController = require('./controllers/authentication');
const languagesController = require('./controllers/languages');

// auth routes
router.post('/register', authController.register);

// languages routes
router.post('/addLang', languagesController.addLang);

export = router;
