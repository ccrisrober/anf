/**
var express = require("express");
var api = express.Router();
api.get("/timezone", require(__base + "./api/controllers/TimezoneController").timezonev2);
module.exports = api; 
/**/
exports = module.exports = function(namespace, app) {
	app.get(namespace + "/timezone", require(__base + "./api/controllers/TimezoneController").timezonev2);
};