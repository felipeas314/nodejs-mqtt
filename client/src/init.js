var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://206.189.97.240:1883')
 
client.on('connect', function () {
  setInterval(() => {
    client.publish('weight', '75');
  }, 5000);
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})