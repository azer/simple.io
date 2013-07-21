fox = bin "fox"

task 'test', '*.js', 'lib', ->
  debug 'Running server tests on :3003'
  fox 'test/server.js'

  debug 'Running client-side tests on :7559'
  fox 'test/client.js -bv'
