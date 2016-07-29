"use strict";
var User = require(__base + "./api/models/User");

exports.login = function(req, res) {
	res.render(
		"login"
	);
};
exports.login_form = function(req, res) {
	User.login(req.body.email, req.body.password)
		.then(function(user) {
			if(user) {
				return res.redirect("/home");
			}
			res.render(
				"login",
				{
					errors: "User not found"
				}
			)
		})
		.catch(function(err) {
			//res.json(err);
			res.render(
				"login",
				{
					errors: err
				}
			)
		});
};
exports.register = function(req, res) {
	res.render(
		"register"
	);
};
exports.register_form = function(req, res) {
	console.log(req.body);
	if(!req.body.username || !req.body.email || !req.body.password) {
		return res.render(
			"register",
			{
				errors: "Please enter username, email and password"
			}
		)
	} else {
		var user = new User({
			email: req.body.email,
			password: req.body.password,
			name: req.body.username
		});
		user.save()
			.then(function(user) {
				res.json({ 
					error: false, data: { id: user.get("id") } 
				});
			})
			.catch(function(err) {
				return res.render(
					"register",
					{
						errors: err.message
					}
				);
			});
	}
};
exports.logout = function(req, res) {
	req.logout(); // TODO: Así de fácil??
	res.json({ success: "OK" });
};
// TODO: https://www.npmjs.com/package/bookshelf-fields REVISAR