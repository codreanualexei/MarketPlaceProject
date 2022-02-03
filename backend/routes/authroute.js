const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth/auth')
const Create = require('../controllers/database/create')

//AuthEmailUsingToken
//router.get('/validatetoken:token', Auth.verifyEmailUsingToken)
//router.get('/validatetoken:token', Create.verifyToken)

//Authentication
//router.post('/singup',Create.createUser)
router.post('/login',Auth.LogIn)
router.use(Auth.verifyAccessToken)

//login Super
router.get('/thepavel',(req,res)=>{
    res.render('addItem')
})

module.exports = router;