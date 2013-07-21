var newIO = require('../'),
    port  = process.env.TEST_PORT || 3003,
    http  = require('http').createServer().listen(port),
    io    = newIO(http);

it('receives and sends messages', function(done){
  io.sub(function(msg){
    if(msg.ok) return done();
    io.pub({ mirror: msg });
  });
});
