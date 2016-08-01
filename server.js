"use strict";

// TODO: Environment!!
var express = require("express"),
	http = require('http'),
	auth = require("./config/passport")(),
	config = require("./config/application"),
	bodyParser = require("body-parser"),
	expressValidator = require('express-validator'),
	auth = require("./config/passport")();

var Server = (function () {
    function Server() {
    	this.app = express();
    	this.router = express.Router();
    }
    Server.prototype.register_static_dir = function(dir) {
		this.app.use(express.static(__dirname + dir));
    };
    Server.prototype.register_static_route = function(route, dir) {
		this.app.use(route, express.static(__dirname + dir));
    };
    Server.prototype.configure = function () {
		// Set view engine
		this.app.set("view engine", "pug");

		// Re-asign views directory
		this.app.set("views", __dirname + "/resources/views");

		// compress all requests
		this.app.use(require('compression')())

		// log every request to the console
		this.app.use(require('morgan')('dev'));

		// HTTP Security Headers
		this.app.use(require("helmet")());

		this.app.auth = auth;

		/// Init passport auth
		this.app.use(this.app.auth.initialize());

		this.app.utils = {
			workflow: require('./utils/workflow')
		};

		this.app.config = config;

		// Set port
		this.app.set("port", config.port);

		// Params validation
		this.app.use(expressValidator( require("./config/validations")));

		this.app.use( bodyParser.urlencoded({ extended: true }) );
		this.app.use( bodyParser.json() );

		this.app.use(this.router);

		// Main route
		this.router.all('*', function (req, res, next) {  
			console.log('Someone made a request!');
			next();
		});
    };
    Server.prototype.register = function() {
		require("./config/models");
		require("./config/services");
		require("./routes")(this.app);

		// Handle 500
		this.app.use(require('./api/controllers/ApplicationController').http500);
    };
    Server.prototype.router = function(prefix, router) {
    	this.app.use(prefix, router);
    };
    Server.prototype.start = function () {
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
    return Server;
}());

module.exports = Server;