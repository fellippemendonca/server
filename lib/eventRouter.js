'use strict';

let users = require('../app/initializers/').users;
let chats = require('../app/initializers/').chats;

module.exports = eventRouter;

function eventRouter(data, user) {
  switch(data.event) {

    case 'chat': // Call chatId broadcasting method;
        let chatMembers = chats.enterChat(data.chatId, user.id);
        
        for ( let member in chatMembers ) {          
          let userId = chatMembers[member];
          users.findConnByUser(userId).connection.write(JSON.stringify(data));
        }
    break;

    case 'update': // Call update routing method;
    break;
    
    default: // When event not detected; 
    console.log(`Event not Recognized: ${data}`);
  }
}
