const express = require('express');
const router = express.Router();

const path = require('path')
const upload = require('../controllers/upload/uploadimg')
const DatabaseCreate = require('../controllers/database/create')
const DatabaseFind = require('../controllers/database/find')
const pay = require('../controllers/stripe/stripe')
const Auth = require('../controllers/auth/auth')

//checkout
router.post('/payment',pay.payment)
router.get('/donepay',pay.checkPaymentStatus)

//get all items
router.get('/getAllItems',DatabaseFind.findAllItems)

//Find
router.post('/findArrOfItems',DatabaseFind.findArrOfItems)

//Cash commands
router.post('/creatependingcommand',DatabaseCreate.createPendingCommand)
router.get('/validatetoken:token', DatabaseCreate.verifyToken)


//Login and recieve a cookie with a token
router.post('/login',Auth.LogIn)

//Toke Verification 
router.use(Auth.verifyAccessToken)

//Add page
router.get('/thepavel',(req,res)=>{
    res.render('addItem')
})
//All orders
router.get('/getallcommands',DatabaseFind.findAllDoneCommands)

//Create a new item
router.post('/createitem',upload.single('image'), DatabaseCreate.createItem)

module.exports = router;