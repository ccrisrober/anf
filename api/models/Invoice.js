"use strict";

var ORM = require(__base + "./config/database.js");

require("./User");
var Invoice = ORM.Model.extend({
	tableName: "invoices",
	hasTimestamps: true/*,
	user: function() {
		return this.belongsTo("User");
	}*/
});
module.exports = Invoice;

//module.exports = Bookshelf.model("Invoice", Invoice);*/