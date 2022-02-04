const express = require('express');
const router = express.Router();

const path = require('path')
const upload = require('../controllers/upload/uploadimg')
const DatabaseCreate = require('../controllers/database/create')
const DatabaseFind = require('../controllers/database/find')
const pay = require('../controllers/stripe/stripe')
const Auth = require('../controllers/auth/auth')


router.get('/getAllItems',DatabaseFind.findAllItems)
router.get('/api/getAllItems',DatabaseFind.findAllItems)


router.post('/api/payment',pay.payment)
router.get('/api/donepay',pay.checkPaymentStatus)

//Find
router.post('/api/findArrOfItems',DatabaseFind.findArrOfItems)

//Above requires authentication with /login
router.post('/api/login',Auth.LogIn)

module.exports = router;