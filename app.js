"use strict";
// TODO: https://www.npmjs.com/package/node-sender
// TODO: var Server = require("./server");

var config = require("./config/application"),
	express = require("express"),
	bodyParser = require("body-parser"),
	knex = require("knex"),
	http = require('http'),
	helmet = require("helmet"),
	path = require("path"),
	expressValidator = require('express-validator'),
	compression = require('compression'),
	morgan = require('morgan'), 		// Logging
	auth = require("./config/passport")();

// Set base path in global system
global.__base = __dirname + '/';

var app = express();
var router = express.Router();

app.config = config;

app.auth = auth;

app.utils = {
	workflow: require('./utils/workflow')
};

app.server = http.createServer(app);


function configure(app) {
	// Set view engine
	app.set("view engine", "pug");
	// Re-asign views directory
	app.set("views", __dirname + "/resources/views");

	app.use( bodyParser.urlencoded({ extended: true }) );
	app.use( bodyParser.json() );

	// Set port
	app.set("port", config.port);

	// compress all requests
	app.use(compression())
	// log every request to the console
	app.use(morgan('dev'));
	// HTTP Security Headers
	app.use(helmet());
	// Params validation
	app.use(expressValidator( require("./config/validations")));
	/// Init passport auth
	app.use(auth.initialize());

	app.use(router);

	// Static files directories
	app.use(express.static(__dirname + '/public'));
	app.use(express.static(__dirname + '/vendor'));
}

configure(app);

// Documentation route
app.use("/doc", express.static(__dirname + "/apidoc"));
app.use("/coverage", express.static(__dirname + "/coverage"));

// Main route
router.all('/', function (req, res, next) {  
	console.log('Someone made a request!');
	next();
});

require("./config/model");
require("./routes")(app);

// Handle 500
app.use(require('./api/controllers/ApplicationController').http500);

app.server.listen(app.config.port);

app.server.on("error", function onError(error) {
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

app.server.on("listening", function onListening() {
	var addr = app.server.address();
	var bind = typeof addr === "string"
		? "pipe " + addr
		: addr.port + " port";
	console.log("Server is running at " + bind);
});