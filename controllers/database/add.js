const User = require('../../models/user')
const Item = require('../../models/item')
const Comment = require('../../models/comment')

const findCommentByIdAndAddLike=(req,res)=>{
 
    Comment.findOneAndUpdate({"_id": req.body.commentId}, {"$push":{"likes":req.body.userId}},function (er, response) {
        
        if(response){
            res.status(200).send(response)
        }else{
            res.status(400).json({"message": er})
        }
    })
}

const findItemByIdAndAddComment=(req,res)=>{
 
    Item.findOneAndUpdate({"_id": req.body.itemId}, {"$push":{"comments":req.body.commentId}},function (er, response) {
        
        if(response){
            res.status(200).send(response)
        }else{
            res.status(400).json({"message": er})
        }
    })
}

const findItemByIdAndAddLike=(req,res)=>{
 
    Item.findOneAndUpdate({"_id": req.body.itemId}, {"$push":{"likes":req.body.userId}},function (er, response) {
        
        if(response){
            res.status(200).send(response)
        }else{
            res.status(400).json({"message": er})
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