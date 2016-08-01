"use strict";
// TODO: https://www.npmjs.com/package/node-sender

var Server = require("./server");

var ioc = require("anf-ioc");
global.__ioc = new ioc();

// Set base path in global system
global.__base = __dirname + '/';

var server = new Server();
server.configure();
server.register();
server.start();

//console.log(__ioc.$data);
