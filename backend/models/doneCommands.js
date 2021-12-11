const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')
const Item = require('./item')


var MyModel = mongoose.model('pendingCommand', new Schema(
    {   
        user:{
            type:mongoose.Types.ObjectId,
            ref:"User",
        },
        description:{
            type:String,
        },
        items:[ 
            {
            type:mongoose.Types.ObjectId,
            ref:"Item",
            units:{
                type:Number,
                default:"1"
            }
            }
        ],        
        total:{
            type:Number,
            required:true
        },
        doneAt: { 
            type: Date, default: Date.now
             }
     }));
        
module.exports= MyModel