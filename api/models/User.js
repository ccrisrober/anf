"use strict";
var ORM = require(__base + "./config/database.js");
var bcrypt = require('bcryptjs');

require('./Todo');
var User = ORM.Model.extend({
	tableName: "user",
  idAttribute: "userid",
	initialize: function(attrs, opts) {
    //this.on("creating", this.hashPassword, this);
    //this.on("saving", this.hashPassword, this);
    //this.on("fetching", this.hashPassword, this);
	},
  hashPassword: function(model, attrs, options) {
    console.log(model);
    return new Promise(function(resolve, reject) {
      bcrypt.hash(model.attributes.password, 10, function(err, hash) {
        if( err ) reject(err);
        model.set('password', hash);
        resolve(hash); // data is created only after this occurs
      });
    });
  },
	hidden: ["password", "created_at", "updated_at"],
  todos: function() {
    return this.hasMany("todo", "user_id");
  }
}, {
  login: function(email, password) {
    return this.forge({
      email: email,
      password: password
    }).fetch();
  },
  canPlayRoleOf: function(role, user) {
    // Admin has access to user zone
    if(role === "user" && (user.attributes.role === "user" || user.attributes.role === "admin")) {
      return true;
    }
    if(user.attributes.role === role) { // && this.roles.admin) {
      return true;
    }
    return false;
  }
});

module.exports = User;