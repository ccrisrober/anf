"use strict";

const fs = require('fs');

module.exports  = {
	domainName: 'mydomain.com',
    keySelector: 'emailkey',
    //privateKey: fs.readFileSync('/etc/pmta/private_email_key.pem'),
    from: 'MyDomain <no-reply@mydomain.com>',

    debug: true,

    error: "Failed to send email."
};