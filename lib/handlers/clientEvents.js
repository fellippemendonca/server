'use strict';

let users = require('../../app/initializers/').users;
let chats = require('../../app/initializers/').chats;
let eventRouter = require('../eventRouter');

module.exports = clientEvents; 

function clientEvents(conn) {
  this.connection = conn;
  this.user;

  this.onConnect = () => {
    console.log(`ConnEvent: 'connect'`); 
  },

  this.onTimeout = () => {
    console.log(`ConnEvent: 'timeout'`);
  },

  this.onListening = () => {
    console.log(`ConnEvent: 'listening'`);
  },

  this.onData = (jsonData) => { 
    console.log(`ConnEvent: 'data', Connection: ${this.connection.id}`);

    // Bind User <=> Connection; 
    this.user = users.bind(this.connection, jsonData.user);

    // Forward data event to event router:
    eventRouter(jsonData, users.findUser(jsonData.user.id));
  },

  this.onClose = () => {
    console.log(`ConnEvent: 'close', Connection: ${this.connection.id}`);
    chats.delChatMember(this.connection.userId);
    users.del(this.connection.id);
    
    this.connection.connection.destroy();
  },

  this.onError = (err, connection) => {
    console.log(`ConnEvent: 'error', Message: ${err.message}, Connection: ${this.connection.id}`);
    users.del(this.connection.id);
  }

}
