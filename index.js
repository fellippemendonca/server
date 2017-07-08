'use strict';

let server = require('./app/initializers/').server;
let serverHandler = require('./lib/serverHandler');

serverHandler(server);
