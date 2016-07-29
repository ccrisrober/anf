"use strict";

var policies = require(__base + "./config/policies");

exports = module.exports = function(app) {
	app.get("/", require("./api/controllers/PruebasController").index);
	app.get("/todo", require("./api/controllers/PruebasController").todo);
	app.post("/file", require("./api/controllers/PruebasController").upload);
	app.get("/hello", require("./api/controllers/PruebasController").hello);

	// UserController
	app.post("/login", require("./api/controllers/UserController").login);
	app.post("/register", require("./api/controllers/UserController").register);
	app.get("/logout", require("./api/controllers/UserController").logout);

	app.get("/admin*", [policies.ensureAuthenticated, policies.ensureAdmin]);

	app.get("/api/user*", [policies.ensureAuthenticated, policies.ensureUser]);

	// ApplicationController
	app.get("/api/user/home", policies.checkToken, require("./api/controllers/ApplicationController").home);

	// FaqController
	app.get("/faq/:lang", require("./api/controllers/FaqController").trololo_lang);


	//route not found
	app.all('*', require('./api/controllers/ApplicationController').http404);
};