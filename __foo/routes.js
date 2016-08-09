"use strict";

var policies = require(__base + "./config/policies");

exports = module.exports = function(app) {
	var auth = app.auth;

	app.get("/:foo?", require(__base + "./api/controllers/PruebasController").index);
	app.get("/todo", require(__base + "./api/controllers/PruebasController").todo);
	app.post("/file", require(__base + "./api/controllers/PruebasController").upload);
	app.get("/hello", require(__base + "./api/controllers/PruebasController").hello);

	// UserController
	app.get("/users", require(__base + "./api/controllers/UserController").users);
	app.get("/login", require(__base + "./api/controllers/UserController").login);
	app.post("/login", require(__base + "./api/controllers/UserController").login_form);
	app.get("/register", require(__base + "./api/controllers/UserController").register);
	app.post("/register", require(__base + "./api/controllers/UserController").register_form);
	app.get("/logout", require(__base + "./api/controllers/UserController").logout);

	app.post("/token", require(__base + "./api/controllers/JWTController").token);
	app.get("/user", app.auth.authenticate(), require(__base + "./api/controllers/JWTController").user);

	//app.get("/admin*", [policies.ensureAuthenticated, policies.ensureAdmin]);

	//app.get("/api/user*", [policies.ensureAuthenticated, policies.ensureUser]);

	// ApplicationController
	//app.get("/api/user/home", policies.checkToken, require(__base + "./api/controllers/ApplicationController").home);
	app.get("/home/:foo?", [app.auth.authenticate(), policies.lol5], require(__base + "./api/controllers/ApplicationController").home);
	app.get("/todo", require(__base + "./api/controllers/ApplicationController").todo);

	// FaqController
	app.get("/faq/:lang", require(__base + "./api/controllers/FaqController").trololo_lang);


	//route not found
	app.all('*', require(__base + "./api/controllers/ApplicationController").http404);
};