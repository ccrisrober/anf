var async = require("async");

module.exports.bootstrap = function(callback) {
	function register(done) {
		console.log("Register");
		require("./models");
		require("./services");
		require(__base + "./utils/workflow");
		done();
	}
	function printHello(done) {
		setTimeout(function() {
			console.log("HELLO");
			done();
		}, 1);
	}
	function printBye(done) {
		setTimeout(function() {
			console.log("BYE");
			done();
		}, 1);
	}
	async.series([
		register,
		function(cb) {
			async.parallel([
				printHello,
				printBye
			], cb)
		}
	], callback);
};