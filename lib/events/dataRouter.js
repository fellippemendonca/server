'use strict';

module.exports = dataRouter;

function dataRouter(data, user, users, chats) {
  switch(data.event) {

    case 'chat': 
      chatRouting(data, user, users, chats);
    break;

    case 'update':
      updateRouting(data, user)
    break;

    default: // When event not detected;
    console.log(`Event not Recognized: ${data}`);
  }
}


// ##### ChatId broadcasting method #####
function chatRouting(data, user, users, chats) {
  let chatMembers = chats.enterChat(data.chatId, user.id);

  // Retrieve all userId from ChatId;
  for ( let member in chatMembers ) {
    let userId = chatMembers[member];
    if(userId !== user.id){
      // Get Connection related to UserId and Write data; 
      console.log(data);
      users.findConnByUser(userId).connection.write(JSON.stringify(data));
    }
  }
}

// ##### Update routing method #####
function updateRouting(data, user) {
  return true;
}
