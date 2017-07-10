'use strict';

let connections = require('../app/initializers/').connections;
let chats = require('../app/initializers/').chats;

module.exports = eventRouter;

function eventRouter(data, connection) {
  switch(data.event) {

    case 'chat': // Call chatId broadcasting method;
        let chatMembers = chats.sendChat(data.chatId, connections.findConn(connection));
        
        for ( let member in chatMembers ) {
           chatMembers[member].connection.write(JSON.stringify(data));
        }
    break;

    case 'update': // Call update routing method;
    break;
    
    default: // When event not detected; 
      console.log(`Event not Recognized: ${data}`);
  }
}
