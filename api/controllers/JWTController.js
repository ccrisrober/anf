"use strict";

module.exports = {
	/**
	 * @api {post} /login Login user
	 * @apiDescription Login user with JWT
	 * 
	 * @apiName Login
	 * @apiGroup JWT
	 *
	 * @apiParam {String} email User email
	 * @apiParam {String} password User password
	 *
	 * @apiSuccess {string} token User JWT token
	 *
	 * @apiSuccessExample Success-Response:
	 * HTTP/1.1 200 OK
	 * {
	 * 	"token": TOKEN
	 * }
 
	 * @apiError UserNotFound User dont found
	 * @apiError errors Validation errors
 
	 * @apiErrorExample Error-Response:
	 * HTTP/1.1 404 Not Found
	 * {
	 * 	"error": "UserNotFound"
	 * }
	 **/
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

	/**
	 * @api {get} /user User model
	 * @apiDescription Get user model data
	 * 
	 * @apiName User
	 * @apiGroup JWT
	 *
	 * @apiParam {String} token User JWT token
	 *
	 * @apiSuccess {object} user User data
	 *
	 * @apiSuccessExample Success-Response:
	 * HTTP/1.1 200 OK
	 * {
	 *	"user": {}
	 * }
 	 *
	 * @apiError UserNotFound User dont found
 	 *
	 * @apiErrorExample Error-Response:
	 * HTTP/1.1 404 Not Found
	 * {
	 * 	"error": "UserNotFound"
	 * }
	 **/
	getUser: function(req, res) {
		__ioc.$inject("User", function(u) {
			console.log(req.user);
			u.findById(req.user.id)
				.then(function(user) {
					if (user) {
						res.json({
							user: user.toJSON()
						});
					} else {
						return res.json("User not found");
					}
				})
				.catch(function(err) {
					return res.json(err);
				});
		});
	},

	/**
	 * @api {post} /register Register user
	 * @apiDescription Register user
	 * 
	 * @apiName Register
	 * @apiGroup JWT
	 *
	 * @apiParam {String} email User email
	 * @apiParam {String} password User password
	 * @apiParam {String} name User name
	 *
	 * @apiSuccess {boolean} success True if created
	 * @apiSuccess {string} message Extra message
	 *
	 * @apiSuccessExample Success-Response:
	 * HTTP/1.1 200 OK
	 * {
	 *	success: val,
	 *	message: msg
	 * }
 
	 * @apiError UserNotFound User dont found
	 * @apiError errors Validation errors
 
	 * @apiErrorExample Error-Response:
	 * HTTP/1.1 404 Not Found
	 * {
	 * 	"error": "UserNotFound"
	 * }
	 **/
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
				u
					.create({
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
		};
	},

	/**
	 * @api {put} /edit Edit user
	 * @apiDescription Edit user
	 * 
	 * @apiName Edit
	 * @apiGroup JWT
	 *
	 * @apiParam {String} email User email
	 * @apiParam {String} password User password
	 * @apiParam {String} name User name
	 *
	 * @apiSuccess {boolean} success True if created
	 * @apiSuccess {string} message Extra message
	 *
	 * @apiSuccessExample Success-Response:
	 * HTTP/1.1 200 OK
	 * {
	 *	success: val,
	 *	message: msg
	 * }
 
	 * @apiError UserNotFound User dont found
	 * @apiError errors Validation errors
 
	 * @apiErrorExample Error-Response:
	 * HTTP/1.1 404 Not Found
	 * {
	 * 	"error": "UserNotFound"
	 * }
	 **/
	 editUser: function(req, res) {
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

		 	__ioc.$inject("User", function(User) {
				console.log(req.user);
				User.update({
					id: req.user.id
				}, {
					email: email,
					password: password,
					name: name
				})
				.then(function(user) {
					res.success(true, "User edited");
				})
				.catch(function(err) {
					res.json(err);
				});
			});
		}
	}
};