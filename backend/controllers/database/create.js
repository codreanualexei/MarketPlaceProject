const User = require('../../models/user')
const Item = require('../../models/item')
const Comment = require('../../models/comment')
const pendingUsers = require('../../models/pendingUsers')
const pendingCommands = require('../../models/pendingCommands')
const delay = ms => new Promise(res => setTimeout(res, ms));
const bcrypt = require('bcrypt')
const SALT = 7;

const createComment = async (req,res)=>{
    var result

    const newItem = new Comment({
        "title":req.body.title,
        "comments":req.body.comments,
        "User":req.body.userId
    })
    
    try{
    result = await newItem.save()
    }
    catch(err){
    result = err
    }
    return result
}

const createItem = (req,res)=>{
console.log(req.body)

    const newItem = new Item({
        "title":req.body.title,
        "description":req.body.description,
        "price": req.body.price
    })

    if(req.file) newItem.image = req.file.path
    else{
         res.status(400).json({"message":"Format supported for the image is PNG and PDF having 1024x1024 Px"})
         return
    }
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
                "price":"Required",
                "tel":"Unique",
                "password":"Required",
                "error":err})
        })

}

const createPendingCommand = async (req,res)=>{
    var total=0
    var listItems=req.body.itemList
    var price=0
    var units=0

    console.log(listItems)
    

    listItems.forEach(element => {
        Item.findById(element._id)
        .then(response=>{
            if(!response) res.status(400).json({"message":"Item wasn't found"})
            console.log("gasit :")
            price=response.price
            units=element.units
            total = total + (price*units)
            console.log(price)
            console.log(units)
            console.log(total)
        })
        .catch(er=>{
            res.status(400).json({"message":"Element having id: "+element._id+" was not found"})
        })
        
    });

    //waite for calculation...
    await delay(3000)
    if(total==0) await delay(5000)
    if(total==0) res.status(400).json({"message":"timeout, problem with loading data from database"})

    const newItem = new pendingCommands({
        "type":req.body.type,
        "user":req.body.userId,
        "description":req.body.description,
        "total": total,
        "items": listItems

    })
    
    newItem.save()
        .then((result)=>{
            res.status(200).json({"message":"List of items added successfully ",result})
        })
        .catch((err)=>{
            res.status(400).json({
                "userId":"required", 
                "description":"Required",
                "itemList":"Required"
                })
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

module.exports={createComment,createItem,createUser,HashGen,createPendingUser,createPendingCommand}