'use strict';

let server = require('./app/initializers/').server;
let serverEventHandler = require('./lib/serverEventHandler');

serverEventHandler(server);
