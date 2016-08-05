"use strict";
var Todo_ = require(__base + "./api/models/Todo");

module.exports = {
	home: function(req, res) {
		return res.render(
			"home"
		);
	},

	todo: function(req, res) {
		Todo_.collection().fetch().then(function(t) {
			console.log(t);
			return res.render(
				"todo"
			);
		}).catch(function(err) {
			res.json(err);
		});
	},

	// TODO: Mover a otro sitio
	http404: function(req, res) {
		res.status(404);
		if(req.xhr) {
			return res.send({error: "Resource not found"});
		}
		else res.render("errors/404");
	},

	http500: function(err, req, res) {
		console.log(res);
		res.status(500);
		if(req.app.get("env") === "development") {
			console.log(err.stack);
		}
		if(req.xhr) {
			res.send({status:500, message: err }); 
		} else {
			res.render("errors/500", err);
		}
	}
};