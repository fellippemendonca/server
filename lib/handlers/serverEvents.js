'use strict';

let users = require('../../app/initializers/').users;


module.exports = serverEvents;

function serverEvents() {

  this.onListening = () => {
    console.log(`ServEvent: 'listening'`);
  };

  this.onConnetion = (connection, connectionEvents) => {
      
    // Validate New Connection with Connected Users Hash:
    if(true) {
      users.addConn(connection);
      connectionEvents(connection);
      console.log(`ServEvent: 'connection', Connection: ${connection.id}`);
    } else {

    }
  };

  this.onClose = () => {
    console.log(`ServEvent: 'Close', Connection: ${connection.id}`);
  };

  this.onError = (err) => {
    console.log(`ServEvent: 'Error', Message: ${err.message}`);
  };

};
