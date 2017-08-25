'use strict';

let dataRouter = require('./dataRouter');

module.exports = clientEvents; 

function clientEvents(connection, users, chats) {
  this.connection = connection;
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
    console.log(`ConnEvent: 'data', From: ${this.connection.id}`);
    // VALIDATE USER TOKEN:
    let validToken = true;

    if (validToken) {
      
      // Insert and Bind User and Connection;
      this.user = users.bind(this.connection, jsonData.user);

      // Forward data event to event router:
      dataRouter(jsonData, users.findUser(jsonData.user.id), users, chats);

    } else {
      this.connection.connection.destroy();
    }
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
