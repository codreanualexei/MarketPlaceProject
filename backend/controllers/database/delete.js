const User = require('../../models/user')



const findUserByIdAndDelete=(req,res)=>{

    User.findByIdAndDelete(req.body._id, function (er, response) {
        if(response){
            res.status(200).json({"message": "User:  "+ response + " was deletet"})
        }else
        {
            res.status(400).json({ "message": "Id " + req.body._id + " doesn't exist"})
        }
    })
}

module.exports = {findUserByIdAndDelete}