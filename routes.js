"use strict";

exports = module.exports = function(app) {
	app.get("/", require("./api/controllers/PruebasController").index);
	app.post("/file", require("./api/controllers/PruebasController").upload);

	// UserController
	app.post("/users/authenticate", require("./api/controllers/UserController").authenticate);
	app.post("/users/forgotten_password", require("./api/controllers/UserController").forgotten_password);
	app.get("/users/restore_password", require("./api/controllers/UserController").restore_password);
}