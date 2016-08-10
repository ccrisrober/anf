var args = process.argv.slice(2);
console.log(args);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
var cmd = args[0];
args = args.slice(1);
var name = args[0];
if(cmd === "controller") {
	console.log("CONTROLLER " + name);
	args = args.slice(1); // At this moment, only actions
	var str = '"use strict";\n' +
	'\n' +
	'module.exports = {\n';
	args.forEach(function(val, index) {
		console.log("ARG: " + val + " IDX: " + index);
		str += '\t' + val + ": function(req, res) {\n" +
		'\t	res.notFound("' + val + '");\n\t}';
		if(index + 1 !== args.length) {
			str += ",\n";
		}
	});

	str += '\n};';
	console.log(str);

	var fs = require("fs");
	fs.writeFile("api/controllers/" + capitalizeFirstLetter(name) + "Controller.js", str, function(err) {
		if(err) {
			return console.error(err);
		}
	});
} else if (cmd === "service") {
	console.log("SERVICE " + name);
	var str = '"use strict";\n' +
	'\n';

	args.forEach(function(val) {
		str += 'exports.' + val + " = function() {\n" +
		'\tthrow "undefined";\n}\n';
	});
	console.log(str);

	var fs = require("fs");
	fs.writeFile("api/services/" + capitalizeFirstLetter(name) + "Service.js", str, function(err) {
		if(err) {
			return console.error(err);
		}
	});
} else if (cmd === "model") {
	console.log("MODEL " + name);

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

	console.log(str);

	var fs = require("fs");
	fs.writeFile("api/models/" + capitalizeFirstLetter(name) + ".js", str, function(err) {
		if(err) {
			return console.error(err);
		}
	});
}