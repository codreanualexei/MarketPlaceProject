
const User = require('../../models/user')
const Items = require('../../models/item')

const findAllUsers=(req,res)=>{

     User.find({}).populate("items")
       .then(items=>{
           res.status(200).send(items)
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

    const findAllItems=(req,res)=>{

        Items.find({})
          .then(items=>{
              res.status(200).send(items)
          })
          .catch(wrong=>{
               res.status(400).send(wrong)
          })
       
   }

    module.exports = {findAllUsers,findUser,findUserByemail,findUserByid,findAllItems}