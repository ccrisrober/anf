/*"use strict";

var Bookshelf = require(__base + "./config/database.js");

require("./User");
var Invoice = Bookshelf.Model.extend({
	tableName: "invoices",
	hasTimestamps: true,
	user: function() {
		return this.belongsTo("User");
	}
});

module.exports = Bookshelf.model("Invoice", Invoice);*/