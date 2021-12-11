const User = require('../models/user')
const ct = require('../controllers/database')

ct.connectDB()

async function printRes(){

const res = await User.find({});
console.log("res: ", printRes())

return res;
}

