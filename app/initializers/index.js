'use strict';

const serverObject = require('../modules/server');
const usersObject = require('../modules/users');
const chatsObject = require('../modules/chats');

// Initialize server;
let server = new serverObject();
server.start('app');

module.exports = server;
