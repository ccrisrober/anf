module.exports.push = {
	gcm: {
		apiKey : "GCM Api-KEY",
		ttl    : 7200
		// Time to live, (optional, default = 3600 = 1h) 
	},
	apn: {
		cert : "path to your cert file",
		key  : "path to your key file",
		
		ttl  : 7200,
		// Time to live, (optional, default = 3600 = 1h) 
		
		production : true
		// If your application is on the production APNS 
	},
	wns: {
		sid    : "your sid",
		// Package Security Identifier (SID) 
		
		secret : "your secret",
		// Secret password 
		
		ttl    : 7200
		// Time to live, (optional, default = 3600 = 1h) 
	}
};