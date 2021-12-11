const mongoose = require('mongoose')
const Schema = mongoose.Schema



var MyModel = mongoose.model('Comment', new Schema(
    {   
        title:{
        type:String,
        required:true
        },
        comments:{
            type:String,
            required:true
        },
        likes:[{
            type:mongoose.Types.ObjectId,
            ref:"User",
        }],
        User:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        }  
    
     }));
        
module.exports= MyModel