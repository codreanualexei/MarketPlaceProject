const EventEmitter = require('events')

const emitter = new EventEmitter()

//Listeners
emitter.on('printmessage',(message)=>{

    console.log("printing message: ",message)
    return "message printed"
})

module.exports = emitter