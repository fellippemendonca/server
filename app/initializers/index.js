'use strict';

const net = require('net');
const address = require('../config');
const serverObject = require('./server');
const connectionsObject = require('./connections');
const chatsObject = require('./chats');

// Initialize server;
let server = new serverObject().start();

// Initialize connections array;
let connections = new connectionsObject();

// Initialize chats array;
let chats = new chatsObject();

module.exports = {
  server,
  connections,
  chats
};
