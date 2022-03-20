//const Joi = require('@hapi/joi')
const User = require('../../models/user')
const databaseCreate = require('../database/create')
var url = require('url')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require("crypto");
const pendUser = require("../../models/pendingUsers")

// Autentificarea emailului inainte de a plasa comanda plata cash! mai trebuie facut !

const sendEmai = (toEmail,token)=>{
    var nodemailer = require('nodemailer');
    var url = 'http://localhost:5000/validatetoken:'+token

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'codmarketplaceal@gmail.com',
        pass: 'djtiesto1'
      }
    });
    
    var mailOptions = {
      from: 'no-reply@marketplace.ro',
      to: toEmail,
      subject: 'Validation',
      text: 'Please click on the URL to activate the account: '+url
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent to ',toEmail,', response info: ' + info.response);
      }
    });
}

//Trebuie facut un eveniment. Trimit mail cu tokenul /validationtoken:token, salvez intr-o colectie userul in asteptare de validate, cand vine request cu token verifica lista de asteptare...
const verifyEmailUsingToken = (req,res)=>{
    var tmp = req.params.token
    const token = tmp.slice(1)

    pendUser.findOne({"token": token}, function (er, response) {
            
        if(response){
            req.body=response
            databaseCreate.createUser(req,res,{"message":"User was validated successfully"})

        }else{

            res.status(400).json({"message": "token expired"})
           
        }
    })
}

//Sing Up
const authEmail = (req,res)=>{
    User.findOne({$or:[{"email":req.body.email},{"tel":req.body.tel}]}, function (er, response) {
            
        if(response){
            res.status(400).send("User with this telephone number or email already exist: \n"+response)
            
        }else{
            //Generate unique id, generate token, create temporar user with expiration time, and send an emai with activation link
            const id = crypto.randomBytes(16).toString("hex");
            token = genToken(id,process.env.TOKEN_SECRET)
            databaseCreate.createPendingUser(req,res,token)
            sendEmai(req.body.email,token)
        }
    })

}


const genToken = (id,secret)=>{
    return jwt.sign({"_id":id},secret,{expiresIn:"60s"});
}

module.exports = {authEmail,sendEmai,verifyEmailUsingToken}