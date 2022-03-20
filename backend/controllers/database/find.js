
const User = require('../../models/user')
const Items = require('../../models/item')
const doneCommands = require("../../models/doneCommands")
const pendingCommands = require("../../models/pendingCommands")


const findAllDoneCommands=(req,res)=>{

    doneCommands.find({}).populate("items")
      .then(items=>{
          res.status(200).json({"comenzi":items})
      })
      .catch(wrong=>{
           res.status(400).send(wrong)
      })
   
}

const findAllItems=(req,res,next)=>{

        Items.find({})
          .then(items=>{
              //console.log("items FOUND: ",items)
              res.status(200).send(items)
          })
          .catch(wrong=>{
               res.status(400).send(wrong)
          })
}

const findEmaiOnPendingCommands= async (_email)=>{

    console.log("FINS:",_email)
   let rez = await pendingCommands.find({"email":_email})
   console.log("FINS:",rez)
   if(rez.length!=0){
    console.log("email:",rez[0].email,"email:",_email)
    if(rez[0].email===_email) return 1
    else return 0
   }
   else return 0

}

const findArrOfItems=(req,res)=>{
    console.log("Items:")
    console.log(req.body.items)

    Items.find({_id:req.body.items })
      .then(items=>{
         res.status(200).send(items)
         console.log(items)
      })
      .catch(wrong=>{
           res.status(400).send(wrong)
           console.log(wrong)
      })
   
}

    module.exports = {findAllDoneCommands,findArrOfItems,findAllItems,findEmaiOnPendingCommands}