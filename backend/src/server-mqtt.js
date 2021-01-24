

var mosca = require('mosca');
 
var ascoltatore = {
  //using ascoltatore
  type: 'mongo',		
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var moscaSettings = {
  port: 1883,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: 'mongodb://localhost:27017/mqtt'
  }
};
 
var settings = {
  port: 1883,
  backend: ascoltatore
};
 
var server = new mosca.Server(moscaSettings);
 
server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});
 
server.on('published', function(packet, client) {
  // console.log('Tópico', packet.topic);
  // console.log('Peso', packet.payload);
  if(packet.topic=='weight'){
    console.log('Peso', packet.payload.toString());
  }
});
 
server.on('ready', setup);
 
function setup() {
  console.log('Server MQQT is up and running');
}

module.exports = server;