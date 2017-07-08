'use strict';

function chats() {

  this.chats = [],

  this.getChats = (conn) => {
    return this.chats;
  },

  this.sendChat = (id, connection) => {
    let chat = this.findChat(id);
    if(chat) {
      chat[connection.id] = connection;
      return this.findChat(id);;
    } else {
      this.addChat(id)[connection.id] = connection;
      return this.findChat(id);
    }
  },

  this.addChat = (id) => {
    let chatId = `chat-${id}`;
    this.chats[chatId] = [];
    return this.chats[chatId];
  }

  this.addChatMember = (id, connection) => {
    let chatId = `chat-${id}`;
    return this.chats[chatId].push(connection); 
  }

  this.findChat = (id) => {
    let chatId = `chat-${id}`;
    return this.chats[chatId];
  }
}

module.exports = chats;
