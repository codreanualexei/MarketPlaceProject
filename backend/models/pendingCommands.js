const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')
const Item = require('./item')
const moment = require('moment-timezone');
const dateRO = new Date()

var newSchema = new Schema(
    {   
        email:{
            type:String,
            required:true,
            unique:true
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
            "type": Date, expireAfterSeconds:300, default: Date.now()
             }
        
     },{  timestamps:true}
     )


var MyModel = mongoose.model('pendingCommand',newSchema );

    // new Date(Date.UTC(0, 0, 0, 4, 0, 0)+ Date.now())
module.exports= MyModel