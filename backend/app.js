const express = require('express')
var bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const allowroutes = require('./routes/allowroutes')
const connDB = require('./controllers/database/connect')
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser");
const path = require('path')


const PORT = process.env.PORT || 5000;

//Configure environment files
dotenv.config()

//Create an application with express
const app = express()

//Use json format fot this application
app.use(express.json());
app.use(bodyParser.urlencoded())
app.use(cookieParser());


//Database connection
connDB.connectDB()

//set view engine
app.set('view engine','ejs')

app.get('/successpay',(req,res)=>{
    res.render('successpay')
})
app.get('/cancelpay',(req,res)=>{
    res.render('cancelpay')
})

//Make public static folders
app.use('/uploads', express.static('uploads')) //for images
app.use('/public', express.static('public'))  //for public date(disign)
app.use('/pub', express.static('marketplace'))   //for pages
app.use(express.static(path.join(__dirname, '../frontend/build'))) // Serve static files from the React frontend app

//User routes defined in ./routes/routes
app.all("*", (req, res, next) => {
    console.log("request made!!!:",req.path); // do anything you want here
    next();
});

app.use('/api',allowroutes)

console.log(" sunt after API !")
//if not API go to frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
  })




//Start the server and listen on port (PORT), located in env file
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});