const express = require('express')
var bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dbroutes = require('./routes/dbroutes')
const authroute = require('./routes/authroute')
const connDB = require('./controllers/database/connect')
const dotenv = require('dotenv')


const PORT = 5000;

//Configure environment files
dotenv.config()

//Create an application with express
const app = express()

//Use json format fot this application
app.use(express.json());
app.use(bodyParser.urlencoded())

//Database connection
connDB.connectDB()

//set view engine
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('checkout')
})

app.get('/successpay',(req,res)=>{
    res.render('successpay')
})
app.get('/cancelpay',(req,res)=>{
    res.render('cancelpay')
})

//pagini
app.get('/addItem',(req,res)=>{
    res.render('addItem')
})

//Make public static folders
app.use('/uploads', express.static('uploads')) //for images
app.use('/public', express.static('public'))  //for public date(disign)
app.use('/pub', express.static('marketplace'))   //for pages

//Aythentication routes
app.use(authroute)
//User routes defined in ./routes/dbroutes
app.use(dbroutes)



//Start the server and listen on port (PORT), located in env file
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});