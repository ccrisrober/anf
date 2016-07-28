"use strict";

var User = require(__base + "./api/models/User");
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
	res.render(
		"index",
		{
			title: "Hey listen!",
			message: "TLOZ Orarine of Time"
		}
	);
	/*User.collection().fetch().then(function(user) {
		res.json(user);
	}).catch(function(err) {
		res.json(err);
	});*/
};

exports.upload = function(req, res) {
	var upload = require(__base + "./api/services/UploadService");
	return upload.upload_file(req, res, "pepe");
};

exports.hello = function(req, res) {
	res.send("hello");
};

exports.todo = function(req, res) {
	res.render(
		"todo"
	);
};