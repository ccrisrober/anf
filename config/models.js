"use strict";

var ORM = require(__base + "./config/database.js");
ORM.plugin("visibility");
ORM.plugin("registry");

ORM.plugin(require("bookshelf-crud"));

// Register all models
require("fs").readdirSync(__base + "./api/models").forEach(function(modelName) {
	modelName = modelName.replace(".js", "");
	// Register model in Bookshelf
	ORM.model(modelName, require(__base + "./api/models/"+ modelName));

	// Register model in ioc
	__ioc.$set(modelName, require(__base + "./api/models/"+ modelName));
});

module.exports.models = {
	connection: "mysqlConn"
};