var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://206.189.97.240:1883')
 
client.on('connect', function () {
  setInterval(() => {
    client.publish('weight', `${Math.random() * (80 - 10) + 10}|cefet|142.11.34.8`);
  }, 60000);
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})