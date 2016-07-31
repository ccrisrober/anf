"use strict";
var User = require(__base + "./api/models/User");

exports.token = function(req, res) {
	if (req.body.email && req.body.password) {
		var email = req.body.email;
		var password = req.body.password;

		User.login(email, password)
			.then(function(user) {
				if(user) {
					res.json({token: req.app.auth.token(user.id)});
				} else {
					res.sendStatus(401);
				}
			})
			.catch(function(err) {
				return res.json(err);
			});
	} else {
		res.sendStatus(401);
	}
};

exports.user = function(req, res) {
	User.findById(req.user.id)
		.then(function(user) {
			if (user) {
				res.json(user.toJSON());
			} else {
				return res.json("User not found");
			}
		})
		.catch(function(err) {
			return res.json(err);
		});
};