
const User = require('../../models/user')
const Items = require('../../models/item')
const doneCommands = require("../../models/doneCommands")

const findAllUsers=(req,res)=>{

     User.find({}).populate("items")
       .then(items=>{
           res.status(200).send(items)
       })
       .catch(wrong=>{
            res.status(400).send(wrong)
       })
    
}

const findAllDoneCommands=(req,res)=>{

    doneCommands.find({}).populate("items")
      .then(items=>{
          res.status(200).json({"comenzi":items})
      })
      .catch(wrong=>{
           res.status(400).send(wrong)
      })
   
}

    const findUser=(req,res)=>{

        User.find({ fname: req.body.fname }, function (er, response) {
            
            if(response){
                res.status(200).send(response)
            }else{
                res.status(400).json({"message": er})
            }
        }).populate("items")
    }
    
    const findUserByemail=(req,res)=>{
        User.find({"email": req.body.email}, function (er, response) {
            
            if(response){
                res.status(200).json({"message":"user exist"})
            }else{
                res.status(400).json({"message": er})
            }
        })
    }
    
    const findUserByid=(req,res)=>{
    
        User.findById(req.body._id, function (er, response) {
            
            if(response){
                res.status(200).send(response)
            }else{
                res.status(400).json({"message": null})
            }
        }).populate("items")
    }

    const findAllItems=(req,res,next)=>{

        Items.find({})
          .then(items=>{
              //console.log("items FOUND: ",items)
              res.status(200).send(items)
          })
          .catch(wrong=>{
               res.status(400).send(wrong)
          })
   }


   const findArrOfItems=(req,res)=>{
    console.log("Items:")
    console.log(req.body.items)

    Items.find({_id:req.body.items })
      .then(items=>{
         res.status(200).send(items)
         console.log(items)
      })
      .catch(wrong=>{
           res.status(400).send(wrong)
           console.log(wrong)
      })
   
}

    module.exports = {findAllDoneCommands,findArrOfItems,findAllUsers,findUser,findUserByemail,findUserByid,findAllItems}