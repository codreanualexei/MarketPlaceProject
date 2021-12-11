const twilio = require('twilio')

var client = new twilio('AC4c1f5df1ceae200c8819cd32266dc29c','df32070e33a4fa1b3aa192a9c76dbe90')

client.messages.create({
    from: '+12525945436',
    to: '+40764844144',
    body: 'Noroc'
})
.then(message=> console.log(message.sid))
.done();

