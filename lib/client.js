var EngineIO    = require('engine.io-client'),
    pubsub      = require('pubsub'),
    newPublish  = require('./publish');

module.exports = newClient;

function newClient(options){
  var io        = new EngineIO(options),
      pub       = newPublish(),
      onConnect = pubsub(),
      onMessage = pubsub();

  io.onopen = onOpen;

  function onClose(fn){
    io.onclose = fn;
  }

  function onOpen(){
    pub.socket(io);
    onConnect.publish();

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
    subscribe: onMessage,
    onOpen: onConnect,
    onClose: onClose
  };
}
