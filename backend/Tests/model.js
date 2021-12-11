const mongoose = require('mongoose')
const Schema = mongoose.Schema


var User = mongoose.model('Item', new Schema(
    {   
        title:{
        type:String,
        required:true
        },
        description:{
            type:String,
            required:true
        },
        likes:{
            type:Number
        },
        comments:[{type:Schema.Types.ObjectId, ref: Comment}]
    
     }));
        
        var User = mongoose.model('Item', new Schema(
        {   
            title:{
            type:String,
            required:true
            },
            description:{
                type:String,
                required:true
            },
            likes:{
                type:Number
            },
            comments:[{type:Schema.Types.ObjectId, ref: Comment}]
        
         }));

module.exports= MyModel