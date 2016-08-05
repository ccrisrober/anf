"use strict";

module.exports = {
	token: function(req, res) {
		if (req.body.email && req.body.password) {
			var email = req.body.email;
			var password = req.body.password;

			__ioc.$inject("User", function(u) {
				u.login(email, password)
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
			});
		} else {
			res.sendStatus(401);
		}
	},

	user: function(req, res) {
		__ioc.$inject("User", function(u) {
			u.findById(req.user.id)
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
		});
	}
};