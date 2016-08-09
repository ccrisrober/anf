module.exports = function(file) {
	var viewsDir = require(process.cwd() + "/config/views").views.directory;
	// Set status code
	this.status(200);
	this.sendFile(viewsDir + file);
}