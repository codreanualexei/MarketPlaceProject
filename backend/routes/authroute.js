const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth/auth')


//AuthEmailUsingToken
router.get('/validatetoken:token', Auth.verifyEmailUsingToken)

//Authentication
router.post('/singup',Auth.SingUp)
router.post('/login',Auth.LogIn)
router.post('/verifyToken',Auth.verifyAccessToken)

//login Super
router.get('/SuperPavel:login',(req,res)=>{
    var tmp = req.params.login
    const pass = tmp.slice(1)
    
    console.log(req.params)
    if(pass ===process.env.SUPERPASS){
        res.render('addItem')
    }else{
        res.status(400)
    }

})
module.exports = router;