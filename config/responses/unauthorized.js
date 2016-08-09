module.exports = function(msg, extra) {
	// Set status code
	this.status(401);
	var err = {
		error_message: msg,
		error_code: 400
	};
	if(extra) {
		err.error_extra = extra;
	}
	this.send({
		error: err
	});
}