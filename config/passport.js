var jwt = require("jwt-simple");
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

var params = {
	jwtSecret: "MyS3cr3tK3Y",
	secretOrKey: "MyS3cr3tK3Y",
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	jwtSession: {
		session: false
	}
};

module.exports = function() {
	var strategy = new Strategy(params, function(payload, done) {
		var User = require("../api/models/User");
		User.findById(payload.id)
			.then(function(user) {
				//console.log(user.toJSON());
				var user = user.toJSON();
				var data = {
					id: user.userid,
					name: user.name,
					email: user.email
				}
				if (user) {
					return done(null, data);
				} else {
					return done(new Error("User not found"), null);
				}
			})
			.catch(function(err) {
				return done(new Error(err), null);
			});
	});
	passport.use(strategy);
	return {
		initialize: function() {
			return passport.initialize();
		},
		authenticate: function() {
			return passport.authenticate("jwt", params.jwtSession);
		},
		token: function(user_id) {
			return jwt.encode({id: user_id}, params.jwtSecret);
		}
	}
};

// https://blog.jscrambler.com/implementing-jwt-using-passport/

//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.kHZQ03yhLOPC1c7f6CdItQbT2ljvMQLbucdJVkqwEKs