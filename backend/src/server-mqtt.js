

let mosca = require('mosca');
 
const Measurement = require('./model/Measurement');

let ascoltatore = {
  //using ascoltatore
  type: 'mongo',		
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

let moscaSettings = {
  port: 1883,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: 'mongodb://localhost:27017/mqtt'
  }
};
 
let settings = {
  port: 1883,
  backend: ascoltatore
};
 
let server = new mosca.Server(moscaSettings);
 
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

server.subscribe('weight',(data,x) => {
  console.log('data',data,x.toString());
  let values = x.toString().split('|');
  Measurement.create({
    locale:values[1] ,
    ip: values[2],
    weight: values[0]
  }).then(() => {
    console.log('Inserido no banco de dados com sucesso');
  }).catch(err => {
    console.log('err:',err);
  });
  // console.log(values);
});
 
function setup() {
  console.log('Server MQQT is up and running');
}

module.exports = server;