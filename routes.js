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
	app.get("/faq/company/questions/:lang", require("./api/controllers/FaqController").get_company_faqs);
	app.get("/faq/person/questions/:lang", require("./api/controllers/FaqController").get_person_faqs);
	app.get("/term_use/company/:lang", require("./api/controllers/FaqController").term_use_company);
	app.get("/term_use/person/:lang", require("./api/controllers/FaqController").term_use_person);
	app.get("/privacy_policy/company/:lang", require("./api/controllers/FaqController").privacy_policy_company);
	app.get("/privacy_policy/person/:lang", require("./api/controllers/FaqController").privacy_policy_person);
};