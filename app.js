"use strict";
// TODO: https://www.npmjs.com/package/node-sender
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

app.set("view engine", "pug");
// Re-asign views direcotry
app.set("views", __dirname + "/resources/views");

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

// compress all requests
app.use(compression())
// log every request to the console
app.use(morgan('dev'));
// HTTP Security Headers
app.use(helmet());
// TODO
//	* https://github.com/helmetjs/hide-powered-by
//	* https://github.com/helmetjs/x-xss-protection
//	* https://github.com/helmetjs/frameguard
//	* https://github.com/helmetjs/csp

app.use( auth.initialize() );


app.use( expressValidator( require("./config/validations") ) );

app.config = config;

app.utility = {};
app.utility.workflow = require('./utils/workflow');

app.server = http.createServer(app);

// settings
app.set("port", config.port);

app.use(router);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/vendor'));

// Documentation route
app.use("/doc", express.static(__dirname + "/apidoc"));
app.use("/coverage", express.static(__dirname + "/coverage"));

// Main route
router.all('/', function (req, res, next) {  
	console.log('Someone made a request!');
	next();
});

// TODO: Authenticate no es el correcto D:
app.get("/user", auth.authenticate(), function(req, res) {
	console.log(req.user.id);
	var User = require("./api/models/User");
	User.findById(req.user.id)
		.then(function(user) {
			if (user) {
				res.json(user.toJSON());
			} else {
				return res.json("User not found");
			}
		})
		.catch(function(err) {
			return res.json(err);
		});
});

app.post("/token", function(req, res) {
	if (req.body.email && req.body.password) {
		var email = req.body.email;
		var password = req.body.password;

		var User = require("./api/models/User");
		User.login(email, password)
			.then(function(user) {
				if(user) {
					res.json({token: auth.token(user.id)});
				} else {
					res.sendStatus(401);
				}
			})
			.catch(function(err) {
				return res.json(err);
			});
	} else {
		res.sendStatus(401);
	}
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