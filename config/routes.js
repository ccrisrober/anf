"use strict";

var policies;

exports = module.exports = function(app) {
	var auth = app.auth;
	policies = require(__base + "./config/policies")(app);

	app.get("/", require(__base + "./api/controllers/WelcomeController").index);

	app.post("/login", require(__base + "./api/controllers/JWTController").loginJWT);
	app.post("/register", require(__base + "./api/controllers/JWTController").register);
	app.get("/user", policies.authenticate(), 
		require(__base + "./api/controllers/JWTController").getUser);
	app.get("/role", [policies.authenticate()], function(req, res) {
		return res.json(req.user);
	});
	app.get("/user_", [policies.authenticate(), policies.ensureUser], function(req, res) {
		return res.json(req.user);
	});
	app.get("/admin_", [policies.authenticate(), policies.ensureAdmin], function(req, res) {
		return res.json(req.user);
	});

	//route not found
	app.all('*', require(__base + "./api/controllers/ApplicationController").http404);
};