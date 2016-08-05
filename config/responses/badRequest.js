module.exports = function(msg){
	// Set status code
	this.status(400);
	this.send({
		error: {
			error_message: msg,
			error_code: 400,
			error_extra: extra || null
		}
	});
}