"use strict";

var ORM = require(__base + "./config/database.js");

require('./User');
var Todo = ORM.Model.extend({
	tableName: "todo",
	user: function() {
		return this.belongsTo("User");
	}
});

module.exports = Todo;