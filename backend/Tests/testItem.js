const It = require('../models/item');
const Comment = require('../models/comment')
const mongoose = require('mongoose')

console.log(It)

const url = 'mongodb+srv://codreanualexei:codreanu1996@cvdatabase.yu13s.mongodb.net/market?retryWrites=true&w=majority'

 const connectDB = ()=>{
    mongoose.connect(url)
    .then((res)=>{
        console.log('connected to mongoDB'+res)
    })
    .catch((err)=>{
        console.log("ERROR: "+err);
    })
}
 connectDB()


var item =new It({
"title":"Item2",
"description":"blabla",
"likes":"10"
})

item.comments.push({"title": "hey2", "comments":"plasd", "likes":"4"})

item.save()
.then(res=>{
    console.log("ResponsE: ",res)
})
.catch(err=>{
    console.log("ErroR: ",err)
})


