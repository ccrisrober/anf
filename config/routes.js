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

	app.put("/editUser", policies.authenticate(), 
		require(__base + "./api/controllers/JWTController").editUser);

	app.get("/role", [policies.authenticate()], function(req, res) {
		return res.json(req.user);
	});
	app.get("/user_", [policies.authenticate(), policies.ensureUser], function(req, res) {
		return res.json(req.user);
	});
	app.get("/admin_", [policies.authenticate(), policies.ensureAdmin], function(req, res) {
		return res.json(req.user);
	});

	// TODO
	app.post("/addtodo", [policies.authenticate()], 
		require(__base + "./api/controllers/TodoController").add);

	app.get("/todos", [policies.authenticate()], 
		require(__base + "./api/controllers/TodoController").get);

	app.get("/todo/:id", [policies.authenticate()], 
		require(__base + "./api/controllers/TodoController").show);

	app.put("/todo/:id", [policies.authenticate()], 
		require(__base + "./api/controllers/TodoController").edit);

	// CATEGORY
	app.get("/categories", 
		require(__base + "./api/controllers/CategoryController").index);
	app.post("/category", 
		require(__base + "./api/controllers/CategoryController").create);
	app.get(["/category/:id", "/categories/:id"], 
		require(__base + "./api/controllers/CategoryController").get);
	app.put("/category/:id", 
		require(__base + "./api/controllers/CategoryController").update);
	app.delete("/category/:id", 
		require(__base + "./api/controllers/CategoryController").destroy);

	//route not found
	app.all('*', require(__base + "./api/controllers/ApplicationController").http404);
};