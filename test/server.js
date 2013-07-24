var attachIO     = require('../'),
    port         = process.env.TEST_PORT || 3003,
    http         = require('http').createServer().listen(port),
    onConnection = attachIO(http);

it('receives and sends messages', function(done){

  onConnection(function(io){
    io.sub(function(msg){
      if(msg.ok) return done();
      io.pub({ mirror: msg });
    });
  });

});
