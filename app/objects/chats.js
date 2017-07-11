'use strict';

module.exports = chats;

function chats() {

  this.chats = {},

  this.getChats = () => {
    return this.chats;
  },

  this.enterChat = (id, userId) => {
    let chat = this.findChat(id);

    if(chat) {
      this.addChatMember(id, userId);
      return this.findChat(id);
    } else {
      this.addChat(id);
      this.addChatMember(id, userId);
      return this.findChat(id);
    }
  },

  this.addChat = (id) => {
    this.chats[id] = {};
    return this.chats[id];
  },

  this.addChatMember = (id, userId) => {
    this.findChat(id)[userId] = userId;
    return this.chats[id]; 
  },

  this.delChatMember = (userId) => {
    for ( let element in this.chats ) {
      delete this.chats[element][userId];
    }
  },

  this.findChat = (id) => {
    return this.chats[id];
  }
}
