const User = require('../../models/user')
const Item = require('../../models/item')
const Comment = require('../../models/comment')
const pendingUsers = require('../../models/pendingUsers')
const pendingCommands = require('../../models/pendingCommands')
const doneCommands = require('../../models/doneCommands')
const delay = ms => new Promise(res => setTimeout(res, ms));
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const SALT = 7;
const auth = require('../auth/auth')


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

    const newItem = {
        "title":req.body.title,
        "description":req.body.description,
        "price": req.body.price,
        "stoc":req.body.stoc
    }

    console.log("req.file:",req.file)

    if(req.file != null){
        newItem.image = req.file.path

        Item.findOneAndUpdate({title:req.body.title }, newItem, {upsert: true}, function(err, doc) {
            if (err){
                res.status(400).json({
                    "message":"error adding item, follow below parameters", 
                    "fname":"Required",
                    "lname":"Required",
                    "email":"Required,Unique",
                    "price":"Required",
                    "tel":"Unique",
                    "password":"Required",
                    "error":err})
            }else{
                res.status(200).json({"message":"Item added successfully "})
            }
            
        });
    } 
    else{
         res.status(400).json({"message":"Format supported for the image is PNG and JPG having 1024x1024 Px"})
         return
    }

    

}

const createPendingCommand = async (req,res)=>{
    var total=0
    var listItems=req.body.itemList
    var price=0
    var units=0
    var email = req.body.email

    console.log(listItems)
    console.log("body: ", req.body)
    

    listItems.forEach(element => {
        Item.findById(element._id)
        .then(response=>{
            if(!response){
                res.status(400).json({"message":"Item wasn't found"})
                return
            } 
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
        "email":req.body.email,
        "description":req.body.description,
        "total": total,
        "items": listItems

    })
    
    newItem.save()
        .then((result)=>{

            res.status(200).json({"message":"List of items added successfully ",result})
            
        })
        .then(  (res)=>{
            auth.sendEmai(email,email+"::"+newItem._id.toString())
        })
        .catch((err)=>{
            res.status(400).json({
                "email":"required and unique", 
                "description":"Required",
                "itemList":"Required"
                })
        })

}

const plaincreatePendingCommand = async (req)=>{
    var total=0
    var listItems=req.body.itemList
    var price=0
    var units=0
    var email = req.body.email

    console.log(listItems)
    console.log("body: ", req.body)
    

    listItems.forEach(element => {
        Item.findById(element._id)
        .then(response=>{
            if(!response){
                return
            } 
            console.log("gasit :")
            price=response.price
            units=element.units
            total = total + (price*units)
            console.log(price)
            console.log(units)
            console.log(total)
        })
        .catch(er=>{
            return false
             })
        
    });

    //waite for calculation...
    await delay(3000)
    if(total==0) await delay(5000)
    if(total==0) {
        return false
    }

    const newItem = new pendingCommands({
        "email":req.body.email,
        "description":req.body.description,
        "total": total,
        "items": listItems

    })
    
    try{
      let save=  await newItem.save()
      return save._id
    }catch(err){
        console.log("eroare: ",err)
        return false
    }

        return true;
}


const createDoneCommands = (email,userId,description,total,listItems)=>{

    console.log("email: ", email,"userId: ",userId,"description: ",description, "total: ",total, "listItems: ",listItems)
    const newItem = new doneCommands({
        "email":email,
        "description":description,
        "total": total,
        "items": listItems

    })
    
    newItem.save()
        .then((res)=>{
            console.log("comanda adaugata")
        })
        .catch((err)=>{
            console.log("eroare adaugare comanda: ",err)
        })

}

const verifyToken= (req, res)=>{

    var tmp = req.params.token
    const token = tmp.slice(1)
    console.log("Token:",token)
    const resToken = token.split("::")
    console.log("RES",resToken)

    if(!token) res.status(400).json({"message":"Incorrect Token"})
    else{

      pendingCommands.findByIdAndDelete(resToken[1])
      .then(command=>{
          console.log("datele:",command.email)
        if(command.email == resToken[0]){
        createDoneCommands(command.email,command.userId,command.description,command.total,command.listItems)
         res.status(200).send(command)
         console.log("STATUS 200, Sa gasit: ",command)

        }else{
            console.log("STATUS 400 , Nu sa gasit: ",command)
            res.status(400).json({"message":"Nu sa gasit comanda in asteptare"})
        }
      })
      .catch(wrong=>{
           res.status(400).json({"message":"Nu sa gasit comanda in asteptare"})
           console.log(wrong)
      })
    }

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

module.exports={createDoneCommands,plaincreatePendingCommand,verifyToken,createComment,createItem,createUser,HashGen,createPendingUser,createPendingCommand}