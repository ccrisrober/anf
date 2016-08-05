var log_ = require("captains-log");
var anf;
(function (anf) {
    anf.log = log_({
    	level: require("./config/log").log.level || "info",
    	colors: true
    });
})(anf || (anf = {}));

/*anf.log.silly("LOOG");
anf.log.verbose("LOOG");
anf.log.info("LOOG");
anf.log.debug("LOOG")
anf.log.warn("LOOG");
anf.log.error("LOOG");*/

exports = module.exports = anf;