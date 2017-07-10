'use strict';

let init = require('./app/initializers/');

init.server.start();
init.server.listenEvents();
