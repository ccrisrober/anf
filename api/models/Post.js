"use strict";

var ORM = require(__base + "./config/database.js");

require('./User');
var Post = ORM.Model.extend({
	tableName: "post",
	user: function() {
		return this.belongsTo("User", "user_id");
	}
});

module.exports = Post;