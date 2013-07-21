## simple.io

Minimalistic wrapper around engine.io and engine.io-client.

## Install

```bash
$ npm install simple.io
```

## Usage

Server-side:

```js
server = require('http').createServer().listen(3000)
io = require('simple.io')(server)

io.sub(function(msg){

  msg.from
  // => 'william'

  msg.text
  // => 'Morning, Paul'
})

io.pub({ from: 'paul', text: 'Oh, morning, William, how are you?' })
```

Client-side:

```js
io = require('simple.io')() // or: require('simple.io')('localhost:1234')

io.pub({ from: 'william', text: 'Morning, Paul.' })

io.sub(function(msg){

  msg.from
  // => 'paul'

  msg.text
  // => 'Oh, morning, William, how are you?'

})
```

## Testing

```
$ npm install -g indev
$ indev test
```

![](https://dsz91cxz97a03.cloudfront.net/CHOgLc5FnJ-1200x1200.jpeg)
