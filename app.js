const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dbroutes = require('./routes/dbroutes')
const authroute = require('./routes/authroute')
const connDB = require('./controllers/database/connect')
const dotenv = require('dotenv')
const EventEmitter = require('events')

const emitter = new EventEmitter()

const PORT = 3000;

//Configure environment files
dotenv.config()

//Create an application with express
const app = express()

//Use json format fot this application
app.use(express.json());

//Database connection
connDB.connectDB()

//Aythentication routes
app.use(authroute)
//User routes defined in ./routes/dbroutes
app.use(dbroutes)
  


//Start the server and listen on port (PORT), located in env file
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});