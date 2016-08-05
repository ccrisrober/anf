module.exports = function(message, extra){
	// Set status code
	this.status(403);
	this.send({
		error: {
			error_message: message,
			error_code: 403,
			error_extra: extra || null
		}
	});
}