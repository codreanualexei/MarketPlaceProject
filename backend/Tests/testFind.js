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


User.findOne({"email":"name1"}).populate("items")
.then(res=>{
    console.log(res)
})
.catch(err=>{
    console.log(err)
})


