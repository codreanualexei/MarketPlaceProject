const It = require('../models/item');
const User = require('../models/user')
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

var user =new User({
"fname":"name2",
"lname":"name2",
"email":"name2",
"password":"name2",
"tel":"123121"
})

//item.comments.push({"title": "hey2", "comments":"plasd", "likes":"4"})
user.items.push("61855791fe0e06ba274f5bef")

user.save()
.then(res=>{
    console.log("ResponsE: ",res)
})
.catch(err=>{
    console.log("ErroR: ",err)
})

User.find().populate()
.then(res=>{
    console.log(res)
})
.catch(err=>{
    console.log(err)
})


