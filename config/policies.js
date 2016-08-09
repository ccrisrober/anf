"use strict";

module.exports = function(app) {
	return {
		authenticate: function() {
			return app.auth.authenticate();
		},
		ensureAdmin: function(req, res, next) {
			__ioc.$inject("User", function(u) {
				//console.log("IS ADMIN: " + u.canPlayRoleOf("admin"));
				if(u.canPlayRoleOf("admin", req.user)) {
					//console.log("ADDMMIIIN");
					return next();
				}
				return res.unauthorized("Unauthorized access");
			});
		},
		ensureUser: function(req, res, next) {
			__ioc.$inject("User", function(u) {
				//console.log("IS USER: " + u.canPlayRoleOf("user"), req.user);
				if(u.canPlayRoleOf("user", req.user)) {
					// TODO: Check account verification or redirect. IDK :S
					//console.log("USSSSEEER");
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