const express = require('express');
const router = express.Router();

const path = require('path')
const upload = require('../controllers/upload/uploadimg')
const DatabaseCreate = require('../controllers/database/create')
const DatabaseFind = require('../controllers/database/find')
const pay = require('../controllers/stripe/stripe')
const Auth = require('../controllers/auth/auth')

//Toke Verification 
router.use(Auth.verifyAccessToken)

//Pagina de adaugat
router.get('/thepavel',(req,res)=>{
    res.render('addItem')
})
router.get('/getallcommands',DatabaseFind.findAllDoneCommands)
router.post('/createitem',upload.single('image'), DatabaseCreate.createItem)
router.post('/creatependingcommand',DatabaseCreate.createPendingCommand)

module.exports = router;