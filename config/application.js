'use strict';
// var fs = require("fs");
module.exports = {
	port: process.env.PORT || 3333,
	environment: process.env.NODE_ENV || "development",
	ssl: {
		key: "",	// fs.readFileSync(ssl.key)
		cert: ""	// fs.readFileSync(ssl.certificate)
	}
};