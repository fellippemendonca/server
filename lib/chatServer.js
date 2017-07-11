'use strict';

const net = require('net');
const address = require('../app/config');
const usersObject = require('../app/modules/users');
const chatsObject = require('../app/modules/chats');

module.exports = chatServer;


// This Object contains all basic methods of current used server lib: ('net') . 
function chatServer(app) {
  this.app = app;
  this.users;
  this.chats;
  this.server;

  // Start Server;
  this.start = () => {
    this.users = new usersObject();
    this.chats = new chatsObject();
    this.server = net.createServer();
    this.listenEvents();
  },

  // Listen Events
  this.listenEvents = () => {
    this.server.listen(address.port, address.host);
    this.serverEvents();
    console.log('Server listening...');
  },

  // Server Events;
  this.serverEvents = () => {
    let serverEventsObj = require('./events/serverEvents');
    let serverEvents = new serverEventsObj();

    this.server.on('listening', (obj) => {
      serverEvents.onListening(obj);
    });

    this.server.on('connection', (connection) => {
      let connObj = buildConnObj(connection);
      serverEvents.onConnetion(connObj, this.connectionEvents);
    });
    
    this.server.on('close', (obj) => {
      serverEvents.onClose(obj);
    });
    
    this.server.on('error', (obj) => {
      serverEvents.onError(obj);
    });
  },

  // Connection Events;
  this.connectionEvents = (connObj) => {
    let clientEventsObj = require('./events/clientEvents');
    let clientEvents = new clientEventsObj( connObj, this.users, this.chats ); 

    connObj.connection.on('connect', (obj) => {
      clientEvents.onConnect(obj);
    });

    connObj.connection.on('data', (data) => {
      let jsonData = dataParser(data);
      clientEvents.onData(jsonData);
    });
    
    connObj.connection.on('close', (obj) => {
      clientEvents.onClose();
    });

    connObj.connection.on('error', (obj) => {
      clientEvents.onError(obj);
    });

    connObj.connection.on('timeout', (obj) => {
      clientEvents.onTimeout(obj);
    });
  }
}

// HELPERS 

// Connection object Builder
function buildConnObj(connection) {
  return {
    id: connection.remoteAddress + ':' + connection.remotePort,
    connection: connection
  }
}

// Received Data parser;
function dataParser(data) {
  return JSON.parse(data);
}