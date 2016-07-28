"use strict";

const fs = require('fs');

module.exports  = {
	domainName: 'junglear.com',
    keySelector: 'emailkey',
    privateKey: fs.readFileSync('/etc/pmta/private_email_key.pem'),
    from: 'Junglear <no-reply@junglear.com>',

    debug: true,

    error: "Failed to send email."
};