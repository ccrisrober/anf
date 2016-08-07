"use strict";

// Set base path in global system
global.__base = __dirname + '/';

var i18n = require("i18n");
i18n.configure(require("./config/i18n").i18n);

//console.log(i18n.__("Welcome"));
//i18n.setLocale("es");
//console.log(i18n.__("Welcome"));

var Server = require("./server");

var ioc = require("light-ioc");
global.__ioc = new ioc(true);
global._ = require("lodash");

var env = process.env.NODE_ENV || "development";
env = env.replace(/\s/g, '');
//console.log(env);
var configDatabase = require("./knexfile")[env];
if (!configDatabase) {
    throw "Undefined environment";
}

require("./anf");

var server;
function initServer() {
	//console.log("Init Server");

	console.log(require("figlet").textSync('Anf', {
	    font: 'Ghost',
	    horizontalLayout: 'default',
	    verticalLayout: 'default'
	}));
	
	console.log(" ~~~~~~~~~~~~~~~~~ Version: " + require('./package.json').version);
	//console.log(__ioc._keys().length);
	
	/**/
	server = new Server(env, false);
	server.configure();

	// Static files directories
	server.register_static_dir("/public");
	server.register_static_dir("/vendor");
	
	// Documentation route
	if(env === "development") {
		server.register_static_route("/doc", "/apidoc");
		server.register_static_route("/coverage", "/coverage");
	}

	server.register();
	
	//console.log(__ioc._data);
	server.add_api_version("/v1", "./config/routes/v1");
	server.add_api_version("/v2", "./config/routes/v2");

	server.start();

	/**
	server.app._router.stack.forEach(function(r){
		if (r.route && r.route.path){
			console.log(r.route.path + " " + JSON.stringify(r.route.methods));
		}
	});
	/**/
}
require("./config/bootstrap").bootstrap(initServer);
module.exports = server;