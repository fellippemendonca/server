'use strict';

const serverObject = require('../objects/server');
const connectionsObject = require('../objects/connections');
const usersObject = require('../objects/users');
const chatsObject = require('../objects/chats');

// Initialize server;
let server = new serverObject();

// Initialize connections array;
let connections = new connectionsObject();

// Initialize connections array;
let users = new usersObject();

// Initialize chats array;
let chats = new chatsObject();

module.exports = {
  server,
  connections,
  users,
  chats
};
