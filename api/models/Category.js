"use strict";

var ORM = require(__base + "./config/database.js");

var Category = ORM.Model.extend({
	tableName: "Category"
});

module.exports = Category;