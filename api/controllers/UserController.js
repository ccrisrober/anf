"use strict";

exports.login = function(req, res) {
	var workflow = req.app.utility.workflow(req, res);
	// Validations
	workflow.on("validate", function() {
		// TODO: Check username, password, email
		// TODO: Comprobar username y email no repes
		if(workflow.hasErrors()) {
			return workflow.emit("response");
		}
		workflow.emit("createUser");
	});
	workflow.on("createUser", function() {
		// Creamos el usuario

		var user = { email: "fake@fake.com", "username": "foouser" };
		workflow.user = user;
		workflow.emit("sendWelcomeEmail");
	});
	workflow.on("sendWelcomeEmail", function() {
		// TODO: SendMail
		workflow.emit("logUser");
	});
	workflow.on("logUser", function() {
		workflow.emit("response");
	});
	workflow.emit("validate");
};
exports.register = function(req, res) {
	res.send("REGISTER");
};
exports.logout = function(req, res) {
	req.logout(); // TODO: Así de fácil??
	res.json({ success: "OK" });
};