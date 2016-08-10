"use strict";
// TODO: http://blog.ragingflame.co.za/2014/12/16/building-a-simple-api-with-express-and-bookshelfjs
module.exports = {
	index: function(req, res) {
		__ioc.$inject("Category", function(Category) {
			Category
				.fetchAll({debug: true})
				.then(function(categories) {
					res.json(categories);
				})
				.catch(function(err) {
					res.serverError(err.message);
				});
		});
	},
	create: function(req, res) {
		if(!req.body.name) {
			return res.serverError("Name undefined");
		}
		__ioc.$inject("Category", function(Category) {
			Category.create({
				name: req.body.name
			}, {debug: true})
				.then(function(category) {
					res.json(category);
				})
				.catch(function(err) {
					res.serverError(err.message);
				});
		});
	},
	get: function(req, res) {
		__ioc.$inject("Category", function(Category) {
			Category.findById(req.params.id, {debug: true})
				.then(function(category) {
					res.json(category);
				})
				.catch(function(err) {
					res.serverError(err.message);
				});
		});
	},
	update: function(req, res) {
		__ioc.$inject("Category", function(Category) {
				Category.updateOrCreate({
					id: req.params.id
				}, {
					name: req.body.name
				})
				.then(function(category) {
					res.json(category);
				})
				.catch(function(err) {
					res.serverError(err.message);
				});
		});
	},
	destroy: function(req, res) {
		__ioc.$inject("Category", function(Category) {
			res.notFound("update");
		});
	}
};