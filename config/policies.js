module.exports.ensureAuthenticated = function(req, res, next) {
	// TODO
	return next();
};
module.exports.ensureAdmin = function(req, res, next) {
	if(req.user.canPlayRoleOf("admin")) {
		return next();
	}
	// TODO: Send HTTP No permisos
};
module.exports.ensureUser = function(req, res, next) {
	// TODO
	return next();
};
module.exports.lol5 = function(req, res, next) {
	if(req.params.foo == "5" || !req.params.foo) {
		console.log(req.user);
		return next();
	}
	return res.forbidden("ONLY ACCEPT 5 OR EMPTY");
}