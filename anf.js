var log_ = require("captains-log");
var anf;
(function (anf) {
    anf.log = log_({
    	level: require("./config/log").log.level || "info",
    	colors: true
    });
})(anf || (anf = {}));

exports = module.exports = anf;