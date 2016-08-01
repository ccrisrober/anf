"use strict";

// Register all services
require("fs").readdirSync(__base + "./api/services").forEach(function(serviceName) {
    serviceName = serviceName.replace(".js", "");
	__ioc.$set(serviceName, require(__base + "./api/services/"+ serviceName));
});
