"use strict";

const fs = require("fs");

var ORM = require(__base + "./config/database.js");

// Register all models
fs.readdirSync(__base + "./api/models").forEach(function(modelName) {
    modelName = modelName.replace(".js", "");
    ORM.model(modelName, require(__base + "./api/models/"+ modelName));
});
