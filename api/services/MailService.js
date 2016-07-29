var nodemailer = require('nodemailer');
var dkim = require('nodemailer-dkim');
var config = require(__base + "./config/mailer");

exports.send_email = function (email_to, email_subject, email_content) {
    if (!email_to || !email_subject || !email_content) {
        console.log("Invalid send_email parameters");
    } else {
        /*ry {
            var transporter = nodemailer.createTransport({ debug : config.debug });
            transporter.use('stream', dkim.signer({
                domainName: config.domainName,
                keySelector: config.keySelector,
                privateKey: config.privateKey
            }));
            transporter.sendMail({
                from: config.from,
                to: email_to,
                subject: email_subject,
                text: email_content
            }, function (err, response) {
                console.log(err || response);
            });
        } catch (e) {
            //console.log(e);
            console.log(config.error);
        }*/
    }
};
