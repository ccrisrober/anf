var Sender = require('node-sender');
var config = require(__base + "./config/pushConfiguration").push;

var _callback = function(err, res) {
    if(err) {
        console.log(err);
        return res.send(err);
    }
    console.log(res);
    return res.send(res);
}

exports.send_android_push = function(devicesIds, title, message, otherfields) {
    if (otherfields === void 0) { otherfields = ""; }
    Sender.send({
        type: Sender.constants.TYPE_ANDROID,
        message: {
            title: title,
            message: message,
            otherfields: otherfields
        },
        tokens: devicesIds,
        config: config.gcm
    }, _callback);
};
exports.send_ios_push = function(devicesIds, title, message, otherfields) {
    if (otherfields === void 0) { otherfields = ""; }
    Sender.send({
        type: Sender.constants.TYPE_IOS,
        message: {
            title: title,
            message: message,
            otherfields: otherfields
        },
        tokens: devicesIds,
        config: config.apn
    }, _callback);
};

exports.send_wp_push = function(devicesIds, title, message, otherfields) {
    if (otherfields === void 0) { otherfields = ""; }
    Sender.send({
        type: Sender.constants.TYPE_WP,
        message: {
            title: title,
            message: message,
            otherfields: otherfields
        },
        tokens: {
            url: devicesIds
        },
        config: config.wns
    }, _callback);
};
