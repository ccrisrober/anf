"use strict";

var ORM = require(__base + "./config/database.js");

//require('./Invoice');
var User = ORM.Model.extend({
	tableName: "user",
	constructor: function() {
		ORM.Model.apply(this, arguments);
		this.on("saving", function(model, attrs, opts) {
			//
		});
	},
	hidden: ["password"]
	/*,
	invoices: function() {
		return this.hasMany("Invoice");
	}*/
});

module.exports = User;