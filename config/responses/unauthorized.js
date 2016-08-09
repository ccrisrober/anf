module.exports = function(msg) {
	// Set status code
	this.status(401);
	this.send({
		error: {
			error_message: msg,
			error_code: 400,
			error_extra: extra || null
		}
	});
}