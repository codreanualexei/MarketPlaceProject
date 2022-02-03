const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
            type: Date, expires: '2m', default: Date.now
             }
     }));
        
module.exports= MyModel