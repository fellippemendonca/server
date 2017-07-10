'use strict';

module.exports = chats;

function chats() {

  this.chats = [],

  this.getChats = (conn) => {
    return this.chats;
  },

  this.enterChat = (id, connection) => {
    let chat = this.findChat(id);

    if(chat) {
      this.addChatMember(id, connection)
      return this.findChat(id);
    } else {
      this.addChat(id);
      this.addChatMember(id, connection)
      return this.findChat(id);
    }
  },

  this.addChat = (id) => {
    let chatId = `#ff${id}`;
    this.chats[chatId] = [];
    return this.chats[chatId];
  },

  this.addChatMember = (id, connection) => {
    let chatId = `#ff${id}`;
    this.chats[chatId][connection.id] = connection;
    return this.chats[chatId]; 
  },

  this.delChatMember = (connection) => {
    for ( let element in this.chats ) {
      delete this.chats[element][connection.id];
    }
  },

  this.findChat = (id) => {
    let chatId = `#ff${id}`;
    return this.chats[chatId];
  }
}
