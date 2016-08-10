"use strict";

module.exports = {
	index: function(req, res) {
		__ioc.$inject("Category", function(Category) {
			res.notFound("index");
		});
	},
	create: function(req, res) {
		__ioc.$inject("Category", function(Category) {
			res.notFound("create");
		});
	},
	get: function(req, res) {
		__ioc.$inject("Category", function(Category) {
			res.notFound("get");
		});
	},
	update: function(req, res) {
		__ioc.$inject("Category", function(Category) {
			res.notFound("update");
		});
	},
	destroy: function(req, res) {
		__ioc.$inject("Category", function(Category) {
			res.notFound("delete");
		});
	}
};