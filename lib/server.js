var engine     = require("engine.io"),
    pubsub     = require('pubsub'),
    newPublish = require('./publish');

module.exports = newIO;

function newIO(server){
  var io        = engine.attach(server),
      pub       = newPublish(),
      onMessage = pubsub(),
      onClose   = pubsub(),
      deferred  = [],
      socket;

  io.on('connection', onConnect);

  function onConnect(_socket){
    socket = _socket;
    pub.socket(socket);

    socket.on('message', function(msg){
      var parsed;

      try {
        parsed = JSON.parse(msg);
      } catch(err){}

      onMessage.publish(parsed || msg);
    });

    socket.on('close', onClose.publish);
  }

  return {
    io: io,
    pub: pub,
    publish: pub,
    sub: onMessage,
    subscribe: onMessage
  };

}
