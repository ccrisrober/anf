var config = require(process.cwd() + '/config/application');

var args = process.argv.slice(2);	// Remove first argument (name)
var siege = require("siege");
var iterations = (args.length === 1) ? args[0] : 1000;

siege()
	.on(config.port)
	.for(iterations).times
	.get('/')
	.attack()