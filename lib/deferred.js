module.exports = deferred;

function deferred(){
  var content = {
    message : [],
    close   : [],
    toSend  : []
  };

  function add(coll, el){
    content[coll].push(el);
  }

  function pass(callback){
    var coll;

    var i, len;
    for (coll in content) {
      i = -1;
      len = content[coll].length;
      while( ++i < len) {
        callback(coll, content[coll][i]);
      }
    }

    delete content.message;
    delete content.close;
    delete content.toSend;
    delete content;
  }

  return {
    add: add,
    pass: pass
  };
}
