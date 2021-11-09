const twilio = require('twilio')

var client = new twilio('AC4c1f5df1ceae200c8819cd32266dc29c','a65e6a145e8c2c7e31dc6a0779852652')

client.messages.create({
    messagingServiceSid: 'MG62c80f47becac0d1374c016ff8478062',
    to: '+37360917115',
    body: 'Buna Veronica, ghici cine ti-a trimis SMS-ul asta ?'
})
.then(message=> console.log(message.sid))
.done();

