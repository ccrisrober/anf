"use strict";

var ORM = require(__base + "./config/database.js");
ORM.plugin("visibility");

// Register all models
require("fs").readdirSync(__base + "./api/models").forEach(function(modelName) {
    modelName = modelName.replace(".js", "");
    // Register model
    ORM.model(modelName, require(__base + "./api/models/"+ modelName));
});
