const User = require('../../models/user')
const Item = require('../../models/item')
const Comment = require('../../models/comment')
const pendingUsers = require('../../models/pendingUsers')
const bcrypt = require('bcrypt')
const SALT = 7;

const createComment = (req,res)=>{

    const newItem = new Comment({
        "title":req.body.title,
        "comments":req.body.comments,
        "User":req.body.userId
    })
    
    newItem.save()
        .then((result)=>{
            res.status(200).json({"message":"Item added successfully "})
        })
        .catch((err)=>{
            res.status(400).json({"message":"error adding new comment"})
        })

}

const createItem = (req,res)=>{

    const newItem = new Item({
        "title":req.body.title,
        "description":req.body.description
    })
    
    newItem.save()
        .then((result)=>{
            res.status(200).json({"message":"Item added successfully "})
        })
        .catch((err)=>{
            res.status(400).json({
                "message":"error adding item, follow below parameters", 
                "fname":"Required",
                "lname":"Required",
                "email":"Required,Unique",
                "tel":"Unique",
                "password":"Required"})
        })

}


const HashGen = (saltRounds,PlaintextPassword)=>{
 
 salt = bcrypt.genSaltSync(saltRounds)
 result = bcrypt.hashSync(PlaintextPassword, salt)

return result;
}

const createUser = (req,res,successMsg={"message":"user added successfully "},failureMsg={
    "message":"error adding user, follow below parameters", 
    "fname":"Required",
    "lname":"Required",
    "email":"Required,Unique",
    "tel":"Unique",
    "password":"Required"}
    )=>{
   var hashPass= HashGen(SALT,req.body.password)

    const newItem = new User({
        "fname":req.body.fname,
        "lname":req.body.lname,
        "email":req.body.email,
        "password": hashPass,
        "tel":req.body.tel
    })
    
    newItem.save()
        .then((result)=>{
            res.status(200).json(successMsg)
        })
        .catch((err)=>{
            res.status(400).json(failureMsg)
        })
}

const createPendingUser = (req,res,token)=>{

    //var hashPass= HashGen(SALT,req.body.password)
 
     const newItem = new pendingUsers({
         "token":token,
         "fname":req.body.fname,
         "lname":req.body.lname,
         "email":req.body.email,
         "password": req.body.password,
         "tel":req.body.tel
     })
     
     newItem.save()
         .then((result)=>{
             res.status(200).json({"message":"user is in validation stage, please verify your email "})
         })
         .catch((err)=>{
             res.status(400).json({
             "message":"error adding user, follow below parameters", 
             "fname":"Required",
             "lname":"Required",
             "email":"Required,Unique",
             "tel":"Unique",
             "password":"Required"})
         })
 }

module.exports={createComment,createItem,createUser,HashGen,createPendingUser}