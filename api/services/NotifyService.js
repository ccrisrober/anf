var Sender = require('node-sender');
var config = require(__base + "./config/pushConfiguration").push;

exports.send_android_push = function(devicesIds, title, message, otherfields) {
    if (otherfields === void 0) { otherfields = ""; }
    var send = Sender.send({
        type: Sender.constants.TYPE_ANDROID,
        message: {
            title: title,
            message: message,
            otherfields: otherfields
        },
        tokens: devicesIds,
        config: config.gcm
    }, function (err, res) {
        console.log(error);
        console.log(result);
        if (error) {
            res.send(error);
        }
        if (result) {
            res.send(result);
        }
    });
};
exports.send_ios_push = function(devicesIds, title, message, otherfields) {
    if (otherfields === void 0) { otherfields = ""; }
    var send = Sender.send({
        type: Sender.constants.TYPE_IOS,
        message: {
            title: title,
            message: message,
            otherfields: otherfields
        },
        tokens: devicesIds,
        config: config.apn
    }, function (err, res) {
        console.log(error);
        console.log(result);
        if (error) {
            res.send(error);
        }
        if (result) {
            res.send(result);
        }
    });
};

exports.send_wp_push = function(devicesIds, title, message, otherfields) {
    if (otherfields === void 0) { otherfields = ""; }
    var send = Sender.send({
        type: Sender.constants.TYPE_WP,
        message: {
            title: title,
            message: message,
            otherfields: otherfields
        },
        tokens: devicesIds,
        config: config.wns
    }, function (err, res) {
        console.log(error);
        console.log(result);
        if (error) {
            res.send(error);
        }
        if (result) {
            res.send(result);
        }
    });
};
