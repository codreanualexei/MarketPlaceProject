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

//Add
router.post('/addItemToUser',DatabaseAdd.findUserByemailAndAddItem)
router.post('/addLikeToItem',DatabaseAdd.findItemByIdAndAddLike)
router.post('/addCommentToItem',DatabaseAdd.findItemByIdAndAddComment)
router.post('/addLikeToComment',DatabaseAdd.findCommentByIdAndAddLike)

//Find
router.post('/finduser',DatabaseFind.findUser)
router.post('/finduserById',DatabaseFind.findUserByid)
router.post('/findUserByEmail', DatabaseFind.findUserByemail)
router.get('/getAllUsers',DatabaseFind.findAllUsers)
router.get('/getAllItems',DatabaseFind.findAllItems)


//Update
 router.post('/findUserByIdAndUpdate',DatabaseUpdate.findUserByidAndUpdate)

 //Delete
 router.post('/deleteUserById',DatabaseDelete.findUserByIdAndDelete)

//checkout
router.post('/payment',pay)

module.exports = router;