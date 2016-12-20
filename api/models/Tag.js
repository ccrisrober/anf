"use strict";

var ORM = require(__base + "./config/database.js");

var Tag = ORM.Model.extend({
	tableName: "Tag"
});

module.exports = Tag;