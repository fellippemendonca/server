'use strict';


module.exports = clientEvents; 

function clientEvents(connection) {
  this.connection = connection;

  this.onConnect = () => {
    console.log(`ConnEvent: 'connect'`);
  },

  this.onTimeout = () => {
    console.log(`ConnEvent: 'timeout'`);
  },

  this.onListening = () => {
    console.log(`ConnEvent: 'listening'`);
  },

  this.onData = (data) => {
    console.log(`ConnEvent: 'data', From: ${this.connection.id}`);
    this.connection.connection.write(data);
  },

  this.onClose = () => {
    console.log(`ConnEvent: 'close', Connection: ${this.connection.id}`);
  },

  this.onError = (err, connection) => {
    console.log(`ConnEvent: 'error', Message: ${err.message}, Connection: ${this.connection.id}`);
  }

}
