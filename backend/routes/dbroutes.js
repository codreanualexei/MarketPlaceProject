const express = require('express');
const router = express.Router();
const DatabaseCreate = require('../controllers/database/create')
const DatabaseFind = require('../controllers/database/find')
const DatabaseAdd = require('../controllers/database/add')
const DatabaseUpdate= require('../controllers/database/update')
const DatabaseDelete = require('../controllers/database/delete')
const upload = require('../controllers/upload/uploadimg')
const pay = require('../controllers/stripe/stripe')

const Auth = require('../controllers/auth/auth')



//Verify Token everytime when user try to access database
//router.use(Auth.verifyAccessToken)

//Create
router.post('/createitem',upload.single('image'), DatabaseCreate.createItem)
router.post('/createcomment', DatabaseCreate.createComment)
router.post('/creatependingcommand',DatabaseCreate.createPendingCommand)


//Find
router.post('/findArrOfItems',DatabaseFind.findArrOfItems)
router.get('/getAllItems',DatabaseFind.findAllItems)


//checkout
router.post('/payment',pay.payment)
router.get('/donepay',pay.checkPaymentStatus)

router.get('/getallcommands',DatabaseFind.findAllDoneCommands)

module.exports = router;