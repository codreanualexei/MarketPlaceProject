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
            _id:{type:mongoose.Types.ObjectId}
            ,
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
            type: Date, default: Date.now()
             }
     }));
        
module.exports= MyModel