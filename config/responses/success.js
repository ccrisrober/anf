module.exports = function(val, msg) {
	// Set status code
	this.status(200);
	this.json({
		success: val,
		message: msg
	});
}