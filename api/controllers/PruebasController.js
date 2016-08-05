"use strict";

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
exports.index = function(req, res) {
	__ioc.$inject("user", function(u) {
		u.where("userid", "<", 109).fetchAll({debug: true}).then(function(users) {
	        console.log(JSON.stringify(users.toJSON()));
			res.render(
				"index",
				{
					title: "Hey listen!",
					message: "TLOZ Ocarine of Time",
					users: users.toJSON()
				}
			);
		}).catch(function(err) {
			res.json(err);
		});
	});
};
exports.upload = function(req, res) {
	var upload = require(__base + "./api/services/UploadService");
	return upload.upload_images(req, res, "photo");
};

exports.hello = function(req, res) {
	res.send("hello");
};

exports.todo = function(req, res) {
	res.render(
		"todo"
	);
};