var async = require("async");

module.exports.bootstrap = function(callback) {
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
	async.parallel([
		printHello,
		printBye
	], callback);
};