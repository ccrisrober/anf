"use strict";

module.exports = {
	loginJWT: function(req, res) {
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

	getUser: function(req, res) {
		__ioc.$inject("User", function(u) {
			console.log(req.user);
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
	},

	register: function(req, res) {
		req.checkBody("email", "Email required").notEmpty().isEmail();
		req.checkBody("password", "Password required").notEmpty();
		req.checkBody("name", "Name required").notEmpty();

		var errors = req.validationErrors();
		if(errors) {
			return res.send(errors);
		} else {
			var email = req.body.email;
			var password = req.body.password;
			var name = req.body.name;
			__ioc.$inject("User", function(u) {
				u.create({
					email: email,
					password: password,
					name: name
				})
				.then(function(user) {
					res.success(true, "User created");
				})
				.catch(function(err) {
					res.json(err);
				});
			});
		}
	}
};