var upload = require("node-upload");
exports.upload_image = function(req, res, field_name) {
	return upload.upload_file(req, res, field_name, [".png", ".jpg", ".jpeg", ".gif"]);
};
exports.upload_images = function(req, res, field_name) {
	return upload.upload_array_files(req, res, field_name, [".png", ".jpg", ".jpeg", ".gif"]);
};