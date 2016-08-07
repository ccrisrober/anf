var express = require("express");
var api = express.Router();
api.get("/timezone", require(__base + "./api/controllers/TimezoneController").timezonev1);
module.exports = api; 