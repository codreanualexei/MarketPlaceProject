const mongoose = require('mongoose')
const Item = require('./item')
const Schema = mongoose.Schema


var MyModel = mongoose.model('pendUser', new Schema(
    {   
        token:{
            type:String, 
            required:true, 
            unique:true
        },
        fname:{
        type:String,
        required:true
        },
        lname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        tel:{
            type:Number,
            unique:true
        },
        items:  [
            {
            type:Schema.Types.ObjectId,
            ref:"Item"
            }
                ],
        createdAt: { 
            type: Date, expires: '5m', default: Date.now
             }
    
     }));
        
module.exports= MyModel