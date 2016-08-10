"use strict";

module.exports = {
	add: function(req, res) {
		req.checkBody("todo", "TODO required").notEmpty();
		var errors = req.validationErrors();
		if(errors) {
			return res.send(errors);
		} else {
			var todo = req.body.todo;
			__ioc.$inject("Todo", function(tt) {
				tt.create({
						todo: todo,
						user_id: req.user.id
					})
					.then(function(user) {
						res.success(true, "Todo created");
					})
					.catch(function(err) {
						res.json(err);
					});
			});
		}
	},
	get: function(req, res) {
		__ioc.$inject("Todo", function(todo) {
			todo
				.where("user_id", "=", req.user.id)
				/*.fetchAll({
					debug: true,
					withRelated: ["user"]
				})*/
				/*.fetchAll({
					withRelated: [
						"user": function(qb) {
							qb.select("")
						}
					]
				})*/
				/*.query(function(qb) {
					// SELECT * FROM todo t JOIN user u ON t.user_id = u.userid
					// SELECT * FROM todo t left outer JOIN user u ON t.user_id = u.userid
					qb.leftOuterJoin("user", "todo.user_id", "user.userid");
				})
				.fetchAll({debug: true})*/
				/*.query(function(qb) {
					qb.leftOuterJoin("user", function() {
						this.on("todo.user_id", "=", "user.userid")
					});
				})*/
				.fetchAll({debug: true})
				.then(function(users) {
					res.json(users);
				})
				.catch(function(err) {
					res.json(err);
				});
		});
	},
	show: function(req, res) {
		__ioc.$inject("Todo", function(tt) {
			tt.findById(req.params.id)
				.then(function(todo) {
					res.json(todo);
				})
				.catch(function(err) {
					res.json(err);
				});
		});
	},
	edit: function(req, res) {
		req.checkBody("todo", "TODO required").notEmpty();
		var errors = req.validationErrors();
		if(errors) {
			return res.send(errors);
		} else {
			var todo = req.body.todo;
			__ioc.$inject("Todo", function(tt) {
				tt.update({
						id: req.params.id
					}, {
						todo: todo
					})
					.then(function(todo) {
						res.json(todo);
					})
					.catch(function(err) {
						res.json(err);
					});
			});
		}
	}
};