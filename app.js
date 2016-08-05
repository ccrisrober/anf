"use strict";
// TODO: https://www.npmjs.com/package/node-sender

// Set base path in global system
global.__base = __dirname + '/';

var i18n = require("i18n");
i18n.configure(require("./config/i18n").i18n);

console.log(i18n.__("Welcome"));
i18n.setLocale("es");
console.log(i18n.__("Welcome"));

var Server = require("./server");

var ioc = require("light-ioc");
global.__ioc = new ioc(true);

var server = new Server();
server.configure();

// Static files directories
server.register_static_dir("/public");
server.register_static_dir("/vendor");

// Documentation route
server.register_static_route("/doc", "/apidoc");
server.register_static_route("/coverage", "/coverage");

server.register();

server.add_api_version("/v1", require("./routes/v1"));
server.add_api_version("/v2", require("./routes/v2"));
server.start();