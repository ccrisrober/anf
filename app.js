"use strict";
// TODO: https://www.npmjs.com/package/node-sender

var Server = require("./server");

var ioc = require("anf-ioc");
global.__ioc = new ioc();

// Set base path in global system
global.__base = __dirname + '/';

var server = new Server();
server.configure();

// Static files directories
server.register_static_dir("/public");
server.register_static_dir("/vendor");

// Documentation route
server.register_static_route("/doc", "/apidoc");
server.register_static_route("/coverage", "/coverage");

/*__ioc.$set("hello", function(name) {
	return "Hello " + name;
});

__ioc.$call(function(hello) {
	console.log(hello("John"));
});*/

server.register();
server.start();

//console.log(__ioc.$data);
