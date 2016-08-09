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
	hidden: ["password", "created_at", "updated_at"],
  todos: function() {
    return this.hasMany("todo");
  }
}, {
  login: function(email, password) {
    return this.forge({
      email: email,
      password: password
    }).fetch();
  },
  canPlayRoleOf: function(role) {
    console.log(role);
    console.log(this.roles);
    if(role == "admin") { // && this.roles.admin) {
      return true;
    }
    if(role == "user") { // && this.roles.user) {
      return true;
    }
    return false;
  }
});

module.exports = User;