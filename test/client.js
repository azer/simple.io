var io = require("../")('ak47.io:3003');

it('sends and recieves messages', function(done){
  io.pub({ from: 'azer1', text: 'text1' });
  io.pub({ from: 'azer2', text: 'text2' });

  var i = 0;
  io.sub(function(msg){
    i++;
    expect(msg.mirror.from).to.equal('azer' + i);
    expect(msg.mirror.text).to.equal('text' + i);

    if (i==2) {
      io.pub({ ok: true });
      done();
    }
  });
});
