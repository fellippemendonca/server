'use strict';


module.exports = serverEvents;

function serverEvents() {

  this.onListening = () => {
    console.log(`ServEvent: 'listening'`);
  };

  this.onConnetion = (connection, connectionEvents) => {
    console.log(`ServEvent: 'connection', Connection: ${connection.id}`); 
    connectionEvents(connection);
  };

  this.onClose = () => {
    console.log(`ServEvent: 'Close', Connection: ${connection.id}`);
  };

  this.onError = (err) => {
    console.log(`ServEvent: 'Error', Message: ${err.message}`);
  };

};
