'use strict';

let connections = require('../app/initializers/').connections;
let connectionHandler = require('./connectionHandler');

function serverEventHandler(server) {
  server.on('connection', (connection) => {
    console.log(`ServEvent: 'connection', Connection: ${connection.remoteAddress + ':' + connection.remotePort}`);
    
    //Add New Connection to Connected Users Hash:
    connections.addConn(connection);

    //Assign the new Connection to Connection Handler:
    connectionHandler(connection);
  });
};

module.exports = serverEventHandler;
