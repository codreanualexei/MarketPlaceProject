const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')
const Item = require('./item')


var MyModel = mongoose.model('pendingCommand', new Schema(
    {   
        type:{
            type:String,
            required:true

        },
        user:{
            type:mongoose.Types.ObjectId,
            ref:"User",
        },
        description:{
            type:String,
        },
        items:[ 
            {

            _id:{
            type:mongoose.Types.ObjectId,
            ref:"Item"
            },
            units:{
                type:Number
            }

            }
        ],        
        total:{
            type:Number,
            required:true
        },
        createdAt: { 
            type: Date, default: Date.now
             }
     }));
        
module.exports= MyModel