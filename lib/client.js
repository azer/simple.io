var EngineIO    = require('engine.io-client'),
    pubsub      = require('pubsub'),
    newPublish  = require('./publish');

module.exports = newClient;

function newClient(options){
  var io        = new EngineIO(options),
      pub       = newPublish(),
      onMessage = pubsub(),
      onClose   = pubsub();

  io.onopen = onOpen;

  function onOpen(){
    pub.socket(io);
    io.on('message', function(msg){
      var parsed;

      try {
        parsed = JSON.parse(msg);
      } catch(err) {}

      onMessage.publish(parsed || msg);
    });
  }

  return {
    io: io,
    pub: pub,
    publish: pub,
    sub: onMessage,
    subscribe: onMessage
  };
}
