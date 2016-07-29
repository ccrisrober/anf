"use strict";

exports = module.exports = function(app) {
	app.get("/", require("./api/controllers/PruebasController").index);
	app.get("/todo", require("./api/controllers/PruebasController").todo);
	app.post("/file", require("./api/controllers/PruebasController").upload);
	app.get("/hello", require("./api/controllers/PruebasController").hello);

	// UserController
	app.post("/users/authenticate", require("./api/controllers/UserController").authenticate);
	app.post("/users/forgotten_password", require("./api/controllers/UserController").forgotten_password);
	app.get("/users/restore_password", require("./api/controllers/UserController").restore_password);

	// FaqController
	app.get("/faq/:lang", require("./api/controllers/FaqController").trololo_lang);
};