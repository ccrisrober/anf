"use strict";
var User = require(__base + "./api/models/User");

module.exports = {
	login: function(req, res) {
		res.render(
			"login"
		);
	},
	login_form: function(req, res) {
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
	},
	register: function(req, res) {
		res.render(
			"register"
		);
	},
	register_form: function(req, res) {
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
	},
	logout: function(req, res) {
		req.logout(); // TODO: Así de fácil??
		res.json({ success: "OK" });
	},
	// TODO: https://www.npmjs.com/package/bookshelf-fields REVISAR

	users: function(req, res) {
		//User.findAll({password: "12345678"})
		//User.findAll({password: "12345678", "email": "ccrisrober@gmail.com"})
		//User.findOne({email: "ccrisrober@gmail.com"})
		//User.findOne({id: 2})
		//User.findById(2)
		/*User.create({
			email: "jojo@jojo.com",
			password: "666666666",
			name: "Chema Alonso"
		})*/
		//User.destroy({id: 4})
		/*User.update({
			id: 500
		}, {
			username: "Joselito1"
		})*/
		/*User.updateOrCreate({id: 500}, {
			email: "jcssojoxD@jojo.com",
			password: "666666666",
			name: "sdChemcaxD Alonso"
		})*/
		User.updateOrCreate({
			id: 115
		}, {
			email: "jcssojoxD@jojo.com",
			password: "666666666",
			name: "so"
		})
		.then(function(user) {
			res.json(user);
		})
		.catch(function(err) {
			res.json(err);
		});
	}
};