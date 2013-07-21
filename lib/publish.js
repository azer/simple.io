module.exports = newPublish;

function newPublish(){
  var deferred = [],
      socket;

  publish.socket = function(_socket){
    socket = _socket;

    (process.nextTick || setTimeout)(function(){
      var i = -1, len = deferred.length;

      while (++i < len) {
        socket.send(deferred[i]);
      }

      delete deferred;
    });

  };

  return publish;

  function publish(msg){
    typeof msg != 'string' && ( msg = JSON.stringify(msg) );
    if (!socket) return deferred.push(msg);
    socket.send(msg);
  };
}
