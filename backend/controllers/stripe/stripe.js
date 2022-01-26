const stripe = require('stripe')('sk_test_51JtYOwDdCFBi5ZCFOSGVHxyuU2jc5yFzJaSRPdKCia1ks4L3LbV81MH9njC094Dzl9Wei6U1jPHCa8cIepKxpqms00xHcHZLSN');
const Item = require('../../models/item')

const express = require('express');

const domain = 'http://localhost:5000/'

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

const createSession = async (items,res)=>{
    
    const session =  await stripe.checkout.sessions.create(
        {
            payment_method_types: ['card'],
            line_items:items,
            mode:"payment",
            success_url:domain+'successpay',
            cancel_url:domain+"cancelpay"
        })

        res.json({id:session.id})
}
const payment = async (req,res)=>{

    Item.find({
        '_id': { $in: req.body.cart}
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
            items = req.body.cart
           // console.log("Docs:",docs) - result from search
           // console.log("items:",items) - cart sent

            for (var i = 0, len = docs.length; i < len; i++) {
                listItems.push(createItem(docs[i].title,docs[i].price,items[i].quantity))
                }
                
                console.log("items:",listItems)
                createSession(listItems,res)
        }
         
    });

    

}

module.exports = payment