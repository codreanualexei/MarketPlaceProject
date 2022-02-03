const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')
const Item = require('./item')


var MyModel = mongoose.model('Item', new Schema(
    {   
        title:{
        type:String,
        required:true
        },
        description:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        stoc:{
            type:Number,
            required:true
        },
        usersLiked:[ 
            {
            _id:{
            type:mongoose.Types.ObjectId,
            ref:"User"
            },
            stars:{
                type:Number
            }
            }
        ],
        comments:[{
            type:mongoose.Types.ObjectId, 
            ref: "Comment"
        }],
        image:{
            type:String
        }
    
     }));
        
module.exports= MyModel