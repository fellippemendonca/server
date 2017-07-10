'use strict';

module.exports = {
    onListening,
    onConnetion,
    onClose,
    onError
};

function onListening() {
    console.log(`ServEvent: 'listening'`);
};

function onConnetion(connection) {
    let connections = require('../app/initializers/').connections;
    // let connectionHandler = require('./connectionHandler');
    console.log(`ServEvent: 'connection', Connection: ${connection.remoteAddress + ':' + connection.remotePort}`);

    //Add New Connection to Connected Users Hash:
    connections.addConn(connection);
};

function onClose() {
    console.log(`ServEvent: 'Close', Connection: ${connection.remoteAddress + ':' + connection.remotePort}`);
};

function onError(err) {
    console.log(`ServEvent: 'Error', Message: ${err.message}`);
};




