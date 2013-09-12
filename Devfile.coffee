fox = bin "fox"

task 'test', '*.js', 'lib', ->
  debug 'Running server tests on :3003'
  fox.async 'test/server.js -t 15000'

  debug 'Running client-side tests on :7559'
  fox.async 'test/client.js -bv'
