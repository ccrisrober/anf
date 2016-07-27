var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

var params = {
	secretOrKey: "MyS3cr3tK3Y",
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	jwtSession: {
		session: false
	}
};

module.exports = function() {
	var strategy = new Strategy(params, function(payload, done) {
		//console.log(payload);

		require("../api/models/User").forge({
			id: payload.id
		}).fetch()
		.then(function(user) {
			if (user) {
				return done(null, {id: user.id});
			} else {
				return done(new Error("User not found"), null);
			}
		})
		.catch(function(err) {
			return res.json(err);
		});
	});
	passport.use(strategy);
	return {
		initialize: function() {
			return passport.initialize();
		},
		authenticate: function() {
			return passport.authenticate("jwt", params.jwtSession)
		}
	}
};

// https://blog.jscrambler.com/implementing-jwt-using-passport/

//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.kHZQ03yhLOPC1c7f6CdItQbT2ljvMQLbucdJVkqwEKs