'use strict';

const net = require('net');
const address = require('../config');
const serverObject = require('../../lib/server');
const connectionsObject = require('../objects/connections');
const chatsObject = require('../objects/chats');

// Initialize server;
let server = new serverObject();

// Initialize connections array;
let connections = new connectionsObject();

// Initialize chats array;
let chats = new chatsObject();

module.exports = {
  server,
  connections,
  chats
};
