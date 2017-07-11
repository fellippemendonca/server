'use strict';

let connections = require('../../app/initializers/').connections;
let users = require('../../app/initializers/').users;
let chats = require('../../app/initializers/').chats;
let eventRouter = require('../eventRouter');

module.exports = clientEvents; 

function clientEvents(conn) {
  this.connection = conn

  this.onConnect = () => {
    console.log(`ConnEvent: 'connect'`); 
  },

  this.onTimeout = () => {
    console.log(`ConnEvent: 'timeout'`);
  },

  this.onListening = () => {
    console.log(`ConnEvent: 'listening'`);
  },

  this.onData = (jsonData) => { console.log(users);
    console.log(`ConnEvent: 'data', Connection: ${this.connection.id}`);
    users.add(jsonData.user);

    // Bind User <=> Connection;
    users.bind(jsonData.user, this.connection);
    connections.bind(this.connection, jsonData.user);


    // Forward data event to event router:
    eventRouter(jsonData, this.connection);
  },

  this.onClose = () => {
    console.log(`ConnEvent: 'close', Connection: ${this.connection.id}`);
    chats.delChatMember(this.connection);
    users.del(this.connection.user);
    connections.del(this.connection);
    
    this.connection.connection.destroy();
  },

  this.onError = (err, connection) => {
    console.log(`ConnEvent: 'error', Message: ${err.message}, Connection: ${this.connection.id}`);
    users.del(this.connection.user);
    connections.del(this.connection);
  }

}
