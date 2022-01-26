const User = require('../../models/user')
const Item = require('../../models/item')
const Comment = require('../../models/comment')
const Create = require('../database/create')

const findCommentByIdAndAddLike=(req,res)=>{
    var arr=[]
    
    Comment.findOneAndUpdate({"_id": req.body.commentId}, {"$addToSet":{"likes":req.body.userId}},function (er, response) {
        
        if(response){
            arr=response.likes

            if(arr.includes(req.body.userId)) 
            res.status(400).json({"message": "User did like already, id: "+req.body.userId})
            else
            res.status(200).json({"message": "Successfully operation"})
        }else{
            res.status(400).json({"message": "error finding comment id: "+req.body.commentId})
        }
    })
}

const findItemByIdAndAddComment= async (req,res)=>{
 
    var result = await Create.createComment(req,res)
    console.log("Result:", result)
    
    if(result.errors) {
        res.status(400).json({"Error": result.errors})
        return
    }

    Item.findOneAndUpdate({"_id": req.body.itemId}, {"$push":{"comments":result._id}},function (er, response) {
        
        if(response){
            res.status(200).json({"message":"Succsessfully operiation", "item":response})
        }else{
            res.status(400).json({"message": er})
        }
    })
}


const findItemByIdAndAddLike=(req,res)=>{
 
    var arr=[]
  
    Item.findOneAndUpdate({"_id": req.body.itemId}, {"$addToSet":{"usersLiked":{"_id":req.body.userId,"stars":req.body.stars}}},function (er, response) {
        
        if(response){
            
            arr=response.usersLiked

            if(arr.includes(req.body.userId)) 
            res.status(400).json({"message": "User did like already, id: "+req.body.userId})
            else
            res.status(200).json({"message": "Successfully operation"})
            
        }else{
            res.status(400).json({"message": "failed to find this item by id:"+req.body.itemId})
        }
    })
}

const findUserByemailAndAddItem=(req,res)=>{
 
    User.findOneAndUpdate({"email": req.body.email}, {"$push":{"items":req.body.itemId}},function (er, response) {
        
        if(response){
            res.status(200).send(response)
        }else{
            res.status(400).json({"message": er})
        }
    })
}


module.exports={findCommentByIdAndAddLike,findUserByemailAndAddItem,findItemByIdAndAddComment,findItemByIdAndAddLike}