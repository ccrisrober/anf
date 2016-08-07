"use strict";

var express = require("express"),
	http = require('http'),
	auth = require("./config/passport")(),
	config = require("./config/application"),
	bodyParser = require("body-parser"),
	expressValidator = require('express-validator'),
	auth = require("./config/passport")();

var Server = (function () {
	function Server(env, enforce_ssl) {
		this.app = express();
		this.router = express.Router();
		this.env = env;
		this.shuttingDown = false;
		if(enforce_ssl === true) {
			var enforceSSL = require("express-enforces-ssl");

			this.app.enable("trust proxy");
			this.app.use(enforceSSL());
		}
	}
	Server.prototype.register_static_dir = function(dir) {
		this.app.use(express.static(__dirname + dir));
	};
	Server.prototype.register_static_route = function(route, dir) {
		this.app.use(route, express.static(__dirname + dir));
	};
	Server.prototype.setViewEngine = function() {
		var views = require(__dirname + "/config/views").views;

		this.app.set("view engine", views.engine || "pug");
		this.app.set("view options", {
			layout: views.layout || false
		});
		this.app.locals.pretty = views.pretty || false;

		// Re-asign views directory
		this.app.set("views", views.directory);
	}
	Server.prototype.configure = function () {

		// Set view engine
		this.setViewEngine();

		this.app.use(require('serve-favicon')(__dirname + '/public/favicon.png'));

		// compress all requests
		this.app.use(require('compression')())

		// log every request to the console
		this.app.use(require('morgan')('dev'));
		/*this.app.use(require('express-bunyan-logger')({
			immediate: true,
		    name: 'logger',
		    streams: [{
		        level: 'info',
		        stream: process.stdout
		        }]
		    }));*/


		// HTTP Security Headers
		if(this.env == "production") {
			this.app.use(require("helmet")());
		}

		this.app.auth = auth;

		/// Init passport auth
		this.app.use(this.app.auth.initialize());

		/**
		this.app.utils = {
			workflow: require('./utils/workflow')
		};
		/**/

		this.app.config = config;

		// Set port
		this.app.set("port", config.port);

		// Params validation
		this.app.use(expressValidator( require("./config/validations") ));

		this.app.use( bodyParser.urlencoded({ extended: true }) );
		this.app.use( bodyParser.json() );

		this.app.use(this.router);

		// Main route
		this.router.all('*', function (req, res, next) {  
			console.log('Someone made a request!');
			next();
		});

		/*this.app.use(function(req, res, next) {
			if(this.shuttingDown) {
				return;
			}
			next();
		});*/
	};
	Server.prototype.register = function() {
		var fs = require("fs");
		var resPath = "./config/responses";
		var resList = fs.readdirSync(resPath);
		resList.forEach(function(res) {
			var resName = res.split(".")[0];
			//console.log("Register " + resName);
			express.response[resName] = require(resPath + "/" + res);
		});
	};
	Server.prototype.add_api_version = function(version, mod_route) {
		this.app.use(version, require(mod_route));
	};
	Server.prototype.start = function () {
		require("./config/routes")(this.app);
		
		// Handle 500
		this.app.use(require('./api/controllers/ApplicationController').http500);

		var self = this;

		this.server = http.createServer(this.app);
		this.server.listen(this.app.config.port);

		this.server.on("error", function onError(error) {
			if (error.syscall !== "listen") {
				throw error;
			}

			var bind = typeof port === "string"
				? "Pipe " + port
				: "Port " + port;

			// handle specific listen errors with friendly messages
			switch (error.code) {
				case "EACCES":
					console.error(bind + " requires elevated privileges");
					process.exit(1);
					break;
				case "EADDRINUSE":
					console.error(bind + " is already in use");
					process.exit(1);
					break;
				default:
					throw error;
			}
		});
		
		this.server.on("listening", function onListening() {
			var addr = self.server.address();
			var bind = typeof addr === "string"
				? "pipe " + addr
				: addr.port + " port";
			console.log("Server is running at " + bind);
		});
	};
	Server.prototype.stop = function() {
		var process = require("process");
		process.on('SIGINT', function() {
			this.shuttingDown = true;
			server.close(function(){
				process.exit();
			});
		});

	}
	return Server;
}());

module.exports = Server;