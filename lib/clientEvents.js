'use strict';

let connections = require('../app/initializers/').connections;
let chats = require('../app/initializers/').chats;

module.exports = {
    onListening,
    onData,
    onClose,
    onError
};

function onListening() {
    console.log(`ConnEvent: 'listening'`);
};

function onData(data, connection) {
    let connections = require('../app/initializers/').connections;
    let chats = require('../app/initializers/').chats;

    console.log(`ConnEvent: 'data', Connection: ${connections.findConn(connection).id}`);

    // Parse received data to Json;
    let jsonData = dataParser(data, connection);
    
    // Bind user Object to connection;
    connections.bindUser(connection, jsonData.user);

    // Forward data event to event router:
    eventRouter(jsonData, connection);
};

function onClose(connection) {
    connections.delConn(connection);
    connection.destroy();
    console.log(`ConnEvent: 'close', Connection: ${connections.findConn(connection).id}`);
};

function onError(err, connection) {
    console.log(`ConnEvent: 'error', Message: ${err.message}, Connection: ${connections.findConn(connection).id}`);
    connections.delConn(connection);
};

function eventRouter(data, connection) {
  //console.log(chats.chats);
  
  switch(data.event) {
    // Call chatId broadcasting method
    case 'chat':
    let chatMembers = chats.sendChat(data.chatId, connections.findConn(connection));
    for ( let member in chatMembers ) {
      chatMembers[member].connection.write(JSON.stringify(data));
    }
    break;

    // Call update routing method
    case 'update': break;

    // When event not detected;
    default: console.log(`Event not Recognized: ${data}`);
  }
}

// Connection Received Data parser
function dataParser(data) {
  return JSON.parse(data);
}


