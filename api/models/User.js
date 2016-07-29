"use strict";

var ORM = require(__base + "./config/database.js");

//require('./Invoice');
var User = ORM.Model.extend({
	tableName: "user",
	initialize: function(attrs, opts) {
  	console.log(attrs);
  	console.log(opts);
  	//this.on('saving', this.validateSave);
	},
	create: function(data, opts) {
		return this.forge(data).save(null, opts);
	},
	hidden: ["password"]
}, {
  login: function(email, password) {
    return this.forge({
      email: email
      // TODO: password
    }).fetch();
  }
});

module.exports = User;