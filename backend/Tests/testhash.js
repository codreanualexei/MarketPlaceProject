const {HashGen} = require('../controllers/database/create')
const bcrypt = require('bcrypt')

console.log("Hash: "+HashGen(10,"leo"))
