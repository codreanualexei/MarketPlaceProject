const User = require('../../models/user')

const findUserByidAndUpdate=(req,res)=>{

    User.findByIdAndUpdate(req.body._id,
        {"fname":req.body.fname,"lname":req.body.lname,"email":req.body.email,"password":req.body.password,"tel":req.body.tel},
         function (er, response) {
            if(response){
                res.status(200).json({"message": "User:  "+ response + " was updated"})
            }else
            {
                res.status(400).json({ "message": "Id " + req.body._id + " doesn't exist"})
            }
    })
}

module.exports={findUserByidAndUpdate}