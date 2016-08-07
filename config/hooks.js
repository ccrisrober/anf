var async = require("async");

module.exports.hooks = function(callback) {
	function register(done) {
		var ORM = require(__base + "./config/database.js");
		ORM.plugin("visibility");
		ORM.plugin("registry");

		ORM.plugin(require("bookshelf-crud"));

		// Register all models
		require("fs").readdirSync(__base + "./api/models").forEach(function(modelName) {
			modelName = modelName.replace(".js", "");
			// Register model in Bookshelf
			ORM.model(modelName, require(__base + "./api/models/"+ modelName));

			// Register model in ioc
			__ioc.$set(modelName, require(__base + "./api/models/"+ modelName));
		});

		
		// Register all services
		require("fs").readdirSync(__base + "./api/services").forEach(function(serviceName) {
			serviceName = serviceName.replace(".js", "");
			// Register model in ioc
			__ioc.$set(serviceName, require(__base + "./api/services/"+ serviceName));
		});

		require(__base + "./config/utils/workflow");
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