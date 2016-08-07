"use strict";

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var Server = require("./server");

var ioc = require("light-ioc");
global.__ioc = new ioc(true);

// Set base path in global system
global.__base = __dirname + '/';

function initServer() {
	if (cluster.isMaster) {
		console.log('Fork %s worker(s) from master', numCPUs);
		for (var i = 0; i < numCPUs; i++) {
			cluster.fork();
		}
		cluster.on('online', function(worker) {
			console.log('Worker is running on %s pid', worker.process.pid);
		});
		cluster.on('exit', function(worker, code, signal) {
			console.log('Worker with %s is closed', worker.process.pid );
		});
	} else if (cluster.isWorker) {

		var server = new Server();
		server.configure();

		var port = server.app.config.port;
		console.log('Worker (%s) is now listening to http://localhost:%s', cluster.worker.process.pid, port);
		
		// Main route
		server.router.all('*', function (req, res, next) {  
			console.log('cluster ' + cluster.worker.process.pid + ' responded \n');
			next();
		});

		// Static files directories
		server.register_static_dir("/public");
		server.register_static_dir("/vendor");

		// Documentation route
		server.register_static_route("/doc", "/apidoc");
		server.register_static_route("/coverage", "/coverage");

		server.register();

		server.add_api_version("/v1", "./config/routes/v1");
		server.add_api_version("/v2", "./config/routes/v2");
		server.start();
	}
}
require("./config/hooks").hooks(initServer);