var args = process.argv.slice(2);
//console.log(args);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function createController(args, inject) {
	//console.log("CONTROLLER " + name);
	var str = '"use strict";\n' +
	'\n' +
	'module.exports = {\n';
	args.forEach(function(val, index) {
		str += '\t' + val + ": function(req, res) {\n";
		if(inject) {
			str += '\t\t__ioc.$inject("' + capitalizeFirstLetter(name) + 
				'", function(' + capitalizeFirstLetter(name) + ') {\n';
			str += '\t\t\tres.notFound("' + val + '");\n';
			str += '\t\t});\n';
		} else {
			str += '\t	res.notFound("' + val + '");\n';
		}
		str += '\t}';
		if(index + 1 !== args.length) {
			str += ",\n";
		}
	});

	str += '\n};';
	console.log(str);

	/**
	var fs = require("fs");
	fs.writeFile("api/controllers/" + capitalizeFirstLetter(name) + "Controller.js", str, function(err) {
		if(err) {
			return console.error(err);
		}
	});
	/**/
}

function createService(args) {
	var str = '"use strict";\n' +
	'\n';

	args.forEach(function(val) {
		str += 'exports.' + val + " = function() {\n" +
		'\tthrow "undefined";\n}\n';
	});
	//console.log(str);

	/**/
	var fs = require("fs");
	fs.writeFile("api/services/" + capitalizeFirstLetter(name) + "Service.js", str, function(err) {
		if(err) {
			return console.error(err);
		}
	});
	/**/
}

function createModel(args) {
	var str = '"use strict";\n' +
	'\n' +
	'var ORM = require(__base + "./config/database.js");\n' +
	'\n';

	str += 
	'var ' + capitalizeFirstLetter(name) + ' = ORM.Model.extend({\n' +
	'	tableName: "' + name  + '"\n' +
	'});\n' +
	'\n' +
	'module.exports = ' + capitalizeFirstLetter(name) + ';';

	//console.log(str);

	/**/
	var fs = require("fs");
	fs.writeFile("api/models/" + capitalizeFirstLetter(name) + ".js", str, function(err) {
		if(err) {
			return console.error(err);
		}
	});
	/**/
}

var cmd = args[0];
args = args.slice(1);
var name = args[0];
args = args.slice(1); // At this moment, only actions
if(cmd === "crud") {
	args = ["index", "create", "get", "update", "destroy"];
	createController(args, true);
	args = [name];
	createModel(args);
} else if (cmd === "controller") {
	createController(args, false);
} else if (cmd === "service") {
	createService(args);
} else if (cmd === "model") {
	createModel(args);
}