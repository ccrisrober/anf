var nodemailer = require('nodemailer');

var mailConfig = require(__base + "./config/mail");
 
var EMAIL_ACCOUNT_USER = mailConfig.email_account_user;
var EMAIL_ACCOUNT_PASSWORD = mailConfig.email_account_password;
var YOUR_NAME = mailConfig.name;
 
//reusable transport, look at the docs to see other service/protocol options
var smtpTransport = nodemailer.createTransport('SMTP', {
	service: 'Gmail',
	auth: {
		user: EMAIL_ACCOUNT_USER,
		pass: EMAIL_ACCOUNT_PASSWORD
	}
});

// TODO: Templates (https://github.com/npm/email-templates/blob/master/enterprise-send-license.text.hbs)
// Public method that actually sends the email
exports.send_mail = function(fromAddress, toAddress, subject/*, next*/) {
	var content = ViewCompiler("email", {title: "HELLO"});
	var success = true;
	var mailOptions = {
		// NOTE: the fromAdress can actually be different than the email address you're sending it from. Which is good and bad I suppose. Use it wisely.
		from: YOUR_NAME + ' <' + fromAddress + '>',
		to: toAddress,
		replyTo: fromAddress,
		subject: subject,
		html: content
	};


	// send the email!
	smtpTransport.sendMail(mailOptions, function(error, response) {
		if(error) {
			console.log('[ERROR] Message NOT sent: ', error);
			success = false;
		}
		else {
			console.log('[INFO] Message Sent: ' + response.message);
		}
		//next(error, success);
	});
};

var ejs = require("ejs");
var async = require("async");

function compile(relativeTemplatePath, data, next) {
	var absoluteTemplatePath = process.cwd() + '/config/templates/' + relativeTemplatePath + '.ejs';
	ejs.renderFile(absoluteTemplatePath, data, function(err, compiledTemplate) {
		if(err){
			throw new Error('Problem compiling template: ' + err);
		}
		//console.log('[INFO] COMPILED TEMPLATE: ', compiledTemplate)
		next(null, compiledTemplate);
	});
};
function compilateAll(file, data, callback) {
	var res;
	async.parallel([
	    function(callback) {
	        compile(file + "html", data, function(err, data) {
				callback(err, data);
			});
	    },
	    function(callback) {
	        compile(file + "text", data, function(err, data) {
				callback(err, data);
			});
	    }
	],
	// optional callback
	function(err, results) {
		if(callback) {
			return callback(err, {
				html: results[0],
				text: results[1]
			});
		}
		res = results;
	});
	return {
		html: res[0],
		text: res[1]
	};
};

function compileTemplate(file, data, next) {

};
/*
var templates = users.map(function (user) {
	//compilateAll("foo_", user, function(err, data) {
	//	console.log(data.html);
	//	console.log("-----------------------------------------------------");
	//});
	return compilateAll("foo_", user);
});
templates.forEach(function(tmpl) {
	console.log(tmpl);
});*/