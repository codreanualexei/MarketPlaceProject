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
router.get('/getAllItems',DatabaseFind.findAllItems)
//Find
router.post('/findArrOfItems',DatabaseFind.findArrOfItems)

//Above requires authentication with /login
router.post('/login',Auth.LogIn)

module.exports = router;