"use strict";

module.exports = function(app) {
	return {
		authenticate: function() {
			return app.auth.authenticate();
		},
		ensureAdmin: function(req, res, next) {
			__ioc.$inject("User", function(u) {
				console.log(u.canPlayRoleOf("admin"));
				if(u.canPlayRoleOf("admin")) {
					return next();
				}
				return res.unauthorized("Unauthorized access");
			});
		},
		ensureUser: function(req, res, next) {
			__ioc.$inject("User", function(u) {
				console.log(u.canPlayRoleOf("user"));
				if(u.canPlayRoleOf("user")) {
					// TODO: Check account verification or redirect. IDK :S
					return next();
				}
				return res.unauthorized("Unauthorized access");
			});
		}
	}
};

/*
module.exports.lol5 = function(req, res, next) {
	if(req.params.foo == "5" || !req.params.foo) {
		console.log(req.user);
		return next();
	}
	return res.forbidden("ONLY ACCEPT 5 OR EMPTY");
};
*/