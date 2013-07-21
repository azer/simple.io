var escape = require,
    isNode = process && process.versions && process.versions.node,
    client = require('./lib/client'),
    server = isNode && escape('./lib/server');

module.exports = isNode ? server : client;
