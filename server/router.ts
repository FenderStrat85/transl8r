const router = require('express').Router();
const authController = require('./controllers/authentication')

router.post('/register', authController.register)

export = router;
