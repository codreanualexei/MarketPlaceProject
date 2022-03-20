//const Joi = require('@hapi/joi')
const User = require('../../models/user')
const database = require('../database/create')
var url = require('url')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require("crypto");
const pendUser = require("../../models/pendingUsers")



const sendEmai = (toEmail,token)=>{
    var nodemailer = require('nodemailer');
    var url = process.env.DOMAIN + '/api/validatetoken:'+token

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'contact.andreiescu@gmail.com',
        pass: '23.06.1992App!'
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
const SingUp = (req,res)=>{
    User.findOne({$or:[{"email":req.body.email},{"tel":req.body.tel}]}, function (er, response) {
            
        if(response){
            res.status(400).send("User with this telephone number or email already exist: \n"+response)
            
        }else{
            //Generate unique id, generate token, create temporar user with expiration time, and send an emai with activation link
            const id = crypto.randomBytes(16).toString("hex");
            token = genToken(id,process.env.TOKEN_SECRET)
            console.log(token)
            database.createUser(req,res,{"message":"OK"},{"message":"failure"})
            console.log(token)
            sendEmai(req.body.email,token)
        }
    })

}

const validPass = (pass,hash)=>{

    return bcrypt.compareSync(pass,hash)
}

const genToken = (id,secret)=>{
    return jwt.sign({"_id":id},secret,{expiresIn:"60m"});
}

const LogIn =  (req,res)=>{

    console.log(req.body)
        
    User.findOne({"email":req.body.email}, function (er, response) {
            
        if(response){

            if(validPass(req.body.password,response.password)){
                tok = genToken(response._id,process.env.TOKEN_SECRET)

                res.status(200).cookie('authtoken',tok).redirect('/api/thepavel') 
            }else{
                res.status(400).json({"message":"Wrong password or username"})
            }
        }else{
            res.status(400).json({"message":"Wrong password or username"})
        }
    })


}

const verifyAccessToken= (req, res, next)=>{

    const token = req.cookies.authtoken

    if(!token) res.status(400).json({"message":"Incorrect Token"})
    else{

        try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user=verified
        next()
        } 
        catch(err){
            res.status(400).json({"message":"Invalid Token"})
        }
    }

}

//Refresh token !

module.exports = {genToken,SingUp,LogIn,verifyAccessToken,sendEmai,verifyEmailUsingToken}