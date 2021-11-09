
const User = require('../../models/user')


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
        console.log("finding")
        User.find({"email": req.body.email}, function (er, response) {
            
            if(response){
                res.status(200).send(response)
                console.log("found")
            }else{
                res.status(400).json({"message": er})
                condole.log("error")
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

    module.exports = {findAllUsers,findUser,findUserByemail,findUserByid}