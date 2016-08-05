module.exports = function(extra){
	// Set status code
	this.status(200);
	this.send(extra || {});
}