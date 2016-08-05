var async = require("async");

module.exports.bootstrap = function(callback) {
	function register(done) {
		//console.log("Register");
		require("./models");
		require("./services");
		require(__base + "./utils/workflow");
		done();
	}
	function printHello(done) {
		done();
	}
	function printBye(done) {
		done();
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