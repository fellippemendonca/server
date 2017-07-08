'use strict';

const net = require('net');
const address = require('../config');

module.exports = serverObject;

function serverObject() {
  let server;
  
  this.start = () => {
    this.server = net.createServer();
    this.server.listen(address.port, address.host);
    console.log('Server listening...');
    return this.server;
  }
}
