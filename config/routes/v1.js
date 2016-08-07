var express = require("express");
var api = express.Router();
api.get("/timezone", function(req, res) {
	res.send("TIMEZONE V1");
});
api.post("/data/:data_id", function(req, res) {
	res.send(req.params.data_id);
});
api.get("/all_timezones", function(req, res) {
	res.send("Sample response for /all_timezones");
});

module.exports = api; 