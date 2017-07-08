'use strict';

let connections = require('../app/initializers/').connections;
let connectionHandler = require('./connectionHandler');

function serverHandler(server) {
  server.on('connection', (connection) => {
    console.log('Connection opened!');
    
    //Add New Connection to Connected Users Hash:
    connections.addConn(connection);

    //Assign the new Connection to Connection Handler:
    connectionHandler(connection);
  });
};

module.exports = serverHandler;
