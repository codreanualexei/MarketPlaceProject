const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')
const Item = require('./item')

var comment = 
    {   
        title:{
        type:String,
        required:true
        },
        comments:{
            type:String,
            required:true
        },
        likes:{
            type:Number
        },
   
    
     };

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
        likes:[{
            type:mongoose.Types.ObjectId,
            ref:"User",
            unique:true
        }],
        comments:[{
            type:mongoose.Types.ObjectId, 
            ref: "Comment",
            unique:true
        }]
    
     }));
        
module.exports= MyModel