var express = require("express");
var api = express.Router();
api.get("/timezone", function(req, res) {
	res.send("API 2: super cool new response for /timezone");
});
module.exports = api;