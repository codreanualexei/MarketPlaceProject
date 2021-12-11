const mongoose = require('mongoose')
const Schema = mongoose.Schema
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

module.exports={connectDB}