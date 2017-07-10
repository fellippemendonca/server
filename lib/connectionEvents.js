'use strict';

module.exports = connectionEvents;

function connectionEvents(connection) {
  let clientEvents = require('./clientEvents');

  connection.on('data', (obj) => {
    clientEvents.onData(obj, connection);
  });
  
  connection.on('close', (obj) => {
    clientEvents.onClose(connection);
  });

  connection.on('error', (obj) => {
    clientEvents.onError(obj, connection);
  });
}
