const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')
const Item = require('./item')


var MyModel = mongoose.model('doneCommand', new Schema(
    {   
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
            type: Date, default: new Date(Date.UTC(0, 0, 0, 4, 0, 0)+ Date.now())
             }
     }));
        
module.exports= MyModel