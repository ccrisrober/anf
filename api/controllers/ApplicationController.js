"use strict";

exports.home = function(req, res) {
	return res.render(
		"home"
	);
};

// TODO: Mover a otro sitio
exports.http404 = function(req, res) {
	res.status(404);
	if(req.xhr) {
		return res.send({error: "Resource not found"});
	}
	else res.render("errors/404");
};

exports.http500 = function(err, req, res) {
	res.status(500);
	if(req.app.get("env") === "development") {
		console.log(err.stack);
	}
	if(req.xhr) {
  		res.send({status:500, message: err }); 
	} else {
		res.render("errors/500", err);
	}
};