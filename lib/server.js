var engine     = require("engine.io"),
    pubsub     = require('pubsub'),
    newPublish = require('./publish');

module.exports = attachTo;

function attachTo(httpServer){
  var server = engine.attach(httpServer),
      onNewSocket = pubsub();

  server.on('connection', onConnect);

  function onConnect(socket){
    var onMessage = pubsub();

    socket.on('message', function(msg){
      var parsed;

      try {
        parsed = JSON.parse(msg);
      } catch(err){}

      onMessage.publish(parsed || msg);
    });

    onNewSocket.publish({
      sub: onMessage,
      pub: send,
      onClose: onClose
    });

    function onClose(callback){
      socket.on('close', callback);
    }

    function send(msg){
      typeof msg != 'string' && ( msg = JSON.stringify(msg) );
      socket.send(msg);
    }

  }

  return onNewSocket;
}
