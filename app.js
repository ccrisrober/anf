"use strict";

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
app.use( helmet() );

app.use( auth.initialize() );


app.use( expressValidator( require("./config/validations") ) );

app.config = config;

app.utility = {};
app.utility.workflow = require('./utils/workflow');

app.server = http.createServer(app);

// settings
app.disable('x-powered-by');
app.set("port", config.port);

app.use(router);
app.use(express.static(__dirname + '/public'));
app.use('/',  express.static(__dirname + '/vendor'));

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
	require("./api/models/User").forge({
		id: req.user.id
	}).fetch()
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

		require("./api/models/User").forge({
			email: email,
			password: password
		}).fetch()
		.then(function(user) {
			if(user) {
				var payload = {id: user.id};
				console.log(payload);
				var cfg = {
					jwtSecret: "MyS3cr3tK3Y",
					jwtSession: {session: false}
				};
				var jwt = require("jwt-simple");
				var token = jwt.encode(payload, cfg.jwtSecret);
				res.json({token: token});
			} else {
				res.sendStatus(401);
			}
		})
		.catch(function(err) {
			return res.json(err);
		});
	} else {
		req.sendStatus(401);
	}
});


require("./config/model");
require("./routes")(app);

// Handle 404
app.use(function(req, res) {
  	res.status(404).send({status:404, message: 'page not found', type:'not found'}); 
});
  
// Handle 500
app.use(function(error, req, res, next) {
	console.log(error);
  	res.status(500).send({status:500, message: 'internal error', type:'internal'}); 
});

// TODO: https://github.com/anotheri/express-routescan

app.server.listen(app.config.port);

function onError(error) {
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
};
function onListening() {
	var addr = app.server.address();
	var bind = typeof addr === "string"
		? "pipe " + addr
		: addr.port + " port";
	console.log("Server is running at " + bind);
};

app.server.on("error", onError);
app.server.on("listening", onListening);