'use strict';

const net = require('net');
const address = require('../app/config');
let serverEvents = require('./serverEvents');
let connectionEvents = require('./connectionEvents');


module.exports = serverObject;

function serverObject() {
  let server;
  
  this.start = () => {
    this.server = net.createServer();
    this.server.listen(address.port, address.host);
    console.log('Server listening...');
    return this.server;
  };

  this.listenEvents = () => {
    this.server.on('listening', (obj) => {
      serverEvents.onListening(obj);
    });
    this.server.on('connection', (obj) => {
      connectionEvents(obj);
      serverEvents.onConnetion(obj);
    });
    this.server.on('close', (obj) => {
      serverEvents.onClose(obj);
    });
    this.server.on('error', (obj) => {
      serverEvents.onError(obj);
    });
  };
}
