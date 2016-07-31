"use strict";
var ORM = require(__base + "./config/database.js");

require('./Todo');
var User = ORM.Model.extend({
	tableName: "user",
  idAttribute: "userid",
	initialize: function(attrs, opts) {
  	//console.log(attrs);
  	//console.log(opts);
  	//this.on('saving', this.validateSave);
	},
	create: function(data, opts) {
		return this.forge(data).save(null, opts);
	},
	hidden: ["password", "created_at", "updated_at"],
  todos: function() {
    return this.hasMany("todo");
  }
}, {
  login: function(email, password) {
    return this.forge({
      email: email
      // TODO: password
    }).fetch();
  }
});

module.exports = User;