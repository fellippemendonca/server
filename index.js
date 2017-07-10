'use strict';

let server = require('./app/initializers/').server;
let serverEventHandler = require('./lib/serverEventHandler');

server.start();
server.listenEvents();
// serverEventHandler(server);
