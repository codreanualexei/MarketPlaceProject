const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth/auth')


//AuthEmailUsingToken
router.get('/validatetoken:token', Auth.verifyEmailUsingToken)

//Authentication
router.post('/singup',Auth.SingUp)
router.post('/login',Auth.LogIn)
router.post('/verifyToken',Auth.verifyAccessToken)
module.exports = router;