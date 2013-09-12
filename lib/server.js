var engine     = require("engine.io"),
    pubsub     = require('pubsub'),
    newPublish = require('./publish');

module.exports = attachTo;

function attachTo(httpServer){
  var server = engine.attach(httpServer),
      onNewSocket = pubsub();

  server.on('connection', onConnect);

  function onConnect(socket){
    var onMessage = pubsub(),
        controller = {
          destroy: destroy,
          sub: onMessage,
          pub: send,
          onClose: onClose
        };

    socket.on('message', callback);

    onNewSocket.publish(controller);

    function callback(msg){
      var parsed;

      try {
        parsed = JSON.parse(msg);
      } catch(err){}

      onMessage.publish(parsed || msg);
    }

    function destroy(){
      delete socket;
      delete onMessage.subscribers;
      delete onMessage;
      delete controller;
    }

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
