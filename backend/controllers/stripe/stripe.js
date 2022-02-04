const axios = require('axios');
const stripe = require('stripe')('sk_test_51JtYOwDdCFBi5ZCFOSGVHxyuU2jc5yFzJaSRPdKCia1ks4L3LbV81MH9njC094Dzl9Wei6U1jPHCa8cIepKxpqms00xHcHZLSN');
const Item = require('../../models/item')
const Create = require("../database/create")
const encrypt = require("../encryption/encrypt")
const pendingCommands = require("../../models/pendingCommands")

const express = require('express');


var createItem = (title,price,quantity)=>{
   var json = {
        price_data:{
                currency:"RON",
                product_data:{
                    name:title
                    
                },
                unit_amount:price
        }, 
        quantity:quantity
    }
    return json
}

const createSession = async (items,req,res)=>{
    
    console.log("crearea sesiunii")
    const session =  await stripe.checkout.sessions.create(
        {
            payment_method_types: ['card'],
            line_items:items,
            mode:"payment",
            success_url:process.env.DOMAIN+'/api/donepay',
            cancel_url:process.env.DOMAIN+"/api/cancelpay"
        })
        //Trebuie adaugat id-ul in DB
                console.log("pay_ID:",session.payment_intent)
                console.log("req.body: ",req.body,"itemList: ",items)

                console.log("crearea pendingcommand!!!")
                const tmp = req
                var state =false
                try{
                    
                    state = await Create.plaincreatePendingCommand(tmp)
                    console.log("STATE:::",state)

                    if(state!=false){
                        console.log("criptat: ",encrypt.encrypt(session.payment_intent))
                        console.log("decriptat: ",encrypt.decrypt(encrypt.encrypt(session.payment_intent)))
                        console.log("plain: ",session.payment_intent)
                        res.cookie("signatureandreiescui",encrypt.encrypt(state.toString()))
                        res.cookie("signatureandreiescup",encrypt.encrypt(session.payment_intent)).status(200).json({id:session.id});

                        console.log("am setat cookies")
                        const intent = await stripe.paymentIntents.retrieve(session.payment_intent);
                        console.log("detalii dupa plata:",intent)
                    }else{
                        
                        res.status(400).json({"message":"eroare creare plata"})
                    }

                }
                catch(err){
                    console.log(err)
                    res.json({"message":"Pentru a raporta o eroare puteti sa ne contactati la numarul din sectiunea Contact"})
                    return
                }
                
}

const checkPaymentStatus = async(req,res)=>{

        try{
        console.log(req.cookies.signatureandreiescuP)
        let plain_intent = encrypt.decrypt(req.cookies.signatureandreiescup)
        let commandId = encrypt.decrypt(req.cookies.signatureandreiescui)

            const intent = await stripe.paymentIntents.retrieve(plain_intent);
            console.log("detalii dupa plata:",intent)
            console.log("intent_id: ",plain_intent)
             console.log("id: ",commandId)
             console.log("statusss: ",intent.charges.data[0].status)

        if(intent.charges.data[0].status=='succeeded'){
            pendingCommands.findById(commandId)
            .then((response)=>{
               Create.createDoneCommands(response.email,"nu conteaza",response.description,response.total,response.items)
               pendingCommands.findByIdAndDelete(commandId)
               .then((done)=>{
                res.status(200).json({"message":"Comanda a fost plasata"})
               })
               .catch((err)=>{
                res.status(400).json({"message":"eroare, va rog sa ne contactati"})
               })
               
            })
            .catch((err)=>{
                res.status(400).json({"message":"eroare cautare comanda, va rog sa faceti o noua comanda sau sa ne contactati"})
            })
            
            
        }else{
            res.send({"message":intent.charges.data[0].status});
        }
        
    }
    catch(err){
        res.send({"message":"error data"});
    }

}

const payment = async (req,res)=>{

    console.log("req.bodyy: ",req.body)
    Item.find({
        '_id': { $in: req.body.itemList}
    }, function(err, docs){
        if(err){
            res.status(400).json({"message":"Error finding item id, please insert existing IDs"})
            console.log(err)
            return
        }else if(docs.length === 0 ){
            res.status(400).json({"message":"IDs are not listed in database"})
            return
        }
        else{
            var listItems=[]
            items = req.body.itemList
            console.log("Docs:",docs) 
            console.log("items:",items) 

            for (var i = 0, len = docs.length; i < len; i++) {
                listItems.push(createItem(docs[i].title,docs[i].price,items[i].units))
                }
                
                
                console.log("items organizat:",listItems)
                createSession(listItems,req,res)
        }
         
    });

}

module.exports = {payment,checkPaymentStatus}