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
	req.assert('username', 'can not be empty').notEmpty();
    req.assert('username', 'must be string').isString();
    
	req.assert('email', 'can not be empty').notEmpty();
    req.assert('email', 'must be string').isEmail();
    
	req.assert('password', 'can not be empty').notEmpty();
    req.assert('password', 'must be string').isString();
    var errors = req.validationErrors();

    if (errors) {
    	return res.render(
			"register",
			{
				errors: errors
			}
		)
    }

	var user = new User({
		email: req.body.email,
		password: req.body.password,
		name: req.body.username
	});
	user.save()
		.then(function(user) {
			return res.redirect("/login");
			//res.json({  error: false, data: { id: user.get("id") } });
		})
		.catch(function(err) {
			return res.render(
				"register",
				{
					errors: err.message
				}
			);
		});
};
exports.logout = function(req, res) {
	req.logout(); // TODO: Así de fácil??
	res.json({ success: "OK" });
};
// TODO: https://www.npmjs.com/package/bookshelf-fields REVISAR